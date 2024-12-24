document.getElementById('guestbook-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;

  const messageDiv = document.createElement('div');
  messageDiv.textContent = `${name}: ${message}`;

  document.getElementById('messages').appendChild(messageDiv);

  // 폼 초기화
  e.target.reset();
});