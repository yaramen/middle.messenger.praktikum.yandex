import uploadIcon from '../../icons/upload.svg';
import styles from './File.css';
import { createElement } from '../../modules/vdom/createElement';

function File() {
    function fileChange() {
        const label = document.querySelector(`.${styles.container}`);
        const image = label.querySelector('img');
        const input = label.querySelector('input');
        const fileName = input.files[0].name;
        const fileElement = document.createElement('div');
        fileElement.innerText = fileName;
        label.appendChild(fileElement);
        image.style.display = 'none';
    }

    return createElement(
        'label',
        { className: styles.container },
        createElement(
            'img',
            {
                className: styles.image,
                src: uploadIcon,
                alt: 'file',
            },
        ),
        createElement(
            'input',
            {
                className: styles.file,
                type: 'file',
                onchange: fileChange,
            },
        ),
    );
}

export {
    File,
};
