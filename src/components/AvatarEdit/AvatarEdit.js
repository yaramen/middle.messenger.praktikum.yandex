import {html} from "../../modules/html";
import styles from './AvatarEdit.css'

function AvatarEdit(image, name) {
    return html`
<div class="${styles.avatar}">
    <img src="${image}" alt="${name}" class="${styles.image}"/>
    <h1 class="${styles.name}">${name}</h1>
</div>
`
}

export {
    AvatarEdit,
}