const axios = require('axios').default;

module.exports = {
  setStatus(val) {
    axios.post('/set', {status: val}).then((response) => {
      this.setValue(response.data.status);
    })
  },
  getStatus() {
    axios.get('/get').then((response) => {
      this.setValue(response.data.status);
    })
  },
  setValue(inMeeting) {
    if (inMeeting === true) {
      document.getElementById('status').innerText = "In a meeting";
      document.getElementById('toggleSwitch').setAttribute('checked', 'true');
    } else {
      document.getElementById('status').innerText = "Not in a meeting";
      document.getElementById('toggleSwitch').setAttribute('checked', 'false');
    }
  }
};

module.exports.getStatus();
