import { className, html } from '../../modules/html';
import styles from './TextField.css';

function TextField({
    type = 'text',
    name,
    placeholder,
    icon,
    value,
    readonly = false,
    onChange = () => {},
}) {
    const classes = className({
        [styles['text-field']]: true,
        [styles['text-field-icon']]: !!icon,
    });

    function onInput(element) {
        onChange(element.value);
    }

    return html`
<div class="${classes}">
    ${icon && html`
        <img class="${styles.icon}" src="${icon}" alt="${placeholder}">
    `}
    <input 
        type="${type}"
        class="${styles.input}"
        value="${value}"
        type="text"
        name="${name}"
        placeholder="${placeholder}"
        oninput="${onInput}"
        ${readonly ? 'readonly' : ''}
    />
</div>
`;
}

export {
    TextField,
};
