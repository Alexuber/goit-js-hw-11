import { Notify } from 'notiflix/build/notiflix-notify-aio';

const axios = require('axios').default;
const API_KEY = '33015202-198cac1ea48a9228f9ef5fb5a';
const BASE_URL = 'https://pixabay.com/api/';

const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');
const spinnerEl = document.querySelector('.spinner-border');

export default class Pixabay {
  constructor() {
    this.key = API_KEY;
    this.q = '';
    this.image_type = 'photo';
    this.orientation = 'horizontal';
    this.safesearch = true;
    this.page = 1;
    this.per_page = 9;
  }

  getImages() {
    return axios
      .get(
        `${BASE_URL}?key=${API_KEY}&q=${this.q}&image_type=${this.image_type}&orientation=${this.orientation}&safesearch=${this.safesearch}&page=${this.page}&per_page=${this.per_page}`
      )
      .then(function (response) {
        console.log('🆑 response', response);

        return response;
      })
      .then(images => {
        console.log('images -->', images);

        this.incrementPage();

        console.log(images.data.hits);

        return images.data.hits;
      })
      .catch(function (error) {
        console.log(error);
      });
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
    this.page = 1;
  }
  incrementPage() {
    this.page += 1;
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

  enable() {
    loadMoreBtnEl.disabled = false;
    spinnerEl.classList.add('is-hidden');
    loadMoreBtnEl.textContent = 'Load More';
  }
  disable() {
    loadMoreBtnEl.disabled = true;
    spinnerEl.classList.remove('is-hidden');
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
