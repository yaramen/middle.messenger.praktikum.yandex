import {html} from "../../modules/html";
import styles from "./Popup.css";

function Popup({
    title,
    content,
    close
}) {
    return html`
<div class="${styles.container}">
    <div class="${styles.overlay}" onclick="${close}"></div>
    <div class="${styles.popup}">
        <h2 class="${styles.title}">${title}</h2>
        <div class="${styles.content}">${content}</div>
    </div>
</div>
`
}

export {
    Popup,
}