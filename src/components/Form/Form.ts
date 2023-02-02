import { html } from '../../modules/html';
import { TextField } from '../TextField';
import { Button } from '../Button';
import styles from './Form.css';

function Form({
    title,
    formData,
    submit,
}) {
    const formState = formData.fields.reduce((acc, curr) => {
        acc[curr.name] = '';
        return acc;
    }, {});

    function updateFormState(value) {
        // @ts-ignore
        // eslint-disable-next-line no-restricted-globals
        formState[event.target.name] = value;
    }

    return html`
<form class="${styles.form}">
    <h1 class="${styles.title}">${title}</h1>
    ${formData.fields.map((field) => html`
        <div class="${styles.item}">
            ${html(TextField, {
                ...field,
                onChange: updateFormState,
            })}
        </div>
    `)}
    ${formData.buttons.map((button) => html`
        <div class="${styles.item}" onclick="${submit.bind(this, this, button, formState)}">
            ${html(Button, button)}
        </div>
    `)}
</form>
`;
}

export {
    Form,
};
