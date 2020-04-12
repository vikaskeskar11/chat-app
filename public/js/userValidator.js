function validateToken () {
  // TODO:
}

function login () {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  $.ajax({
    method: 'POST',
    url: '/user/login',
    data: { username, password },
    success: function (response) {
      setCookie('token', response.token)
      socket.emit('new user', response.token)
      window.location.href = 'index.html'
    },
    error: function () {
      alert('Error occurred or please check username or password')
    }
  })
}
