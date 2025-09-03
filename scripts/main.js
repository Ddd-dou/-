(function () {
  const STORAGE_KEYS = {
    user: 'tymy:user',
    points: 'tymy:points',
    treeWeightG: 'tymy:treeWeightG',
    lastSignDate: 'tymy:lastSignDate',
    cart: 'tymy:cart'
  };

  function getTodayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
  }

  window.AppState = {
    STORAGE_KEYS,
    getUser() { try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.user) || 'null'); } catch { return null; } },
    setUser(user) { localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user)); },
    getPoints() { return Number(localStorage.getItem(STORAGE_KEYS.points) || 0); },
    setPoints(v) { localStorage.setItem(STORAGE_KEYS.points, String(Math.max(0, Math.floor(v)))); },
    addPoints(delta) { this.setPoints(this.getPoints() + Number(delta||0)); },
    getTreeWeightG() { return Number(localStorage.getItem(STORAGE_KEYS.treeWeightG) || 0); },
    setTreeWeightG(v) { localStorage.setItem(STORAGE_KEYS.treeWeightG, String(Math.max(0, Math.floor(v)))); },
    addTreeWeightG(delta) { this.setTreeWeightG(this.getTreeWeightG() + Number(delta||0)); },
    getCart() { try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.cart) || '[]'); } catch { return []; } },
    setCart(list) { localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(list||[])); },
    clearCart() { this.setCart([]); },
    canSignToday() { return localStorage.getItem(STORAGE_KEYS.lastSignDate) !== getTodayKey(); },
    signToday() { localStorage.setItem(STORAGE_KEYS.lastSignDate, getTodayKey()); this.addPoints(100); }
  };

  // 初始化默认积分/树重（新用户注册将覆盖）
  if (localStorage.getItem(STORAGE_KEYS.points) == null) {
    localStorage.setItem(STORAGE_KEYS.points, '0');
  }
  if (localStorage.getItem(STORAGE_KEYS.treeWeightG) == null) {
    localStorage.setItem(STORAGE_KEYS.treeWeightG, '0');
  }
})();

