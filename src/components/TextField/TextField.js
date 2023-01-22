import {className, html} from "../../modules/html";
import styles from "./TextField.css";

function TextField({
    type = 'text',
    name,
    placeholder,
}) {
    const classes = className({
        [styles['text-field']]: true,
    })

    return html`
<input type="${type}" class="${classes}" type="text" name="${name}" placeholder="${placeholder}"/>
`
}

export {
    TextField
}