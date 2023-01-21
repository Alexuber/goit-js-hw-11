import './saas/index.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const API_KEY = '33015202-198cac1ea48a9228f9ef5fb5a';
const BASE_URL = 'https://pixabay.com/api/';
const axios = require('axios');

const galleryEl = document.querySelector('.gallery');

const searchParams = new URLSearchParams({
  key: API_KEY,
  q: 'flowers',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});

// const options = {
//   webformatURL,
//   largeImageURL,
//   tags,
//   likes,
//   views,
//   comments,
//   downloads,
// };

function getImages() {
  return axios
    .get(`${BASE_URL}?${searchParams}`)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

getImages().then(images => {
  console.log(images.data.hits);
  renderMarkup(images.data.hits);
  return images.data.hits; // Нужен ли тут Catch ????
});

function renderMarkup(arrOfImages) {
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
        `<div class="photo-card">
        <img class="photo-card__img" src=${webformatURL} alt=${tags} loading="lazy" width="300px"/>
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
      </div>`
    )
    .join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);
}
