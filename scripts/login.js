(function(){
  const { AppState } = window;
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const formLogin = document.getElementById('form-login');
  const formRegister = document.getElementById('form-register');

  tabLogin.addEventListener('click', () => {
    tabLogin.classList.remove('btn--outline');
    tabLogin.classList.add('btn--primary');
    tabRegister.classList.remove('btn--primary');
    tabRegister.classList.add('btn--outline');
    formLogin.style.display = '';
    formRegister.style.display = 'none';
  });
  tabRegister.addEventListener('click', () => {
    tabRegister.classList.remove('btn--outline');
    tabRegister.classList.add('btn--primary');
    tabLogin.classList.remove('btn--primary');
    tabLogin.classList.add('btn--outline');
    formLogin.style.display = 'none';
    formRegister.style.display = '';
  });

  formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    const phone = document.getElementById('reg-phone').value.trim();
    const name = document.getElementById('reg-name').value.trim();
    const pass = document.getElementById('reg-pass').value;
    if (!/^1\d{10}$/.test(phone)) { alert('请输入有效的11位手机号'); return; }
    if (pass.length < 6) { alert('密码至少6位'); return; }
    const user = { phone, name, pass };
    AppState.setUser(user);
    // 新用户初始积分300
    AppState.setPoints(300);
    alert('注册成功，已为您发放300积分');
    location.href = './space.html';
  });

  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const phone = document.getElementById('login-phone').value.trim();
    const pass = document.getElementById('login-pass').value;
    const saved = AppState.getUser();
    if (!saved || saved.phone !== phone || saved.pass !== pass) {
      alert('账号或密码不正确，请先注册');
      return;
    }
    alert('登录成功');
    location.href = './space.html';
  });
})();

