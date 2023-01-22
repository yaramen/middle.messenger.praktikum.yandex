import {html} from "../../modules/html";
import styles from "./Popup.css";

function Popup(title) {
    return html`
<div class="${styles.popup}">
    <h2>${title}</h2>
    <div class="${styles.content}"></div>
</div>
`
}

export {
    Popup,
}