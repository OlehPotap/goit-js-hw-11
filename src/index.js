'use strict';
import Handlebars from 'handlebars';
import { FetchImages } from './js/fetchImages.js';
import imageBoxTamplate from './handlebars/image-tamplate';
import Notiflix from 'notiflix';
// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

const ImageSerchFormEl = document.querySelector('.search-form');
const ImageSearchInputEl = document.querySelector('input[name="searchQuery"]');
const ImageGalleryEl = document.querySelector('.gallery');

ImageSerchFormEl.addEventListener('submit', SubmitRequest);

async function SubmitRequest(event) {
  try {
    const options = {
      rootMargin: '0px 0px 200px 0px',
      threshold: 1,
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(async entrie => {
        if (entrie.isIntersecting) {
          const { hits } = await FetchImages(ImageSearchInputEl.value);
          hits.map(el => {
            ImageGalleryEl.insertAdjacentHTML('beforeend', imageBoxTamplate(el));
          });
        }
      });
      const lightbox = new SimpleLightbox('.gallery a', {});
    }, options);
    event.preventDefault();
    ImageGalleryEl.innerHTML = '';

    const { hits } = await FetchImages(ImageSearchInputEl.value);
    const lightbox = new SimpleLightbox('.gallery a', {});

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

    setTimeout(() => {
      observer.observe(document.querySelector('.observing'));
    }, 100);
  } catch (err) {
    console.log(err);
  }
}
