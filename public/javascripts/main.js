const axios = require('axios').default;

const exports = {
  setStatus(val) {
    axios.post('/set', {status: val}).then((response) => {
      exports.setValue(response.data.status);
    })
  },
  getStatus() {
    axios.get('/get').then((response) => {
      exports.setValue(response.data.status);
    })
  },
  setValue(inMeeting) {
    if (inMeeting === true) {
      document.getElementById('status').innerText = "Go away!";
      document.getElementById('inMeeting').setAttribute('disabled', '');
      document.getElementById('notInMeeting').removeAttribute('disabled');
    } else {
      document.getElementById('status').innerText = "Come on in!";
      document.getElementById('inMeeting').removeAttribute('disabled');
      document.getElementById('notInMeeting').setAttribute('disabled', '');
    }
  }
};

module.exports = exports;
