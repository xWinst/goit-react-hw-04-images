import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';

const API_KEY = '28388754-d7a8c797da0312bb5ddb1e0ef';

class Delivery {
  #query;

  constructor() {
    this.page = 1;
    this.per_page = 12;
  }

  set query(newQuery) {
    this.page = 1;
    this.#query = newQuery;
  }

  get query() {
    return this.#query;
  }

  async fetch() {
    const response = await axios.get(`/?key=${API_KEY}`, {
      params: {
        q: this.#query,
        page: this.page,
        per_page: this.per_page,
        image_type: 'foto',
        orientation: 'horizontal',
      },
    });
    if (this.page > response.data.totalHits / this.per_page) {
      response.data.isEnd = true;
    }
    this.page += 1;
    return response.data;
  }
}

export default new Delivery();
