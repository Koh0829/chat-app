const messageInput = document.getElementById("message-input");

setInterval(() => {
  if (messageInput.value === "") {
    window.location.reload();
  }
}, 5 * 1000);

const submitButton = document.getElementById("submit");
messageInput.oninput = () => {
  submitButton.disabled = messageInput.value === "";
};