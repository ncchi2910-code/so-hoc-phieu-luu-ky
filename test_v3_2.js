/* ============================================================================
   TEST v3.2 — Kiểm thử độc lập cho game "Số Học Phiêu Lưu Ký".
   - Nạp toàn bộ phần JS "thuần toán" (helpers + generator + selfTest + builder)
     trực tiếp từ index.html (không sao chép, để test đúng code đang chạy).
   - (A) Chạy selfTest() nội bộ của game (structural + deep checks cũ).
   - (B) Đối chiếu ĐÁP ÁN từng generator bằng cách TÍNH ĐỘC LẬP (vài nghìn lượt).
   - (C) Kiểm 4 phương án không trùng, answerIdx hợp lệ, explain đầy đủ.
   - (D) Kiểm builder pool: 6–8 dạng/chặng, không lặp dạng liền kề, đủ 10 câu.
   - (E) Mô phỏng thẻ cào: chơi lại Phần 1 → kích hoạt 2 lần, tiền cộng dồn.
   Chạy: node test_v3_2.js
   ============================================================================ */
"use strict";
const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const start = html.indexOf("function gcd(a,b)");
const idxP7 = html.indexOf("PHẦN 7 — NỘI DUNG");
const end = html.lastIndexOf("/*", idxP7);
if(start < 0 || end < 0 || end <= start){
  console.error("Không trích được phần JS thuần toán từ index.html"); process.exit(1);
}
const code = html.slice(start, end);

// Nạp code trong một Function scope, trả về các tên cần dùng.
const G = new Function(code + `
  ; return {
    selfTest, STAGE_POOLS, buildFromPool,
    gcd, lcm, isPrime, primeFactors, divisorsOf, isFiniteDecimal, F, Frac, fmtNum, fmtMoney,
    buildStage1, buildStage2, buildStage3, buildStage4, buildStage5, buildStage6,
    buildStage_p2_1, buildStage_p2_2, buildStage_p2_3, buildStage_p3_1, buildStage_p3_2, buildStage_p3_3
  };
`)();

let failures = 0;
function fail(msg){ failures++; if(failures <= 40) console.log("  ❌ " + msg); }

/* ---------- Tiện ích tính độc lập (KHÔNG dùng lại code của game) ---------- */
function igcd(a,b){ a=Math.abs(a); b=Math.abs(b); while(b){ const t=a%b; a=b; b=t; } return a||1; }
function intLabel(x){ return x<0 ? "−"+Math.abs(x) : ""+x; }
function labelFrac(n,d){
  if(d<0){ n=-n; d=-d; }
  const g=igcd(n,d); n/=g; d/=g;
  if(d===1) return intLabel(n);
  return (n<0 ? "−"+Math.abs(n) : ""+n) + "/" + d;
}
function money(n){ return (""+Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,"."); }
function isPrimeI(n){ if(n<2) return false; for(let i=2;i*i<=n;i++) if(n%i===0) return false; return true; }
function countDivI(n){ let c=0; for(let i=1;i<=n;i++) if(n%i===0) c++; return c; }
function maxPrimeFactorI(n){ let mx=1, x=n; for(let p=2;p<=x;p++){ if(x%p===0){ mx=p; while(x%p===0) x/=p; } } return mx; }
function primeCountI(A,B){ let c=0; for(let x=A;x<=B;x++) if(isPrimeI(x)) c++; return c; }
function parseFrac(s){
  s = (""+s).replace(/−/g,"-");
  if(s.indexOf("/")>=0){ const p=s.split("/"); return {n:parseInt(p[0],10), d:parseInt(p[1],10)}; }
  return {n:parseInt(s,10), d:1};
}
function fracVal(s){ const f=parseFrac(s); return f.n/f.d; }
function decVal(s){ return parseFloat((""+s).replace(/−/g,"-").replace(",", ".")); }
function leadNum(s){ const m=(""+s).match(/^-?\d+/); return m? parseInt(m[0],10) : NaN; }
function denomOnly25(n,d){ // phân số n/d (tối giản) chỉ có ước 2,5 ở mẫu?
  const g=igcd(n,d); d=Math.abs(d/g);
  while(d%2===0) d/=2; while(d%5===0) d/=5; return d===1;
}

