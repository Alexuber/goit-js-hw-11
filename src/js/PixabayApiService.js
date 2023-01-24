import { Notify } from 'notiflix/build/notiflix-notify-aio';

const axios = require('axios').default;
const API_KEY = '33015202-198cac1ea48a9228f9ef5fb5a';
const BASE_URL = 'https://pixabay.com/api/';

const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

export default class Pixabay {
  constructor() {
    (this.options = {
      baseURL: BASE_URL,
      params: {
        key: API_KEY,
        q: '',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: 1,
        per_page: 40,
      },
    }),
      (this.prevQuery = '');
  }

  async getImages() {
    const response = await axios.get(`${this.options.baseURL}`, this.options);

    if (response.data.hits.length === 0) {
      this.hide();
    }
    this.incrementPage();

    return response.data;
  }

  renderMarkup(arrOfImages) {
    const markup = arrOfImages
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) =>
          `<a href=${largeImageURL} class="photo-card" title="">
            <img class="photo-card__img" src=${webformatURL} alt=${tags} loading="lazy"/>
            <div class="info">
              <p class="info-item">
                <b>Likes</b>${likes}
              </p>
              <p class="info-item">
                <b>Views</b>${views}
              </p>
              <p class="info-item">
                <b>Comments</b>${comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>${downloads}
              </p>
            </div>
          </a>`
      )
      .join('');
    galleryEl.insertAdjacentHTML('beforeend', markup);
  }
  refreshMarkup() {
    galleryEl.innerHTML = '';
  }
  resetPage() {
    this.options.params.page = 1;
  }
  incrementPage() {
    this.options.params.page += 1;
  }

  notifyNoData() {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  notifyEmptyQuery() {
    Notify.warning('Searching field is empty!');
  }

  notifySucces(totalHits) {
    Notify.success(`Hooray! We found ${totalHits} images.`);
  }

  notifyEndOfSearchResults() {
    this.hide();
    Notify.info("We're sorry, but you've reached the end of search results.");
  }

  notifyAlreadyUploaded() {
    Notify.warning(
      'Your images have been found and already have been uploaded!'
    );
  }

  enable() {
    loadMoreBtnEl.disabled = false;
    loadMoreBtnEl.textContent = 'Load More';
  }
  disable() {
    loadMoreBtnEl.disabled = true;
    loadMoreBtnEl.textContent = 'Loading';
  }
  show() {
    loadMoreBtnEl.classList.remove('is-hidden');
  }
  hide() {
    loadMoreBtnEl.classList.add('is-hidden');
  }
  slowScroll() {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
