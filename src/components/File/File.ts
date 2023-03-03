import uploadIcon from '../../icons/upload.svg';
import styles from './File.css';
import { createElement, createText } from '../../modules/vdom/createElement';

function File() {
    const [file, setFile] = this.useState('');

    const fileChange = () => {
        const element = this.getElement();
        if (element) {
            const input = element.querySelector('input');
            input && setFile(input.files[0].name);
        }
    };

    return createElement(
        'label',
        {
            key: 'label',
            className: styles.container,
        },
        file()
            ? createElement(
                'div',
                { className: 'foo' },
                createText(file()),
            )
            : createElement(
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
                key: 'file',
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
