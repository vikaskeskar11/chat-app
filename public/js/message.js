function getMessages () {
  $.ajax({
    method: 'GET',
    url: '/message',
    headers: {
      token: getCookie('token')
    },
    success: (response) => {
      for (let msg of response) {
        msg = `[${msg.created}] - [${msg.sentBy.username}]: ${msg.message}`
        $('#messages').append($('<li>').text(msg))
      }
    },
    error: () => {
      alert('Error occurred')
    }
  })
}
