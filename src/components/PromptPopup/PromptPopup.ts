import { TextField } from '../TextField';
import { Button } from '../Button';
import styles from './PromptPopup.css';
import { createComponent, createElement } from '../../modules/vdom/createElement';

function PromptPopup({
    closePopup,
    send,
}: { closePopup: () => void, send: (text: string) => void }) {
    const [text, setText] = this.useState('');

    return createElement(
        'div',
        {
            key: 'add-user-popup',
        },
        createElement(
            'div',
            {
                key: 'textField',
                className: styles.field,
            },
            createComponent(
                TextField,
                {
                    key: 'field',
                    name: 'name',
                    placeholder: '',
                    onChange: (e: InputEvent) => {
                        setText((e.target as HTMLInputElement).value);
                    },
                },
            ),
        ),
        createComponent(
            Button,
            {
                key: 'button',
                label: 'Добавить',
                click: () => {
                    send(text);
                    closePopup();
                },
            },
        ),
    );
}

export {
    PromptPopup,
};
