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
        'div',
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
                    store.dispatch(actions.avatarUpdate(1));
                    closePopup();
                },
            },
        ),
    );
}

export {
    UploadAvatarPopup,
};
