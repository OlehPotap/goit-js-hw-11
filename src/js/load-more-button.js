'use strict';

const loadMoreBtnEl = document.querySelector('.load-more');

if (document.querySelector('.gallery').children.length === 0) {
  loadMoreBtnEl.setAttribute('class', 'is-hidden');
}

loadMoreBtnEl.addEventListener('click', event => {});
