import {html} from "../../modules/html";
import styles from "./Pages.css";
import {getActiveRoute, pages} from "../../router";

function renderPage(page) {
    return html(page)
}

function Pages() {
    const activePage = getActiveRoute().page ? getActiveRoute().page : 'auth'
    const componentPage = pages[activePage] ?? pages['error404']
    const page = renderPage(componentPage);

    return html`
<div class="${styles.page}">
    ${page}
    <div class="${styles.overlay}" data-ref="overlay"></div>
</div>
`
}

export {
    Pages,
}