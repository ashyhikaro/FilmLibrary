import { renderCard } from "./renderResult.js";

export const renderFavorite = (id, wraper) => {
    wraper.innerHTML = '';

    id.forEach(item => {
        let requestUrl = `https://api.tvmaze.com/lookup/shows?thetvdb=${item}`;
        fetch(requestUrl).then(response => response.ok ? response.json() : console.error('Some error')).then(data => renderCard(data));
    });
}