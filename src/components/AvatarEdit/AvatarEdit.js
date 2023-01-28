import {html} from '../../modules/html';
import {usePopup} from '../../modules/popup';
import {Popup} from '../Popup/Popup';
import {UploadAvatarPopup} from '../UploadAvatarPopup';
import styles from './AvatarEdit.css'

function AvatarEdit(image, name) {
    const popupUpload = usePopup(html(Popup, {
        title: 'Загрузите файл',
        content: html(UploadAvatarPopup, {
            closePopup:() => popupUpload.close()
        }),
        close: () => popupUpload.close()
    }))


    return html`
<div class="${styles.avatar}" onclick="${() => popupUpload.show()}">
    <div class="${styles.image}">
        <img src="${image}" alt="${name}" />
        <div class="${styles.overlay}">Поменять аватар</div>
    </div>
    <h1 class="${styles.name}">${name}</h1>
</div>
`
}

export {
    AvatarEdit,
}