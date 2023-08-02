import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const catImage = document.querySelector('.cat-image');
const catName = document.querySelector('.cat-name');
const catDescription = document.querySelector('.cat-description');
const catTemperament = document.querySelector('.cat-temperament');

// Function to show loader
function showLoader() {
  loader.style.display = 'block';
}

// Function to hide loader
function hideLoader() {
  loader.style.display = 'none';
}

// Function to show error
function showError() {
  error.style.display = 'block';
}

// Function to hide error
function hideError() {
  error.style.display = 'none';
}

// Function to show cat info
function showCatInfo() {
  catInfo.style.display = 'block';
}

// Function to hide cat info
function hideCatInfo() {
  catInfo.style.display = 'none';
}

// Function to populate breed options
function populateBreedOptions(breeds) {
  breedSelect.innerHTML = '';
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.innerText = breed.name;
    breedSelect.appendChild(option);
  });
}

// Function to update cat information
function updateCatInfo(catData) {
  catImage.innerHTML = `<img src="${catData[0].url}" alt="Cat Image">`;
  catName.innerText = catData[0].breeds[0].name;
  catDescription.innerText = catData[0].breeds[0].description;
  catTemperament.innerText = catData[0].breeds[0].temperament;
}

// Event listener for breed selection
breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;

  showLoader();
  hideError();
  hideCatInfo();

  fetchCatByBreed(selectedBreedId)
    .then(data => {
      updateCatInfo(data);
      hideLoader();
      showCatInfo();
    })
    .catch(() => {
      showError();
      hideLoader();
    });
});

// Initial setup
showLoader();
hideError();
hideCatInfo();

fetchBreeds()
  .then(data => {
    populateBreedOptions(data);
    hideLoader();
    breedSelect.disabled = false;
  })
  .catch(() => {
    showError();
    hideLoader();
    breedSelect.disabled = true;
  });
