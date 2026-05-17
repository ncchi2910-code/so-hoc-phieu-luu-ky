/* Simulation test: replays the finishStage / buildPostFlow logic exactly as it
   appears in index.html (post-fix) and verifies that the scratch card fires at
   chặng 3, 6, 9, 12 and that money accumulates correctly. */

const STAGES = [
  { id:1,  partIdx:0 }, { id:2,  partIdx:0 }, { id:3,  partIdx:0 },
  { id:4,  partIdx:1 }, { id:5,  partIdx:1 }, { id:6,  partIdx:1 },
  { id:7,  partIdx:2 }, { id:8,  partIdx:2 }, { id:9,  partIdx:2 },
  { id:10, partIdx:3 }, { id:11, partIdx:3 }, { id:12, partIdx:3 }
];

const state = {
  stageIdx: 0,
  completed: new Array(STAGES.length).fill(false),
  money: 0,
  postFlow: [],
  pendingScratchPart: null,
  _justCompletedPart: false
};

const storage = {};
const saveMoney = () => { storage.money = "" + state.money; };
const saveCompleted = () => { storage.completed = JSON.stringify(state.completed); };

function isPartComplete(p){
  for(let i=0;i<STAGES.length;i++) if(STAGES[i].partIdx===p && !state.completed[i]) return false;
  return true;
}

function rollScratch(){
  const r = Math.random();
  if(r<0.40) return 1000;
  if(r<0.75) return 2000;
  if(r<0.95) return 5000;
  return 20000;
}

// ----- Replica of fixed finishStage logic -----
function finishStage(){
  const s = STAGES[state.stageIdx];
  const pass = true; // simulate Kim always passes
  const wasCompleted = state.completed[state.stageIdx];
  const partWasComplete = isPartComplete(s.partIdx);
  state._justCompletedPart = pass && !wasCompleted && !partWasComplete && (()=>{
    state.completed[state.stageIdx] = true;        // <-- FIXED (was s.stageIdx, undefined)
    const ok = isPartComplete(s.partIdx);
    state.completed[state.stageIdx] = wasCompleted;
    return ok;
  })();
  if(pass){
    state.completed[state.stageIdx] = true;
    saveCompleted();
  }
}

function buildPostFlow(){
  const stage = STAGES[state.stageIdx];
  state.postFlow = ["cheer"];
  if(state._justCompletedPart){
    state.pendingScratchPart = stage.partIdx;
    state.postFlow.push("scratch");
  } else {
    state.pendingScratchPart = null;
  }
}

function awardScratchIfPending(){
  if(state.postFlow.includes("scratch")){
    const prize = rollScratch();
    state.money += prize;
    saveMoney();
    return prize;
  }
  return null;
}

// ----- Drive 12 chapters in sequence -----
const scratchFires = [];   // [{stageId, partIdx, prize}, ...]
for(let i=0;i<STAGES.length;i++){
  state.stageIdx = i;
  finishStage();
  buildPostFlow();
  const prize = awardScratchIfPending();
  if(prize !== null){
    scratchFires.push({ stageId: STAGES[i].id, partIdx: STAGES[i].partIdx, prize });
  }
}

// ----- Assertions -----
const expectedStageIds = [3, 6, 9, 12];
const actualStageIds = scratchFires.map(f => f.stageId);

console.log("=== KẾT QUẢ MÔ PHỎNG 12 CHẶNG ===\n");
console.log("Thẻ cào kích hoạt ở các chặng:", actualStageIds.join(", "));
console.log("Số lần kích hoạt:", scratchFires.length, "(mong đợi 4)");
console.log("");

scratchFires.forEach(f => {
  console.log(`  • Chặng ${f.stageId} (Phần ${f.partIdx + 1}) → trúng ${f.prize.toLocaleString("vi-VN")}đ`);
});

const sumOfPrizes = scratchFires.reduce((a,f)=>a+f.prize, 0);
console.log("");
console.log("Tổng tiền cộng dồn (state.money):", state.money.toLocaleString("vi-VN") + "đ");
console.log("Tổng tiền theo các giải đã trúng:", sumOfPrizes.toLocaleString("vi-VN") + "đ");
console.log("localStorage 'money':", storage.money);
console.log("");

let ok = true;
function assert(cond, msg){
  if(!cond){ console.log("  ❌ " + msg); ok = false; }
  else      { console.log("  ✅ " + msg); }
}

console.log("--- Kiểm tra ---");
assert(scratchFires.length === 4, "Thẻ cào kích hoạt đúng 4 lần");
assert(JSON.stringify(actualStageIds) === JSON.stringify(expectedStageIds),
       "Kích hoạt đúng tại chặng 3, 6, 9, 12 (cuối mỗi Phần)");
assert(state.money === sumOfPrizes, "state.money cộng dồn khớp tổng các giải");
assert(storage.money === "" + state.money, "localStorage lưu đúng tổng tiền");
assert(state.completed.every(x => x === true), "Tất cả 12 chặng đã đánh dấu hoàn thành");

console.log("");
console.log(ok ? "🎉 TẤT CẢ KIỂM TRA QUA — bug đã sửa." : "💥 CÓ LỖI — kiểm tra lại.");
process.exit(ok ? 0 : 1);
