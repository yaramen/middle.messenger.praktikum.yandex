import {html} from "../../modules/html";
import styles from "./Pages.css";
import {getActiveRoute} from "../../modules/router";
import {Auth} from "../Auth";
import {CheckIn} from "../CheckIn";
import {Messenger} from "../Messenger";
import {Profile} from "../Profile";
import {PasswordEdit} from "../PasswordEdit";
import {ErrorLayout} from "../../layout/ErrorLayout";

const pages = {
    auth: Auth,
    checkIn: CheckIn,
    messenger: Messenger,
    profile: Profile,
    profileEdit: html(Profile, true),
    passwordEdit: html(PasswordEdit),
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