import './saas/index.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const API_KEY = '33015202-198cac1ea48a9228f9ef5fb5a';
const BASE_URL = 'https://pixabay.com/api/';
const axios = require('axios');

function getImages() {
  return axios
    .get(`${BASE_URL}/?key=${API_KEY}&q=flowers`)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

getImages().then(data => console.log(data));
