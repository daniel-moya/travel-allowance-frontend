// @flow

import axios from 'axios';

const backend_url = 'http://localhost:5000/';

class Base {
  baseUrl = `${backend_url}api`;

  get(endpoint: string, params: string) {
    const url = `${this.baseUrl}${endpoint}${params || ''}`;
    return axios.get(url);
  }

  get_custom(full_url: string, params: string) {
    const url = `${full_url}${params || ''}`;
    return axios.get(url);
  }

  post(endpoint: string, data: Object) {
    const url = `${this.baseUrl}${endpoint}`;
    return axios(url, {
      method: 'post',
      data
    });
  }
}

export default new Base();
