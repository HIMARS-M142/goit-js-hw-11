import axios from 'axios';
const BASIC_URL = 'https://pixabay.com/api/';
export default class PixabaySearch {
  constructor() {
    this.searchValue = '';
    this.pageValue = 1;
  }

  resetPage() {
    return (this.pageValue = 1);
  }

  async onPixabaySearch() {
    try {
      const response = await axios.get(`${BASIC_URL}`, {
        params: {
          key: '38635161-10d0366f68e32b154c323a4cf',
          q: this.searchValue,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: 'true',
          page: this.pageValue,
          per_page: 40,
        },
      });
      this.pageValue += 1;

      return await response.data;
    } catch {
      console.log('ERRROR!');
    }
  }

  get value() {
    return this.searchValue;
  }

  set value(search) {
    this.searchValue = search;
  }
}
