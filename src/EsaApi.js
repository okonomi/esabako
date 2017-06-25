import axios from 'axios';

class EsaApi {
  constructor() {
    this.axios = axios.create({
      // timeout: 3000,
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_ESAIO_ACCESS_TOKEN}`,
        'Target-URL': 'https://api.esa.io',
      },
    });

    this.token = '';
    this.team = '';
  }

  getPost(number) {
    return this.axios.get('/v1/teams/' + this.team + '/posts/' + number);
  }

  createPost(params) {
    return this.axios.post('/v1/teams/' + this.team + '/posts', params);
  }

  updatePost(number, params) {
    return this.axios.patch('/v1/teams/' + this.team + '/posts/' + number, params);
  }
}

export default EsaApi;
