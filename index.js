console.clear();

import { CharacterCard } from "./components/CharacterCard/CharacterCard.js";
const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
  );
  const searchBar = document.querySelector('[data-js="search-bar"]');
  const navigation = document.querySelector('[data-js="navigation"]');
  const prevButton = document.querySelector('[data-js="button-prev"]');
  const nextButton = document.querySelector('[data-js="button-next"]');
  const pagination = document.querySelector('[data-js="pagination"]');
  
  // States
  
  let maxPage = 1;
  const minPage = 1;
  let page = 1;
  let searchQuery = "";
  
  
  // fetch Rick&Morty API
  
  
  
  async function fetchData() {
    cardContainer.innerHTML=``
    const url = `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`;
    console.log(searchQuery);
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    maxPage = data.info.pages;
    console.log(data.results);
    updatePaginationDisplay();
    data.results.forEach((result) => {
      CharacterCard(result);
  });
  return data;
}

fetchData();

nextButton.addEventListener('click', () => {
    if (page < maxPage) {
    page++;
    } else {
      page = 1
    } 
    fetchData();
})
prevButton.addEventListener('click', () => {
  if (page > minPage) {
     page--;
  } else {
    page = maxPage;
  } 
  fetchData();
   })

function updatePaginationDisplay() {
  pagination.textContent = `${page}/${maxPage}`;
}

searchBar.addEventListener('submit', (event) => {
  event.preventDefault();
  page = 1;
 
  searchQuery = event.target.elements.query.value;
  fetchData();
})




