'use strict';

import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const MY_API_KEY = '25419147-5e3b8aa1374258c5e90c55338';
const OPTIONS = '&image_type=photo&orientation=horizontal&safesearch=true&per_page=40';
let pageChanger = 1;

export async function FetchImages(query) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}?q=${query}${OPTIONS}&page=${pageChanger}&key=${MY_API_KEY}`,
    );
    pageChanger += 1;
    return data;
  } catch (err) {
    console.log(err);
  }
}
