import { renderCard, wraper } from "./renderResult.js";
import { getStorage } from "./serviceStorage.js";
import { renderFavorite } from "./renderFavorite.js";

const checkFavorite = () => {
    if (document.querySelector('.clearFavoriteBtn')) {
        const ids = getStorage('favorite');

        renderFavorite(ids, wraper);
        
        if (!ids.length) {
            document.querySelector('.clearFavoriteBtn').remove();
            document.querySelector('.searcher').style.width = "15%";
        }
    }
};

export default checkFavorite;