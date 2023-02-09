import { Popover } from '../Popover';
import { Button } from '../Button';
import { ActionList } from '../ActionList';
import { TextField } from '../TextField';
import attachIcon from '../../icons/attach.svg';
import photoIcon from '../../icons/photo.svg';
import fileIcon from '../../icons/file.svg';
import locationIcon from '../../icons/location.svg';
import sendIcon from '../../icons/send.svg';
import styles from './NewMessage.css';
import { createComponent, createElement } from '../../modules/vdom/createElement';
import { store } from '../../modules/store';
import { actions } from '../../modules/actions';

const AttachPopover = createComponent(
    Popover,
    {
        key: 'popover',
        target: createComponent(
            Button,
            {
                key: 'button',
                style: 'action',
                icon: attachIcon,
            },
        ),
        content: createComponent(
            ActionList,
            {
                key: 'action-list',
                actions: [{
                    key: 'photoIcon',
                    icon: photoIcon,
                    label: 'Фото или Видео',
                    click: () => {},
                }, {
                    key: 'fileIcon',
                    icon: fileIcon,
                    label: 'Файл',
                    click: () => {},
                }, {
                    key: 'locationIcon',
                    icon: locationIcon,
                    label: 'Локация',
                    click: () => {},
                }],
            },
        ),
        type: 'top',
    },
);

function Message() {
    const [message, setMessage] = this.useState('');

    function changeMessage(e: InputEvent) {
        const { value } = e.target as HTMLInputElement;
        setMessage(value);
    }

    return createElement(
        'div',
        {
            key: 'field',
            className: styles.field,
        },
        createElement(
            'div',
            {
                key: 'wrap',
                className: styles.wrap,
            },
            createComponent(
                TextField,
                {
                    key: 'message-field',
                    name: 'message',
                    placeholder: 'Сообщение',
                    onChange: changeMessage,
                },
            ),
        ),
        createElement(
            'div',
            {
                key: 'send',
                className: styles.send,
            },
            createComponent(
                Button,
                {
                    key: 'button',
                    icon: sendIcon,
                    click: () => message && store.dispatch(actions.newMessage(message)),
                },
            ),
        ),
    );
}

function NewMessage() {
    return createElement(
        'div',
        {
            key: 'block',
            className: styles.form,
        },
        createElement(
            'div',
            {
                key: 'attach',
                className: styles.attach,
            },
            AttachPopover,
        ),

        createComponent(
            Message,
            {
                key: 'message',
            },
        ),
    );
}

export {
    NewMessage,
};