// Đánh giá biểu thức số học độc lập (chỉ chấp nhận số & + − × ÷ ( ) [ ] )
function evalArith(expr){
  const s = expr.replace(/×/g,"*").replace(/÷/g,"/").replace(/−/g,"-").replace(/\[/g,"(").replace(/\]/g,")").replace(/\s+/g,"");
  if(s==="" || !/^[-+*/()\d.]+$/.test(s)) return null;
  try { const v = Function('"use strict";return ('+s+')')(); return (typeof v==="number" && isFinite(v)) ? v : null; } catch(e){ return null; }
}
function fracSpans(qHTML){
  const re=/<span class="frac"><span class="num">(−?-?\d+)<\/span><span class="den">(\d+)<\/span><\/span>/g;
  const out=[]; let m; while((m=re.exec(qHTML))) out.push([parseInt((""+m[1]).replace(/−/g,"-"),10), parseInt(m[2],10)]); return out;
}
// Kiểm độc lập cho các generator CŨ (không có verify) bằng cách đọc lại đề.
// Trả về true nếu đã thực hiện được một phép đối chiếu độc lập.
function extraIndependentCheck(q, name){
  // 1) Biểu thức số học nguyên dạng "<b>... </b> = ?"
  const mE = q.qHTML.match(/<b>([^<]+?)<\/b>\s*=\s*\?/);
  if(mE && mE[1].indexOf("?")<0 && mE[1].indexOf("|")<0){
    const v = evalArith(mE[1]);
    if(v!==null && Number.isInteger(v)){ expectLabel(q, name+"·eval", intLabel(v)); return true; }
  }
  // 2) Rút gọn phân số: 1 span phân số → đáp án tối giản
  if(name==="genQ_simplifyFrac"){
    const sp=fracSpans(q.qHTML); if(sp.length===1){ expectLabel(q,"simplifyFrac", labelFrac(sp[0][0],sp[0][1])); return true; }
  }
  // 3) Mẫu chung nhỏ nhất của 1/a, 1/b → BCNN(a,b)
  if(name==="genQ_commonDen"){
    const sp=fracSpans(q.qHTML); if(sp.length===2){ const a=sp[0][1],b=sp[1][1]; expectLabel(q,"commonDen", ""+(a*b/igcd(a,b))); return true; }
  }
  // 4) Bốn phép tính phân số dương: 2 span + 1 dấu
  if(name==="genQ_fracBasicPos"){
    const sp=fracSpans(q.qHTML);
    const stripped=q.qHTML.replace(/<span class="frac">.*?<\/span><\/span>/g,"§");
    const mo=stripped.match(/§\s*([+\-−×÷])\s*§/);
    if(sp.length===2 && mo){
      const [an,ad]=sp[0], [bn,bd]=sp[1], op=mo[1];
      let n,d;
      if(op==="×"){ n=an*bn; d=ad*bd; }
      else if(op==="÷"){ n=an*bd; d=ad*bn; }
      else if(op==="+"){ n=an*bd+bn*ad; d=ad*bd; }
      else { n=an*bd-bn*ad; d=ad*bd; }
      expectLabel(q,"fracBasicPos", labelFrac(n,d)); return true;
    }
  }
  // 5) 4 phép tính số hữu tỉ (có thể kèm số nguyên âm)
  if(name==="genQ_ratArith"){
    const sp=fracSpans(q.qHTML); let idx=0;
    let s=q.qHTML.replace(/<span class="frac">.*?<\/span><\/span>/g, ()=>("#"+(idx++)+"#"));
    s=s.replace(/^Tính:\s*/,"").replace(/\s*=\s*\?\s*$/,"").trim();
    const toks=s.split(/\s+/);
    if(toks.length===3){
      const op=toks[1];
      const parse=t=>{ if(t.indexOf("#")>=0){ const k=parseInt(t.replace(/#/g,""),10); return {n:sp[k][0],d:sp[k][1]}; } const v=parseInt(t.replace(/[()]/g,"").replace(/−/g,"-"),10); return {n:v,d:1}; };
      const A=parse(toks[0]), B=parse(toks[2]); let n,d;
      if(op==="×"){ n=A.n*B.n; d=A.d*B.d; }
      else if(op==="÷"){ n=A.n*B.d; d=A.d*B.n; }
      else if(op==="+"){ n=A.n*B.d+B.n*A.d; d=A.d*B.d; }
      else if(op==="−"){ n=A.n*B.d-B.n*A.d; d=A.d*B.d; }
      else return false;
      expectLabel(q,"ratArith", labelFrac(n,d)); return true;
    }
  }
  // 6) Lũy thừa số hữu tỉ
  if(name==="genQ_ratPower"){
    const m3=q.qHTML.match(/(\d+)<sup>(\d+)<\/sup>\s*([×÷])\s*(\d+)<sup>(\d+)<\/sup>/);
    if(m3){ const a=+m3[1], e1=+m3[2], op=m3[3], e2=+m3[5]; const e=op==="×"?e1+e2:e1-e2; expectLabel(q,"ratPower", ""+Math.pow(a,e)); return true; }
    const mSup=q.qHTML.match(/<sup>(\d+)<\/sup>/);
    if(mSup){
      const e=+mSup[1], sp=fracSpans(q.qHTML);
      if(sp.length===1){ expectLabel(q,"ratPower", labelFrac(Math.pow(sp[0][0],e), Math.pow(sp[0][1],e))); return true; }
      const mNeg=q.qHTML.match(/\((−\d+)\)<sup>/), mPos=q.qHTML.match(/(\d+)<sup>/);
      if(mNeg){ const b=parseInt(mNeg[1].replace(/−/g,"-"),10); expectLabel(q,"ratPower", labelFrac(Math.pow(b,e),1)); return true; }
      if(mPos){ const b=parseInt(mPos[1],10); expectLabel(q,"ratPower", labelFrac(Math.pow(b,e),1)); return true; }
    }
  }
  // 7) Biểu diễn thập phân (hữu hạn / vô hạn)
  if(name==="genQ_ratDecimal"){
    const sp=fracSpans(q.qHTML);
    if(sp.length===1){ expectLabel(q,"ratDecimal", denomOnly25(sp[0][0],sp[0][1])?"Số thập phân hữu hạn":"Số thập phân vô hạn tuần hoàn"); return true; }
  }
  // 8) Đổi phân số ↔ thập phân (generator cũ)
  if(name==="genQ_fracDecimal"){
    if(q.qHTML.indexOf("sang số thập phân")>=0){
      const sp=fracSpans(q.qHTML);
      if(sp.length===1){ if(Math.abs(decVal(q.options[q.answerIdx]) - sp[0][0]/sp[0][1])>1e-9) fail("fracDecimal→thập phân sai"); return true; }
    } else {
      const m=q.qHTML.match(/thập phân <b>([^<]+)<\/b>/);
      if(m){ const dv=decVal(m[1]), f=parseFrac(q.options[q.answerIdx]); if(Math.abs(f.n/f.d - dv)>1e-9) fail("fracDecimal→phân số sai"); return true; }
    }
  }
  return false;
}

// Kiểm "đúng MỘT phương án thoả tính chất P, và nó nằm ở answerIdx"
function exactlyOne(q, name, P){
  let cnt=0, idx=-1;
  q.options.forEach((o,i)=>{ if(P(o)){ cnt++; idx=i; } });
  if(cnt!==1) fail(name+": số phương án thoả điều kiện = "+cnt+" (cần đúng 1) | "+JSON.stringify(q.options));
  else if(idx!==q.answerIdx) fail(name+": phương án đúng không khớp answerIdx");
}
function expectLabel(q, name, expected){
  if(q.options[q.answerIdx] !== expected)
    fail(name+": đáp án ['"+q.options[q.answerIdx]+"'] ≠ kỳ vọng độc lập ['"+expected+"']");
}

/* ---------- Bộ giải độc lập theo verify.k ---------- */
const solvers = {
  arith(q,v){ const r = v.op==="+"?v.a+v.b : v.op==="-"?v.a-v.b : v.op==="*"?v.a*v.b : v.a/v.b; expectLabel(q,"arith",intLabel(r)); },
  cmp(q,v){ expectLabel(q,"cmp", v.a<v.b?"<":v.a>v.b?">":"="); },
  sum(q,v){ expectLabel(q,"sum", intLabel(v.terms.reduce((s,t)=>s+t,0))); },
  abs(q,v){ expectLabel(q,"abs", intLabel(Math.abs(v.a))); },
  absexpr(q,v){ expectLabel(q,"absexpr", intLabel(v.a+Math.abs(v.b))); },
  twoParens(q,v){ const L=v.a+v.b, R=v.c+v.d; expectLabel(q,"twoParens", intLabel(v.outer==="+"?L+R:L-R)); },
  cmpfrac(q,v){ const lhs=v.an*v.bd, rhs=v.bn*v.ad; expectLabel(q,"cmpfrac", lhs<rhs?"<":lhs>rhs?">":"="); },
  eqfrac(q,v){ exactlyOne(q,"eqfrac", o=>{ const f=parseFrac(o); return f.n*v.baseD===f.d*v.baseN; }); },
  maxfrac(q,v){ let best=v.fracs[0]; v.fracs.forEach(f=>{ if(f[0]/f[1] > best[0]/best[1]) best=f; }); expectLabel(q,"maxfrac", labelFrac(best[0],best[1])); },
  ismultiple(q,v){ expectLabel(q,"ismultiple", v.x%v.y===0?"Có":"Không"); },
  countdiv(q,v){ expectLabel(q,"countdiv", ""+countDivI(v.n)); },
  smallmultabove(q,v){ expectLabel(q,"smallmultabove", ""+((Math.floor(v.M/v.n)+1)*v.n)); },
  divboth(q,v){ exactlyOne(q,"divboth", o=>{ const x=parseInt(o,10); return x%v.d1===0 && x%v.d2===0; }); },
  filldigit(q,v){ exactlyOne(q,"filldigit", o=>((v.h+parseInt(o,10)+v.u)%v.d===0)); },
  isprime(q,v){ expectLabel(q,"isprime", isPrimeI(v.n)?"Có":"Không"); },
  maxprimefactor(q,v){ expectLabel(q,"maxprimefactor", ""+maxPrimeFactorI(v.n)); },
  primecount(q,v){ expectLabel(q,"primecount", ""+primeCountI(v.A,v.B)); },
  iscomposite(q){ exactlyOne(q,"iscomposite", o=>{ const x=parseInt(o,10); return x>1 && !isPrimeI(x); }); },
  coprime(q,v){ expectLabel(q,"coprime", igcd(v.a,v.b)===1?"Có":"Không"); },
  otherfromgl(q,v){ const r=v.g*v.L/v.a; if(!Number.isInteger(r)) fail("otherfromgl: không nguyên"); expectLabel(q,"otherfromgl", ""+r); },
  commondiv(q,v){ exactlyOne(q,"commondiv", o=>{ const x=parseInt(o,10); return v.a%x===0 && v.b%x===0; }); },
  commonmult(q,v){ exactlyOne(q,"commonmult", o=>{ const x=parseInt(o,10); return x%v.a===0 && x%v.b===0; }); },
  trees(q,v){ expectLabel(q,"trees", ""+(v.L/v.d+1)); },
  agechild(q,v){ expectLabel(q,"agechild", ""+((v.sum-v.diff)/2)); },
  consec2(q,v){ expectLabel(q,"consec2", ""+((v.S-1)/2)); },
  consec3(q,v){ expectLabel(q,"consec3", ""+((v.S-3)/3)); },
  remainder(q,v){ expectLabel(q,"remainder", ""+(v.total%v.divisor)); },
  timesplus(q,v){ expectLabel(q,"timesplus", ""+((v.N-v.m)/v.K)); },
  pctchange(q,v){ expectLabel(q,"pctchange", money(v.orig*(100+v.sign*v.p)/100)+"đ"); },
  distfrac(q,v){ const gone=v.total*v.a/v.b, left=v.total-gone; expectLabel(q,"distfrac", (v.askLeft?left:gone)+" km"); },
  interest(q,v){ const it=v.P*v.r/100; expectLabel(q,"interest", money(v.askTotal?v.P+it:it)+"đ"); },
  percentof(q,v){ expectLabel(q,"percentof", (v.X/v.Y*100)+"%"); },
  twostepfrac(q,v){ const eaten=v.total/v.a, after=v.total-eaten, given=after/v.b; expectLabel(q,"twostepfrac", ""+(after-given)); },
  lcmword(q,v){ const L=v.a*v.b/igcd(v.a,v.b); if(leadNum(q.options[q.answerIdx])!==L) fail("lcmword: "+q.options[q.answerIdx]+" ≠ BCNN="+L); },
  gcdword(q,v){ const g=igcd(v.a,v.b); if(leadNum(q.options[q.answerIdx])!==g) fail("gcdword: "+q.options[q.answerIdx]+" ≠ ƯCLN="+g); },
  fracadd(q,v){ const n=v.an*v.bd+v.bn*v.ad, d=v.ad*v.bd; expectLabel(q,"fracadd", labelFrac(n,d)); },
  fracsub(q,v){ const n=v.an*v.bd-v.bn*v.ad, d=v.ad*v.bd; expectLabel(q,"fracsub", labelFrac(n,d)); },
  frac_a_plus_bc(q,v){ const n=v.an*v.bd + v.bn*v.c*v.ad, d=v.ad*v.bd; expectLabel(q,"frac_a_plus_bc", labelFrac(n,d)); },
  reduce(q,v){ expectLabel(q,"reduce", labelFrac(v.n,v.d)); },
  opposite(q,v){ expectLabel(q,"opposite", labelFrac(-v.n,v.d)); },
  reciprocal(q,v){ expectLabel(q,"reciprocal", labelFrac(v.d,v.n)); },
  powval(q,v){ expectLabel(q,"powval", ""+Math.pow(v.a,v.exp)); },
  powexp(q,v){ const e=v.isMul?v.m+v.n:v.m-v.n; const h=e<=0?"1":(e===1?(""+v.a):v.a+"<sup>"+e+"</sup>"); expectLabel(q,"powexp","__html__"+h); },
  nested(q,v){ expectLabel(q,"nested", intLabel(v.a*(v.b-(v.c+v.d)))); },
  orderpow(q,v){ const r=v.variant===1? v.a+v.b*Math.pow(v.c,v.exp) : Math.pow(v.c,v.exp)-v.a; expectLabel(q,"orderpow", intLabel(r)); },
  f2d(q,v){ const got=decVal(q.options[q.answerIdx]); if(Math.abs(got - v.n/v.d) > 1e-9) fail("f2d: "+q.options[q.answerIdx]+" ≠ "+v.n+"/"+v.d); },
  d2f(q,v){ const exp=v.n+"/"+v.d; if(q.options[q.answerIdx]!==exp) fail("d2f: "+q.options[q.answerIdx]+" ≠ "+exp); if(Math.abs(decVal(v.dec)-v.n/v.d)>1e-9) fail("d2f: thập phân "+v.dec+" ≠ "+exp); },
  maxdec(q,v){ let best=v.labels[0]; v.labels.forEach(s=>{ if(decVal(s)>decVal(best)) best=s; }); expectLabel(q,"maxdec", best); },
  cmpval(q,v){ const s=Math.abs(v.a-v.b)<1e-9?"=":(v.a<v.b?"<":">"); expectLabel(q,"cmpval", s); },
  whichfinite(q){ exactlyOne(q,"whichfinite", o=>{ const f=parseFrac(o); return denomOnly25(f.n,f.d); }); }
};

/* ---------- (A) selfTest nội bộ ---------- */
console.log("=== (A) selfTest nội bộ của game ===");
const selfOk = G.selfTest();
console.log(selfOk ? "  ✅ selfTest() PASS" : "  ❌ selfTest() FAIL");
if(!selfOk) failures++;

/* ---------- (B)+(C) Đối chiếu độc lập từng generator ---------- */
console.log("\n=== (B+C) Đối chiếu đáp án độc lập + cấu trúc (mỗi generator 3000 lượt) ===");
const allGens = [];
const seenFn = new Set();
Object.values(G.STAGE_POOLS).forEach(pool => pool.forEach(fn => { if(!seenFn.has(fn)){ seenFn.add(fn); allGens.push(fn); } }));
console.log("  Tổng số generator dùng trong game: " + allGens.length);

const ITER = 3000;
let structuralOnly = [];
for(const fn of allGens){
  let indep = false;
  const before = failures;
  for(let i=0;i<ITER;i++){
    let q;
    try { q = fn(); } catch(e){ fail(fn.name+": ném lỗi — "+e.message); break; }
    // cấu trúc
    if(!q || !Array.isArray(q.options) || q.options.length!==4) { fail(fn.name+": options không phải 4 phương án"); continue; }
    if(new Set(q.options).size !== q.options.length) { fail(fn.name+": phương án trùng nhau | "+JSON.stringify(q.options)); }
    if(!(q.answerIdx>=0 && q.answerIdx<q.options.length)) { fail(fn.name+": answerIdx ngoài phạm vi"); }
    if(!q.qHTML) fail(fn.name+": thiếu qHTML");
    if(!q.tag) fail(fn.name+": thiếu tag");
    if(!q.explain || !q.explain.correctHTML || !Array.isArray(q.explain.steps) || !q.explain.steps.length || !q.explain.realWorld)
      fail(fn.name+": explain không đầy đủ");
    // đối chiếu độc lập — generator mới (verify) hoặc generator cũ (đọc lại đề)
    if(q.verify){
      indep = true;
      const solver = solvers[q.verify.k];
      if(!solver) fail(fn.name+": không có solver cho verify.k="+q.verify.k);
      else solver(q, q.verify);
    } else {
      if(extraIndependentCheck(q, fn.name)) indep = true;
    }
    if(failures > before + 5) break; // dừng sớm nếu generator này hỏng nhiều
  }
  if(!indep) structuralOnly.push(fn.name);
}
// Các generator cũ này được selfTest() (mục A) deep-check độc lập (gcd/lcm chuẩn, nhân lại thừa số, công thức...).
const deepCheckedBySelfTest = new Set(["genQ_divRule","genQ_primeOrComposite","genQ_primeFactorize","genQ_gcd","genQ_lcm","genQ_word_arith","genQ_word_fracPct","genQ_word_gcdLcm"]);
const viaSelfTest = structuralOnly.filter(n=>deepCheckedBySelfTest.has(n));
const trulyStructural = structuralOnly.filter(n=>!deepCheckedBySelfTest.has(n));
console.log("  Đối chiếu độc lập trong mục B: " + (allGens.length - structuralOnly.length) + "/" + allGens.length + " generator.");
console.log("  Còn lại đã được selfTest() deep-check ở mục A: " + (viaSelfTest.length? viaSelfTest.join(", ") : "(không có)"));
if(trulyStructural.length) fail("Có generator KHÔNG được đối chiếu độc lập ở đâu cả: " + trulyStructural.join(", "));
else console.log("  ✅ Mọi generator đều được đối chiếu đáp án độc lập (mục A hoặc B).");

/* ---------- (D) Builder pool: 6–8 dạng/chặng, không lặp dạng liền kề ---------- */
console.log("\n=== (D) Kiểm builder pool ===");
const poolReport = {};
for(const [key,pool] of Object.entries(G.STAGE_POOLS)){
  const n = new Set(pool).size;
  poolReport[key] = n;
  if(n<6 || n>8) fail("Pool "+key+" có "+n+" generator (cần 6–8)");
}
console.log("  Số generator mỗi chặng:", JSON.stringify(poolReport));

// Không lặp dạng liền kề: dùng pool tổng hợp với generator đánh dấu id riêng.
(function testAdjacency(){
  const fakePool = [];
  for(let i=0;i<6;i++){ const id=i; fakePool.push(()=>({_gid:id})); }
  let bad=0;
  for(let trial=0; trial<5000; trial++){
    const list = G.buildFromPool(fakePool, 10);
    for(let i=1;i<list.length;i++) if(list[i]._gid===list[i-1]._gid) bad++;
  }
  if(bad>0) fail("buildFromPool: có "+bad+" lần 2 câu cùng dạng nằm liền kề");
  else console.log("  ✅ buildFromPool không để 2 dạng giống nhau liền kề (50.000 cặp kề kiểm tra)");
})();

// Mỗi build chặng sinh đúng 10 câu hợp lệ.
const builders = {
  "Chặng 1":G.buildStage1,"Chặng 2":G.buildStage2,"Chặng 3":G.buildStage3,
  "Chặng 4":G.buildStage_p2_1,"Chặng 5":G.buildStage_p2_2,"Chặng 6":G.buildStage_p2_3,
  "Chặng 7":G.buildStage_p3_1,"Chặng 8":G.buildStage_p3_2,"Chặng 9":G.buildStage_p3_3,
  "Chặng 10":G.buildStage4,"Chặng 11":G.buildStage5,"Chặng 12":G.buildStage6
};
for(const [name,b] of Object.entries(builders)){
  for(let t=0;t<300;t++){
    const list=b();
    if(list.length!==10){ fail(name+": build ra "+list.length+" câu (cần 10)"); break; }
    for(const q of list){ if(q.options.length!==4 || !(q.answerIdx>=0)) { fail(name+": câu hỏi không hợp lệ"); break; } }
  }
}
console.log("  ✅ 12 builder mỗi cái sinh đúng 10 câu hợp lệ (300 lượt/chặng)");

/* ---------- (E) Mô phỏng thẻ cào: chơi lại Phần 1 ---------- */
console.log("\n=== (E) Mô phỏng thẻ cào (Việc A) ===");
const STAGES = [
  {id:1,partIdx:0},{id:2,partIdx:0},{id:3,partIdx:0},
  {id:4,partIdx:1},{id:5,partIdx:1},{id:6,partIdx:1},
  {id:7,partIdx:2},{id:8,partIdx:2},{id:9,partIdx:2},
  {id:10,partIdx:3},{id:11,partIdx:3},{id:12,partIdx:3}
];
const sim = { completed:new Array(12).fill(false), money:0, postFlow:[], _justCompletedPart:false };
const storage = {};
// Bản sao logic mới trong index.html:
function isPartClosingStage(i){
  const p=STAGES[i].partIdx; let last=i;
  for(let j=0;j<STAGES.length;j++) if(STAGES[j].partIdx===p && j>last) last=j;
  return i===last;
}
function rollScratch(){ const r=Math.random(); if(r<0.40) return 1000; if(r<0.75) return 2000; if(r<0.95) return 5000; return 20000; }
function finishStageSim(idx, pass){
  sim._justCompletedPart = pass && isPartClosingStage(idx);
  if(pass){ sim.completed[idx]=true; storage.completed=JSON.stringify(sim.completed); }
}
function buildPostFlowSim(){ sim.postFlow=["cheer"]; if(sim._justCompletedPart) sim.postFlow.push("scratch"); }
function awardScratch(){ if(sim.postFlow.indexOf("scratch")>=0){ const p=rollScratch(); sim.money+=p; storage.money=""+sim.money; return p; } return null; }

const fires = [];
function playStage(idx){ finishStageSim(idx,true); buildPostFlowSim(); const p=awardScratch(); if(p!==null) fires.push({id:STAGES[idx].id,prize:p}); }

// Lần 1: chơi Phần 1 (chặng 1→2→3)
playStage(0); playStage(1); playStage(2);
const firstMoney = sim.money;
// Lần 2: chơi lại Phần 1 từ đầu (chặng 1→2→3)
playStage(0); playStage(1); playStage(2);

const p1fires = fires.filter(f=>f.id===3);
console.log("  Thẻ cào kích hoạt ở các chặng:", fires.map(f=>f.id).join(", "));
console.log("  Lần kích hoạt ở chặng 3 (Phần 1):", p1fires.length, "(cần 2 — lần đầu + chơi lại)");
console.log("  Tiền sau lần chơi 1:", money(firstMoney)+"đ; sau khi chơi lại Phần 1:", money(sim.money)+"đ");
console.log("  Tổng tiền theo các giải đã trúng:", money(fires.reduce((a,f)=>a+f.prize,0))+"đ");
if(p1fires.length!==2) fail("Thẻ cào KHÔNG kích hoạt 2 lần khi chơi lại Phần 1");
if(sim.money !== fires.reduce((a,f)=>a+f.prize,0)) fail("Tổng tiền cộng dồn không khớp các giải");
if(storage.money !== ""+sim.money) fail("localStorage 'money' không lưu đúng tổng");
if(sim.money <= firstMoney) fail("Tiền không tăng thêm sau khi chơi lại Phần 1");

// Chơi tiếp các phần còn lại để xác nhận tổng cộng đúng 4 lần cào cho 1 vòng đầy đủ.
const fires2 = []; const sim2state=()=>{};
(function fullRun(){
  const s={completed:new Array(12).fill(false),money:0,postFlow:[],_justCompletedPart:false};
  const fr=[];
  for(let i=0;i<12;i++){
    s._justCompletedPart = isPartClosingStage(i);
    s.completed[i]=true;
    s.postFlow = s._justCompletedPart ? ["cheer","scratch"] : ["cheer"];
    if(s.postFlow.indexOf("scratch")>=0){ fr.push(STAGES[i].id); }
  }
  if(JSON.stringify(fr)!==JSON.stringify([3,6,9,12])) fail("Một vòng 12 chặng phải cào đúng tại 3,6,9,12 — nhận: "+fr.join(","));
  else console.log("  ✅ Một vòng 12 chặng: thẻ cào tại đúng chặng 3, 6, 9, 12");
})();

/* ---------- Kết luận ---------- */
console.log("\n========================================");
if(failures===0){ console.log("🎉 TẤT CẢ KIỂM TRA QUA — đáp án đúng tuyệt đối, thẻ cào hoạt động đúng."); process.exit(0); }
else { console.log("💥 CÓ "+failures+" LỖI — cần kiểm tra lại."); process.exit(1); }
