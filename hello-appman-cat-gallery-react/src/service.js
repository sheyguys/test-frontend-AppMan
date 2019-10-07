import axios from 'axios';
import _ from 'lodash';

const Service = {
  fakeTimeResponse (response) {
    const fakeTime = Math.floor(Math.random() * 10000);
    const fakeReject = fakeTime%10 < 2;

    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        fakeReject ? reject() : resolve(response)
      }, fakeTime);
    });
  },

  getImageItems (size = 1) {
    return axios.get('/items.json')
        .then(response => this.fakeTimeResponse( _.sampleSize(response.data, size) ));
  },
}

export default Service;
