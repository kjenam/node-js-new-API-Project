function sendChatMessage(message) {
  console.log("sending message:", message, "at", Date.now());
}

function throttle(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    fn(...args);
  };
}

const sendThrottledMessage = throttle(sendChatMessage, 2000);

setTimeout(() => sendThrottledMessage("1st message"), 0);
setTimeout(() => sendThrottledMessage("2nd message"), 300);
setTimeout(() => sendThrottledMessage("3rd message"), 600);
setTimeout(() => sendThrottledMessage("4th message"), 900);
setTimeout(() => sendThrottledMessage("5th message"), 2500);
