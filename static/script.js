const messageInput = document.getElementById("message-input");

setInterval(() => {
  if (messageInput.value === "") {
    window.location.reload();
  }
}, 5 * 1000);

function clicked() {
  alert("':'で文字を囲むと絵文字になります。");
}

const helpButton = document.getElementById("help");
helpButton.onclick = clicked;
