const {io} = require("socket.io-client");
const socket = io(':3000', {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttemps: 10,
  transports: ['websocket'],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false
});

module.exports = {
  setStatus(val) {
    socket.emit("status", val);
  },
  connect() {
    socket.on("connect", () => {
      console.log('Connection to socket established!');
    });

    socket.on('status', (status) => {
      console.log('status: ', status);
      this.updateUI(status);
    });
  },
  updateUI(inMeeting) {
    if (inMeeting === true) {
      document.getElementById('status').innerText = "In a meeting";
      document.getElementById('toggleSwitch').checked = true;
    } else {
      document.getElementById('status').innerText = "Not in a meeting";
      document.getElementById('toggleSwitch').checked = false;
    }
  }
};

module.exports.connect();
