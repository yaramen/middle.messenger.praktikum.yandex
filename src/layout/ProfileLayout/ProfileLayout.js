import {html} from '../../modules/html';
import styles from './ProfileLayout.css';
import {Button} from '../../components/Button';
import backIcon from '../../icons/back.svg';
import {getLinkPage, goTo} from '../../modules/router';

function ProfileLayout(children) {
    return html`
<div class="${styles.container}">
    <div class="${styles.panel}">
        ${html(Button, {
        icon: backIcon,
        type: 'secondary',
        click: () => goTo(getLinkPage('messenger')),
    })}
    </div>
    <div class="${styles.content}">
        <div class="${styles.wrapper}">
            ${children} 
        </div>
    </div>
</div>
`
}

export {
    ProfileLayout,
}