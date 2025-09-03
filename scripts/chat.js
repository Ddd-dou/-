(function(){
  const list = document.getElementById('chatList');
  const input = document.getElementById('msg');
  const send = document.getElementById('send');

  function push(text, side){
    const div = document.createElement('div');
    div.className = `msg ${side === 'right' ? 'msg--right' : 'msg--left'}`;
    div.textContent = text;
    list.appendChild(div);
    list.scrollTop = list.scrollHeight;
  }

  send.addEventListener('click', () => {
    const t = input.value.trim();
    if (!t) return;
    push(t, 'right');
    input.value = '';
    setTimeout(() => push('您好~ 已收到您的消息，我们会尽快处理~', 'left'), 500);
  });
})();

