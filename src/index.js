import './saas/index.scss';
import './js/btn-up.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Pixabay from './js/PixabayApiService';

const lihgtBoxOptions = { captionDelay: 250, scrollZoom: false };
let simpleLightbox;
const pixabay = new Pixabay();

const searchFormEl = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-txt');
const loadMoreBtnEl = document.querySelector('.load-more');
const startBlockEl = document.querySelector('.start');

pixabay.hide();

searchFormEl.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();

  const userQuery = searchInput.value.trim();

  if (userQuery === '') {
    pixabay.notifyEmptyQuery();
  } else {
    startBlockEl.style.display = 'none';

    pixabay.show();
    pixabay.q = searchInput.value;
    pixabay.resetPage();

    pixabay
      .getImages()
      .then(images => {
        if (images.length === 0) {
          pixabay.notifyNoData();
        } else {
          pixabay.renderMarkup(images);
          simpleLightbox = new SimpleLightbox('.gallery a', lihgtBoxOptions);
          pixabay.notifySucces(images.length);
        }
      })
      .catch(() => pixabay.notifyNoData());

    pixabay.refreshMarkup();
  }
}

loadMoreBtnEl.addEventListener('click', handleLoadMoreBtnClick);

function handleLoadMoreBtnClick(e) {
  pixabay.disable();
  pixabay
    .getImages()
    .then(images => {
      pixabay.renderMarkup(images);
      simpleLightbox.refresh();

      pixabay.notifySucces(images.length);

      pixabay.slowScroll();
      pixabay.enable();
    })
    .catch(() => {
      pixabay.enable();
    });
}

// make infinite-scroll - 2nd variant
// How add styles of Bootstrap from package
