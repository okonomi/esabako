import axios from 'axios';

class EsaApi {
  constructor() {
    this.axios = axios.create({
      baseURL: 'http://localhost:8080',
      // timeout: 3000,
      headers: {
        'Authorization': 'Bearer a768efa2acb0757e4621b2902bf4364afa959d77185b7d8fbb1e46a8b66c8ef8',
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
