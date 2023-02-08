import { ProfileForm } from '../../components/ProfileForm';
import { ProfileLayout } from '../../layout/ProfileLayout';
import { createComponent, createElement, createText } from '../../modules/vdom/createElement';
import { store } from '../../modules/store';
import { createProfileFormData } from './data';

function Load() {
    return createElement(
        'div',
        {},
        createText('loading'),
    );
}

function Profile({ isEdit }: { isEdit: boolean }) {
    const { user } = store.getState();

    if (!user) {
        return createComponent(Load, { key: 'load' });
    }

    return createComponent(
        ProfileLayout,
        {
            key: 'ProfileLayout',
            content: createComponent(
                ProfileForm,
                {
                    key: 'ProfileForm',
                    fields: createProfileFormData(user),
                    isEdit,
                },
            ),
        },
    );
}

export {
    Profile,
};
