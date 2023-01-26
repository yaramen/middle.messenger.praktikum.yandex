import {html} from "../../modules/html";
import styles from "./Pages.css";
import {getActiveRoute, pages} from "../../router";

function renderPage(page) {
    return html(page)
}

function Pages() {
    const activePage = getActiveRoute().page
    const page = renderPage(pages[activePage])

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