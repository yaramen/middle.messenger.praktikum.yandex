import {html} from "../../modules/html";
import styles from "./MessengerLayout.css";

function MessengerLayout({
    sidebar,
    content
}) {
    return html`
<div class="${styles.container}">
    <div class="${styles.sidebar}">
        ${sidebar}
    </div>
    <div class="${styles.content}">
        ${content}
    </div>
</div>
`
}

export {
    MessengerLayout
}