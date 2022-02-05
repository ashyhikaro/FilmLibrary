import { getStorage, setStorage, toggleStorage } from "./serviceStorage.js";

export const wraper = document.querySelector('.content');

export const renderCard = (obj) => {
    let arr = getStorage('favorite');
    wraper.innerHTML += `
        <div class="item" data-id="${obj.externals.thetvdb}">
            <div class="item_content">
                <div class="item_img_container" >
                    <img src="${obj.image ? obj.image.medium : ''}" alt="image" class="item_img" width="210" height="295">
                </div>
                <div class="item_data" >
                    <p class="item_name item_m"><b>Name:</b> ${obj.name}</p>
                    <p class="item_name item_m"><b>Premiered:</b> ${obj.premiered ? obj.premiered : 'unknown'}</p>
                    <p class="item_rating item_m"><b>Rating:</b> ${obj.rating.average ? obj.rating.average : 'unknown'}</p>
                    <p class="item_genres item_m"><b>Genres:</b> ${obj.genres.length ? obj.genres.reduce((acc, item) => acc + ', ' + item) : 'unknown'}</p>
                    <p class="item_rating item_m"><b>Language:</b> ${obj.language ? obj.language : 'unknown'}</p>
                    ${arr.includes(JSON.stringify(obj.externals.thetvdb)) ? '<button class="dislike item_btn item_m">Dislike</button>' : '<button class="like item_btn item_m">Like</button>'}
                    ${obj.summary ? obj.summary : '<p class="item_discription item_m">Discription: unknown</p>'}
                </div>
            </div>
        </div>
    `;

    let like = document.querySelectorAll('.like');
    let dislike = document.querySelectorAll('.dislike');
    
    like.forEach(element => { 
        element.addEventListener('click', e => {
            toggleStorage('favorite', e.target.closest('.item').dataset.id);
            element.classList.toggle('toggleActive');
            if (element.textContent == 'Dislike') element.textContent = 'Like';
            else element.textContent = 'Dislike';
        });
    });
    
    dislike.forEach(element => {
        element.addEventListener('click', e => {
            toggleStorage('favorite', e.target.closest('.item').dataset.id);
            element.classList.toggle('toggleDisActive');
            if (element.textContent == 'Like') element.textContent = 'Dislike';
            else element.textContent = 'Like';
        });
    });
};