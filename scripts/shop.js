(function(){
  const { AppState } = window;
  const pointsEl = document.getElementById('points');
  function refreshPoints(){ pointsEl && (pointsEl.textContent = AppState.getPoints()); }
  refreshPoints();

  function addToCart(item){
    const cart = AppState.getCart();
    const found = cart.find(x => x.sku === item.sku);
    if (found) found.qty += 1; else cart.push({ ...item, qty: 1 });
    AppState.setCart(cart);
    alert('已加入购物车');
  }

  document.querySelectorAll('button[data-sku]').forEach(btn => {
    btn.addEventListener('click', () => {
      const sku = btn.getAttribute('data-sku');
      const name = btn.getAttribute('data-name');
      const price = btn.getAttribute('data-price');
      const points = btn.getAttribute('data-points');
      addToCart({ sku, name, price: price? Number(price): null, points: points? Number(points): null });
    });
  });
})();

