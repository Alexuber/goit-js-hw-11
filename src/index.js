import './saas/index.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Pixabay from './js/PixabayApiService';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
  pixabay.refreshMarkup();
  pixabay.page = 1;
  pixabay.q = searchInput.value; // не виходить дістатися через e.target ???

  pixabay.getImages().then(images => {
    console.log('im -->', images);

    if (images.data.hits.length === 0) {
      notifyNoData();
    } else {
      pixabay.page += 1;

      console.log(images.data.hits);
      pixabay.renderMarkup(images.data.hits);
      return images.data.hits; // Нужен ли тут Catch ????
    }
  });
}

loadMoreBtnEl.addEventListener('click', handleLoadMoreBtnClick);

function handleLoadMoreBtnClick(e) {
  pixabay.getImages().then(images => {
    console.log(images.data.hits);
    pixabay.page += 1;

    pixabay.renderMarkup(images.data.hits);
    return images.data.hits; // Нужен ли тут Catch ????
  });
}

function notifyNoData() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
