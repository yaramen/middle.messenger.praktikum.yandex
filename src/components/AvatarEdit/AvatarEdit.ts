import { usePopup } from '../../modules/popup';
import { Popup } from '../Popup';
import { UploadAvatarPopup } from '../UploadAvatarPopup';
import styles from './AvatarEdit.css';
import { FormField } from '../../types/form';
import { createComponent, createElement, createText } from '../../modules/vdom/createElement';
import avatarIcon from '../../icons/avatar.svg';
import { resourceUrl } from '../../api/baseUrl';

function AvatarEdit({ value: user }: { value: FormField }) {
    const popupUpload = usePopup(createComponent(Popup, {
        key: 'popup',
        title: 'Загрузите файл',
        content: createComponent(UploadAvatarPopup, {
            key: 'avatar',
            closePopup: () => popupUpload.close(),
        }),
        close: () => popupUpload.close(),
    }));

    return createElement(
        'div',
        {
            className: styles.avatar,
            onclick: () => popupUpload.show(),
        },
        createElement(
            'div',
            {
                className: styles.image,
            },
            createElement(
                'img',
                {
                    key: user.value,
                    className: styles.image,
                    src: user.value ? resourceUrl + user.value : avatarIcon,
                    alt: user.label,
                },
            ),
            createElement(
                'div',
                {
                    className: styles.overlay,
                },
                createText('Поменять аватар'),
            ),
        ),
        createElement(
            'div',
            {
                className: styles.name,
            },
            createText(user.label || ''),
        ),
    );
}

export {
    AvatarEdit,
};
