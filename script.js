import { renderCard, wraper } from "./renderResult.js";
import { getStorage } from "./serviceStorage.js";
import { renderFavorite } from "./renderFavorite.js";

const form = document.querySelector('form');
const input = document.querySelector('input');
const controlPanel = document.querySelector('.control');
const searchPanel = document.querySelector('.searcher');

const addEvent = () => {
    document.querySelector('.fav').addEventListener('click', () => {
        if(getStorage('favorite').length) {
            renderFavorite(getStorage('favorite'), wraper);
            if (!document.querySelector('.clearFavoriteBtn')) clearFavorite();

            searchPanel.style.width = "25%";
            controlPanel.style.gap = "5px";
        }
    }); 
    
    document.querySelector('.clear').addEventListener('click', () => {
        if (!document.querySelector('.clearFavoriteBtn')) {
            document.querySelector('.clearFavoriteBtn').remove();
            wraper.innerHTML = '';
        };
    });
};

const clearFavorite = () => {
    controlPanel.innerHTML += '<button class="clearFavoriteBtn btn">Clear Favorite</button>'
    const clearFavoriteBtn = document.querySelector('.clearFavoriteBtn');
    clearFavoriteBtn.addEventListener('click', () => {
        wraper.innerHTML = '';
        localStorage.clear();
        clearFavoriteBtn.remove();

        searchPanel.style.width = "15%";
    });

    addEvent();
};

addEvent();

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(document.querySelector('.clearFavoriteBtn')) document.querySelector('.clearFavoriteBtn').remove();

    let requestUrl = `https://api.tvmaze.com/search/shows?q=${input.value}`;

    input.value = '';
    wraper.innerHTML = '';

    fetch(requestUrl).then(response => response.ok ? response.json() : console.error('Some error')).then(data => {
        data.forEach(element => {
            renderCard(element.show);
        });
    });

    // let xhr = new XMLHttpRequest();

    // xhr.open('GET', requestUrl);

    // xhr.responseType = 'json';

    // xhr.send();

    // xhr.onload = function() {
    //     if (xhr.status >= 400) {
    //       alert(`Помилка ${xhr.status}: ${xhr.statusText}`);
    //     } else {
    //       xhr.response.forEach(data => {
    //         renderCard(data.show);
    //       });
    //     }
    // };
});