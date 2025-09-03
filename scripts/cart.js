(function(){
  const { AppState } = window;
  const listEl = document.getElementById('list');
  const sumPointsEl = document.getElementById('sumPoints');
  const sumPriceEl = document.getElementById('sumPrice');
  const clearBtn = document.getElementById('clear');

  function render(){
    const cart = AppState.getCart();
    listEl.innerHTML = '';
    let points = 0, price = 0;
    cart.forEach(item => {
      const li = document.createElement('div');
      li.className = 'card';
      li.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
          <div>
            <div style="font-weight:600;">${item.name}</div>
            <div class="badge">数量 x ${item.qty}</div>
          </div>
          <div style="text-align:right;">
            ${item.points? `<div class="points">${item.points}积分</div>`: ''}
            ${item.price? `<div class="price">¥${item.price}</div>`: ''}
            <button class="btn btn--outline" data-sku="${item.sku}">-1</button>
          </div>
        </div>`;
      listEl.appendChild(li);
      if (item.points) points += item.points * item.qty;
      if (item.price) price += item.price * item.qty;
    });
    sumPointsEl.textContent = points;
    sumPriceEl.textContent = `¥${price}`;
  }

  listEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-sku]');
    if (!btn) return;
    const sku = btn.getAttribute('data-sku');
    const cart = AppState.getCart();
    const idx = cart.findIndex(x => x.sku === sku);
    if (idx >= 0) {
      cart[idx].qty -= 1;
      if (cart[idx].qty <= 0) cart.splice(idx,1);
      AppState.setCart(cart);
      render();
    }
  });

  clearBtn.addEventListener('click', () => { AppState.clearCart(); render(); });

  render();
})();

