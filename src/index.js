import {sum} from './modules/sum';
import styles from './index.css'

const root = document.querySelector('#root');
root.textContent = sum(1, -1).toString();
root.classList.add(styles.app)