import { Button } from '../Button';
import { File } from '../File';
import { store } from '../../modules/store';
import { actions } from '../../modules/actions';
import styles from './UploadAvatarPopup.css';
import { createComponent, createElement } from '../../modules/vdom/createElement';

function UploadAvatarPopup({
    closePopup,
}: { closePopup: () => void }) {
    return createElement(
        'form',
        {},
        createElement(
            'div',
            { className: styles.field },
            createComponent(
                File,
                {
                    key: 'file',
                },
            ),
        ),
        createComponent(
            Button,
            {
                key: 'button',
                label: 'Поменять',
                click: () => {
                    const file = document.querySelector('[type="file"]') as HTMLInputElement;
                    store.dispatch(actions.avatarUpdate(file.files[0]));
                    closePopup();
                },
            },
        ),
    );
}

export {
    UploadAvatarPopup,
};
