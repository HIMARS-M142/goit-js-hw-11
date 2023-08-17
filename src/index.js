import Notiflix from 'notiflix';
import PixabaySearch from './index-api';
const pixabaySearch = new PixabaySearch();
const form = document.querySelector('.search-form');
const buttonEl = document.querySelector('.load-more');
const divEl = document.querySelector('.gallery');
const formBtn = document.querySelector('.form-btn');
buttonEl.hidden = true;

form.addEventListener('submit', onFormSubmit);
buttonEl.addEventListener('click', onButtonClick);

function onFormSubmit(e) {
  e.preventDefault();

  pixabaySearch.value = e.target.elements.searchQuery.value;
  pixabaySearch.resetPage();
  divEl.innerHTML = '';
  pixabaySearch.onPixabaySearch().then(onCreateMArkup).finally();
}

function onButtonClick(e) {
  pixabaySearch.onPixabaySearch().then(onCreateMArkup).finally();
}

function onCreateMArkup(data) {
  buttonEl.hidden = true;

  if (data.totalHits === 0) {
    buttonEl.hidden = true;

    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else if (data.hits.length === 0) {
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  } else {
    buttonEl.hidden = false;
    data.hits.map(d => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = d;
      const createMarkup = `<div class="photo-card">
  <img width='360' height='260' src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`;
      divEl.insertAdjacentHTML('beforeend', createMarkup);
    });
  }
}
