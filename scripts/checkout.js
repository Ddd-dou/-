(function(){
  const { AppState } = window;
  const pointsEl = document.getElementById('points');
  const sumPointsEl = document.getElementById('sumPoints');
  const sumPriceEl = document.getElementById('sumPrice');
  const payPointsBtn = document.getElementById('pay-points');
  const payMoneyBtn = document.getElementById('pay-money');

  function calc(){
    const cart = AppState.getCart();
    let points = 0, price = 0;
    cart.forEach(i => { if (i.points) points += i.points * i.qty; if (i.price) price += i.price * i.qty; });
    return { points, price };
  }

  function render(){
    const { points, price } = calc();
    sumPointsEl.textContent = points;
    sumPriceEl.textContent = `¥${price}`;
    pointsEl.textContent = AppState.getPoints();
  }

  function success(){
    alert('购买成功，客服将联系卖家并发货');
    AppState.clearCart();
    location.href = './shop.html';
  }

  payPointsBtn.addEventListener('click', () => {
    const { points } = calc();
    const cur = AppState.getPoints();
    if (points > cur) { alert('积分不足'); return; }
    AppState.setPoints(cur - points);
    success();
  });
  payMoneyBtn.addEventListener('click', () => { success(); });

  render();
})();

