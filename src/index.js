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

searchFormEl.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();

  pixabay.q = searchInput.value;

  pixabay.getImages().then(images => {
    console.log(images.data.hits);
    pixabay.renderMarkup(images.data.hits);
    return images.data.hits; // Нужен ли тут Catch ????
  });
}
