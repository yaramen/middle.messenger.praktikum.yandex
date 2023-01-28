import {html} from '../../modules/html';
import {Button} from '../../components/Button';
import {getLinkPage, goTo} from '../../modules/router';
import styles from './ErrorLayout.css';

function ErrorLayout({
    code,
    title,
}) {
    return html`
<div class="${styles.main}">
    <div class="${styles.container}">
        <h2>${code}</h2>
        <h1>${title}</h1>
        ${html(Button, {
            label: 'На главную',
            type: 'secondary',
            click: () => goTo(getLinkPage('auth'))
        })}
    </div>
</div>
`
}

export {
    ErrorLayout,
}