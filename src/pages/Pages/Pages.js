import {html} from "../../modules/html";
import styles from "./Pages.css";
import {Auth} from "../Auth";
import {CheckIn} from "../CheckIn";
import {ErrorLayout} from "../../layout/ErrorLayout";

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
};

function renderPage(page) {
    return html(page)
}

function Pages() {
    const activePage = "error404"
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