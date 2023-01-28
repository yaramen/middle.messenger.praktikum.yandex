import {html} from '../../modules/html';
import {TextField} from '../TextField';
import styles from './TextFieldLabel.css';

function TextFieldLabel({
    label,
    ...props
}) {
    return html`
<label class="${styles.row}">
    <div class="${styles.label}">${label}</div>
    <div>
        ${html(TextField, props)}
    </div>
</label>
`
}

export {
    TextFieldLabel
}