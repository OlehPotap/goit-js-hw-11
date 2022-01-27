'use strict';
import Handlebars from 'handlebars';
import { FetchImages } from './js/fetchImages.js';
import imageBoxTamplate from './handlebars/image-tamplate';
import Notiflix from 'notiflix';
import { noConflict } from 'handlebars/runtime';

const ImageSerchFormEl = document.querySelector('.search-form');
const ImageSearchInputEl = document.querySelector('input[name="searchQuery"]');
const ImageGalleryEl = document.querySelector('.gallery');

ImageSerchFormEl.addEventListener('submit', SubmitRequest);

function SubmitRequest(event) {
  event.preventDefault();
  ImageGalleryEl.innerHTML = '';

  FetchImages(ImageSearchInputEl.value)
    .then(({ hits } = {}) => {
      if (hits.length == 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        );
        return;
      } else if (ImageSearchInputEl.value === '') {
        Notiflix.Notify.info('Please type something');
        return;
      }
      hits.map(el => {
        ImageGalleryEl.insertAdjacentHTML('beforeend', imageBoxTamplate(el));
      });
    })
    .catch(err => {
      console.log('ты напартачил');
    });
}
