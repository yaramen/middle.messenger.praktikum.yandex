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

function NewMessage() {
    const actionPopover = createComponent(
        Popover,
        {
            key: 'popover',
            target: createComponent(
                Button,
                {
                    key: 'button',
                    type: 'action',
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

    return createElement(
        'div',
        { className: styles.form },
        createElement(
            'div',
            { className: styles.attach },
            actionPopover,
        ),
        createElement(
            'div',
            { className: styles.field },
            createComponent(
                TextField,
                {
                    key: 'text-field',
                    name: 'message',
                    placeholder: 'Сообщение',
                },
            ),
        ),
        createElement(
            'div',
            { className: styles.send },
            createComponent(
                Button,
                {
                    key: 'button',
                    icon: sendIcon,
                },
            ),
        ),

    );
}

export {
    NewMessage,
};
