const axios = require('axios').default;

module.exports = {
  setStatus(val) {
    axios.post('/set', {status: val}).then((response) => {
      this.updateUI(response.data.status);
    })
  },
  getStatus() {
    axios.get('/get').then((response) => {
      this.updateUI(response.data.status);
    })
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

module.exports.getStatus();
