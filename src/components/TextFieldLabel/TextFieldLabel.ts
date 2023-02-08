import { TextField, TextFieldProps } from '../TextField';
import styles from './TextFieldLabel.css';
import { createComponent, createElement, createText } from '../../modules/vdom/createElement';

function TextFieldLabel({
    label,
    ...props
}: TextFieldProps & { label?: string }) {
    return createElement(
        'div',
        { className: styles.row },
        createElement(
            'div',
            { className: styles.label },
            createText(label || ''),
        ),
        createElement(
            'div',
            { className: styles.label },
            createComponent(
                TextField,
                { ...props, key: 'field' },
            ),
        ),
    );
}

export {
    TextFieldLabel,
};
