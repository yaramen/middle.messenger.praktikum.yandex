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
        { key: 'form' },
        createElement(
            'div',
            { key: 'file', className: styles.field },
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
                    const file = this.getElement().querySelector('[type="file"]') as HTMLInputElement;
                    // @ts-ignore
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
