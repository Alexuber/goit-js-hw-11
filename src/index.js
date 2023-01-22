import './saas/index.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Pixabay from './js/PixabayApiService';

const lihgtBoxOptions = { captionDelay: 250, scrollZoom: false };
const lightbox = new SimpleLightbox('.gallery .photo-card', lihgtBoxOptions);
const pixabay = new Pixabay();

const searchFormEl = document.querySelector('.search-form');
const searchBtnEl = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-txt');
const loadMoreBtnEl = document.querySelector('.load-more');

searchFormEl.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();

  const userQuery = searchInput.value.trim();

  if (userQuery === '') {
    pixabay.notifyEmptyQuery();
  } else {
    pixabay.q = searchInput.value; // не виходить дістатися через e.target ???
    pixabay.resetPage();

    pixabay.getImages().then(images => {
      if (images.length === 0) {
        pixabay.notifyNoData();
      } else {
        pixabay.renderMarkup(images);
      }
    });

    pixabay.refreshMarkup();
  }
}

loadMoreBtnEl.addEventListener('click', handleLoadMoreBtnClick);

function handleLoadMoreBtnClick(e) {
  pixabay.getImages().then(images => pixabay.renderMarkup(images));
}
