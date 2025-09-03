(function(){
  const { AppState } = window;
  const userInfo = document.getElementById('userInfo');
  const pointsEl = document.getElementById('points');
  const signBtn = document.getElementById('sign');
  const weightEl = document.getElementById('weight');
  const stageEl = document.getElementById('stage');
  const claimBtn = document.getElementById('claim');

  function getStage(w){
    if (w < 100) return '阶段：种子';
    if (w < 500) return '阶段：发芽（两片叶）';
    if (w < 1000) return '阶段：小苗（二期·五片叶）';
    if (w < 2000) return '阶段：大苗（小树苗）';
    if (w < 4000) return '阶段：大树苗（成年树苗·上架）';
    if (w < 5000) return '阶段：结果（成熟3颗）';
    return '阶段：可采摘';
  }

  function render(){
    const user = AppState.getUser();
    userInfo.textContent = user ? `${user.name}（${user.phone}）` : '未登录';
    pointsEl.textContent = AppState.getPoints();
    const w = AppState.getTreeWeightG();
    weightEl.textContent = w;
    stageEl.textContent = getStage(w);
  }

  signBtn.addEventListener('click', () => {
    if (!AppState.canSignToday()) { alert('今天已签到'); return; }
    AppState.signToday();
    render();
  });

  claimBtn.addEventListener('click', () => {
    // 简化逻辑：若已有树重>0视为已认领
    if (AppState.getTreeWeightG() > 0) { alert('已认领果树，采摘后可认领下一棵'); return; }
    AppState.setTreeWeightG(0);
    alert('认领成功，开始种植吧！');
    render();
  });

  // 简单轮播占位
  (function(){
    const el = document.getElementById('carousel');
    const texts = ['春季花开','夏日枝繁','果实初成','藤蔓缠绕','金黄成熟','丰收在望'];
    let i = 0;
    setInterval(()=>{ i=(i+1)%texts.length; el.textContent = '线下果园：' + texts[i]; }, 1800);
  })();

  render();
})();

