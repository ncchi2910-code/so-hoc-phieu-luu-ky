/* Mô phỏng logic thẻ cào v3.2 (bản sao chính xác từ index.html sau bản vá):
   - Trao thẻ cào MỖI lần vượt chặng CUỐI của một Phần (chặng 3, 6, 9, 12),
     kể cả khi phần đó đã từng hoàn tất (đã bỏ điều kiện chống-spam cũ).
   - Tiền cộng dồn và lưu localStorage.
   Kiểm: chơi Phần 1 (cào lần 1) → chơi lại Phần 1 (cào lần 2); tiền cộng dồn.
   (Test toàn diện hơn — gồm cả generator — nằm ở test_v3_2.js.) */

const STAGES = [
  { id:1,  partIdx:0 }, { id:2,  partIdx:0 }, { id:3,  partIdx:0 },
  { id:4,  partIdx:1 }, { id:5,  partIdx:1 }, { id:6,  partIdx:1 },
  { id:7,  partIdx:2 }, { id:8,  partIdx:2 }, { id:9,  partIdx:2 },
  { id:10, partIdx:3 }, { id:11, partIdx:3 }, { id:12, partIdx:3 }
];

const state = { completed: new Array(STAGES.length).fill(false), money: 0, postFlow: [], _justCompletedPart: false };
const storage = {};
const saveMoney = () => { storage.money = "" + state.money; };
const saveCompleted = () => { storage.completed = JSON.stringify(state.completed); };

// ----- Bản sao logic index.html v3.2 -----
function isPartClosingStage(i){
  const p = STAGES[i].partIdx;
  let last = i;
  for(let j=0;j<STAGES.length;j++) if(STAGES[j].partIdx===p && j>last) last=j;
  return i===last;
}
function rollScratch(){
  const r = Math.random();
  if(r<0.40) return 1000;
  if(r<0.75) return 2000;
  if(r<0.95) return 5000;
  return 20000;
}
function finishStage(stageIdx, pass){
  state._justCompletedPart = pass && isPartClosingStage(stageIdx);
  if(pass){ state.completed[stageIdx] = true; saveCompleted(); }
}
function buildPostFlow(){
  state.postFlow = ["cheer"];
  if(state._justCompletedPart) state.postFlow.push("scratch");
}
function awardScratchIfPending(){
  if(state.postFlow.includes("scratch")){ const prize = rollScratch(); state.money += prize; saveMoney(); return prize; }
  return null;
}

const fires = [];
function play(stageIdx){
  finishStage(stageIdx, true);
  buildPostFlow();
  const prize = awardScratchIfPending();
  if(prize!==null) fires.push({ stageId: STAGES[stageIdx].id, prize });
}

console.log("=== MÔ PHỎNG THẺ CÀO v3.2 ===\n");

// Lần 1: chơi Phần 1 (chặng 1 → 2 → 3)
play(0); play(1); play(2);
const moneyAfterFirst = state.money;
console.log("Sau khi chơi Phần 1 lần đầu: thẻ cào ở chặng", fires.map(f=>f.stageId).join(", "), "| tiền =", state.money.toLocaleString("vi-VN")+"đ");

// Lần 2: chơi LẠI Phần 1 từ đầu (chặng 1 → 2 → 3)
play(0); play(1); play(2);
console.log("Sau khi chơi LẠI Phần 1:      thẻ cào ở chặng", fires.map(f=>f.stageId).join(", "), "| tiền =", state.money.toLocaleString("vi-VN")+"đ");
console.log("");

const stage3Fires = fires.filter(f=>f.stageId===3);
const sumPrizes = fires.reduce((a,f)=>a+f.prize, 0);

let ok = true;
function assert(cond, msg){ console.log((cond?"  ✅ ":"  ❌ ")+msg); if(!cond) ok=false; }

console.log("--- Kiểm tra ---");
assert(stage3Fires.length===2, "Thẻ cào kích hoạt 2 lần ở chặng 3 (lần đầu + chơi lại)");
assert(state.money > moneyAfterFirst, "Tiền tăng thêm sau khi chơi lại Phần 1");
assert(state.money === sumPrizes, "state.money cộng dồn khớp tổng các giải ("+sumPrizes.toLocaleString("vi-VN")+"đ)");
assert(storage.money === ""+state.money, "localStorage lưu đúng tổng tiền");

console.log("");
console.log(ok ? "🎉 THẺ CÀO HOẠT ĐỘNG ĐÚNG — trao mỗi lần xong phần, tiền cộng dồn." : "💥 CÓ LỖI.");
process.exit(ok ? 0 : 1);
