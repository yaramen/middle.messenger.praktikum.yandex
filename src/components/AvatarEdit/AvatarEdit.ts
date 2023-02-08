import { html } from '../../modules/html';
import { usePopup } from '../../modules/popup';
import { Popup } from '../Popup/Popup';
import { UploadAvatarPopup } from '../UploadAvatarPopup';
import styles from './AvatarEdit.css';
import { FormField } from '../../types/form';
import { createComponent, createElement, createText } from '../../modules/vdom/createElement';

function _AvatarEdit(image, name) {
    return html`
<div class="${styles.avatar}" onclick="${() => popupUpload.show()}">
    <div class="${styles.image}">
        <img src="${image}" alt="${name}" />
        <div class="${styles.overlay}">Поменять аватар</div>
    </div>
    <h1 class="${styles.name}">${name}</h1>
</div>
`;
}

function AvatarEdit({ value }: { value: FormField }) {
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
                    src: value.value,
                    alt: value.label,
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
            createText(value.label),
        ),
    );
}

export {
    AvatarEdit,
};
