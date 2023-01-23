import {html} from "../../modules/html";
import styles from "./Pages.css";
import {Auth} from "../Auth";
import {CheckIn} from "../CheckIn";
import {ErrorLayout} from "../../layout/ErrorLayout";
import {Messenger} from "../Messenger";

const pages = {
    auth: Auth,
    checkIn: CheckIn,
    error404: html(ErrorLayout, {
        title: 'Страница не найдена',
        code: 404,
    }),
    error500: html(ErrorLayout, {
        title: 'Ошибка сервера',
        code: 500,
    }),
    messenger: Messenger,
};

function renderPage(page) {
    return html(page)
}

function Pages() {
    const urlParams  = new URLSearchParams(window.location.search)
    const activePage = urlParams.get('page')
    const page = renderPage(pages[activePage])

    return html`
<div class="${styles.page}">
    ${page}
</div>
`
}

export {
    Pages,
}