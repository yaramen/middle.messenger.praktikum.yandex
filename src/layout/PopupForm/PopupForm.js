import {html} from "../../modules/html";
import styles from "./PopupForm.css";

function PopupForm({children}) {
    return html`
<div class="${styles.container}">
    ${children}
</div>
`
}

export {
    PopupForm,
}