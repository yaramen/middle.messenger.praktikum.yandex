import { TextField, TextFieldProps } from '../TextField';
import styles from './TextFieldLabel.css';
import { createComponent, createElement, createText } from '../../modules/vdom/createElement';

function TextFieldLabel({
    label,
    ...props
}: TextFieldProps & { label?: string }) {
    return createElement(
        'div',
        {
            key: props.name,
            className: styles.row,
        },
        createElement(
            'div',
            {
                key: `label-${props.name}`,
                className: styles.label,
            },
            createText(label || ''),
        ),
        createElement(
            'div',
            {
                className: styles.label,
                key: `field-${props.name}`,
            },
            createComponent(
                TextField,
                {
                    ...props,
                    key: props.name,
                },
            ),
        ),
    );
}

export {
    TextFieldLabel,
};
