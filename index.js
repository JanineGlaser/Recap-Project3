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
const maxPage = 42;
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
  console.log(data.results);
  data.results.forEach((result) => {
  CharacterCard(result);
  });
  return data;
}

fetchData();

nextButton.addEventListener('click', () => {
    if (page < maxPage) {
    page++;
    updatePaginationDisplay();

    fetchData();
  } 
})
prevButton.addEventListener('click', () => {
  if (page > minPage) {
     page--;
     fetchData();
     updatePaginationDisplay();
   } 
   } )

function updatePaginationDisplay() {
  pagination.textContent = `${page}/${maxPage}`;
}

searchBar.addEventListener('submit', (event) => {
  event.preventDefault();
 
  searchQuery = event.target.elements.query.value;
  fetchData();
})




