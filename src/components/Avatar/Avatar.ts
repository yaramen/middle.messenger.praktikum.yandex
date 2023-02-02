import { html } from '../../modules/html';
import styles from './Avatar.css';

function Avatar(image, name) {
    return html`
<div class="${styles.avatar}">
    <img src="${image}" alt="${name}" class="${styles.image}"/>
</div>
`;
}

export {
    Avatar,
};
