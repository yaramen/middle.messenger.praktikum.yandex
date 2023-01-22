import {html} from "../../modules/html";
import styles from "./Pages.css";
import {Auth} from "../Auth";
import {CheckIn} from "../CheckIn";

const pages = {
    auth: Auth,
    checkIn: CheckIn,
};

function renderPage(page) {
    return html(page)
}

function Pages() {
    const activePage = "auth"
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