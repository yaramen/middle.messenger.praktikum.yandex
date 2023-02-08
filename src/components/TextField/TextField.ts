import { className } from '../../modules/html';
import styles from './TextField.css';
import { createElement } from '../../modules/vdom/createElement';

interface TextFieldProps {
    type?: string
    name: string
    placeholder?: string
    icon?: string
    value?: string
    readonly?: boolean
    onChange?: (e: InputEvent) => void
}

function TextField({
    type = 'text',
    name,
    placeholder = '',
    icon,
    readonly = false,
    onChange = () => {},
    value = '',
}: TextFieldProps) {
    const classes = className({
        [styles['text-field']]: true,
        [styles['text-field-icon']]: !!icon,
    });

    return createElement(
        'div',
        {
            className: classes,
        },
        !icon ? null : createElement(
            'img',
            {
                className: styles.icon,
                src: icon,
                alt: placeholder,
            },
        ),
        createElement(
            'input',
            {
                key: name,
                className: styles.input,
                name,
                type,
                placeholder,
                readOnly: readonly,
                oninput: onChange,
                value,
            },
        ),
    );
}

export {
    TextField,
    TextFieldProps,
};
