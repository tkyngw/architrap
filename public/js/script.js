document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("architrap JS imported successfully!");
  },
  false
);
/*
const axios = require('axios').default;


const input = document.querySelector('#company-search');
const suggestions = document.querySelector('.suggestions ul');

// const fruit = [ 'Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

let company = ['Staab', 'Ironhack', 'Stuub Architekten GmbH'];
// get all the offices from the database
axios.get()


function search(str) {
  let results = [];
  const val = str.toLowerCase();

  for (i = 0; i < company.length; i++) {
    if (company[i].toLowerCase().indexOf(val) > -1) {
      results.push(company[i]);
    }
  }

  return results;
}

function searchHandler(e) {
  const inputVal = e.currentTarget.value;
  let results = [];
  if (inputVal.length > 0) {
    results = search(inputVal);
  }
  showSuggestions(results, inputVal);
}

function showSuggestions(results, inputVal) {
    
    suggestions.innerHTML = '';

  if (results.length > 0) {
    for (i = 0; i < results.length; i++) {
      let item = results[i];
      // Highlights only the first match
      // TODO: highlight all matches
      const match = item.match(new RegExp(inputVal, 'i'));
      item = item.replace(match[0], `<strong>${match[0]}</strong>`);
      suggestions.innerHTML += `<li>${item}</li>`;
    }
    suggestions.classList.add('has-suggestions');
  } else {
    results = [];
    suggestions.innerHTML = '';
    suggestions.classList.remove('has-suggestions');
  }
}

function useSuggestion(e) {
  input.value = e.target.innerText;
  input.focus();
  suggestions.innerHTML = '';
  suggestions.classList.remove('has-suggestions');
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);

*/