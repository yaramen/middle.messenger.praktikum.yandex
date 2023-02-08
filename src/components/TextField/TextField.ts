import { className } from '../../modules/html';
import styles from './TextField.css';
import { createElement, createText } from '../../modules/vdom/createElement';

interface TextFieldProps {
    type?: string
    name: string
    placeholder?: string
    icon?: string
    value?: string
    readonly?: boolean
    onChange?: (e: InputEvent) => void
    onFocus?: (e: InputEvent) => void
    onBlur?: (e: InputEvent) => void
    errors?: string
}

function TextField({
    type = 'text',
    name,
    placeholder = '',
    icon,
    readonly = false,
    onChange = () => {},
    onFocus = () => {},
    onBlur = () => {},
    value = '',
    errors = '',
}: TextFieldProps) {
    const classes = className({
        [styles['text-field']]: true,
        [styles['text-field-icon']]: !!icon,
    });

    return createElement(
        'div',
        {
            key: name,
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
                onfocus: onFocus,
                onblur: onBlur,
                value,
            },
        ),
        createElement(
            'div',
            {
                className: styles.error,
                title: errors,
            },
            createText(errors),
        ),
    );
}

export {
    TextField,
    TextFieldProps,
};
