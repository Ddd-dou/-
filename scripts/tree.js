(function(){
  const { AppState } = window;
  const canvas = document.getElementById('canvas');
  const rack = document.getElementById('rack');
  const weightEl = document.getElementById('weight');
  const stageEl = document.getElementById('stage');
  const pointsEl = document.getElementById('points');
  const btnNyy = document.getElementById('use-nyy');
  const btnFl = document.getElementById('use-fl');
  const btnYg = document.getElementById('use-yg');
  const harvestBtn = document.getElementById('harvest');

  function getStage(w){
    if (w < 100) return '种子';
    if (w < 500) return '发芽（两片叶）';
    if (w < 1000) return '小苗（二期·五片叶）';
    if (w < 2000) return '大苗（小树苗）';
    if (w < 4000) return '大树苗（成年树苗·上架）';
    if (w < 5000) return '结果（成熟3颗）';
    return '可采摘';
  }

  function draw(){
    canvas.querySelectorAll('.seed,.sprout,.sapling,.adult,.fruiting,.vine,.leaf,.kiwi').forEach(n=>n.remove());
    const w = AppState.getTreeWeightG();
    weightEl.textContent = w;
    stageEl.textContent = '阶段：' + getStage(w);
    pointsEl.textContent = AppState.getPoints();

    if (w < 100) {
      const seed = document.createElement('div');
      seed.className = 'seed';
      seed.style.width = '10px'; seed.style.height = '10px';
      seed.style.background = '#a78b71'; seed.style.borderRadius = '999px';
      seed.style.left = '50%'; seed.style.transform = 'translateX(-50%)';
      canvas.appendChild(seed);
    } else if (w < 500) {
      // sprout
      const stem = document.createElement('div');
      stem.className = 'sprout';
      stem.style.width = '3px'; stem.style.height = '40px'; stem.style.background = '#2ca66f';
      stem.style.left = '50%'; stem.style.transform = 'translateX(-50%)';
      canvas.appendChild(stem);
      createLeaf(0, 40);
      createLeaf(1, 50);
    } else if (w < 1000) {
      // five leaves
      const stem = document.createElement('div');
      stem.className = 'sprout';
      stem.style.width = '4px'; stem.style.height = '70px'; stem.style.background = '#2ca66f';
      stem.style.left = '50%'; stem.style.transform = 'translateX(-50%)';
      canvas.appendChild(stem);
      for (let i=0;i<5;i++) createLeaf(i%2, 40 + i*8);
    } else if (w < 2000) {
      // sapling
      const stem = document.createElement('div');
      stem.className = 'sapling';
      stem.style.width = '6px'; stem.style.height = '120px'; stem.style.background = '#2ca66f';
      stem.style.left = '50%'; stem.style.transform = 'translateX(-50%)';
      canvas.appendChild(stem);
      for (let i=0;i<8;i++) createLeaf(i%2, 60 + i*10);
    } else if (w < 4000) {
      // adult on rack
      rack.style.display = 'block';
      const vines = 5;
      for (let i=0;i<vines;i++) createVine(i);
    } else if (w < 5000) {
      rack.style.display = 'block';
      for (let i=0;i<6;i++) createVine(i);
      for (let k=0;k<3;k++) createKiwi(40 + k*60);
    } else {
      rack.style.display = 'block';
      for (let i=0;i<6;i++) createVine(i);
      for (let k=0;k<3;k++) createKiwi(40 + k*60);
    }
  }

  function createLeaf(side, height){
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.style.bottom = `${height}px`;
    leaf.style.left = side===0? 'calc(50% - 30px)': 'calc(50% + 16px)';
    if (side!==0) leaf.style.transform = 'rotate(-25deg)';
    canvas.appendChild(leaf);
  }

  function createVine(i){
    const vine = document.createElement('div');
    vine.className = 'vine';
    vine.style.height = `${120 + (i%3)*20}px`;
    vine.style.left = `calc(15% + ${i*12}%)`;
    canvas.appendChild(vine);
    for (let j=0;j<6;j++) {
      const leaf = document.createElement('div');
      leaf.className = 'leaf';
      leaf.style.bottom = `${90 + j*12}px`;
      leaf.style.left = `calc(15% + ${i*12}% + ${(j%2===0)? -20: 14}px)`;
      if (j%2===1) leaf.style.transform = 'rotate(-25deg)';
      canvas.appendChild(leaf);
    }
  }

  function createKiwi(xPercent){
    const k = document.createElement('div');
    k.className = 'kiwi';
    k.style.left = `calc(${xPercent}% - 9px)`;
    k.style.bottom = '140px';
    canvas.appendChild(k);
  }

  function spendPoints(cost, gain){
    const cur = AppState.getPoints();
    if (cur < cost) { alert('积分不足'); return; }
    AppState.setPoints(cur - cost);
    AppState.addTreeWeightG(gain);
    draw();
  }

  btnNyy.addEventListener('click', () => spendPoints(50, 100));
  btnFl.addEventListener('click', () => spendPoints(100, 200));
  btnYg.addEventListener('click', () => spendPoints(30, 50));

  harvestBtn.addEventListener('click', () => {
    const w = AppState.getTreeWeightG();
    if (w < 5000) { alert('尚未到可采摘阶段'); return; }
    AppState.addPoints(2000);
    AppState.setTreeWeightG(0);
    alert('采摘成功，获得2000积分！');
    draw();
  });

  draw();
})();

