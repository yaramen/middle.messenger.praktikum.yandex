import { ProfileForm } from '../../components/ProfileForm';
import { ProfileLayout } from '../../layout/ProfileLayout';
import { createComponent, createElement, createText } from '../../modules/vdom/createElement';
import { store } from '../../modules/store';
import { createProfileFormData } from './data';
import { actions } from '../../modules/actions';

function Load() {
    return createElement(
        'div',
        {},
        createText('loading'),
    );
}

function Profile({ isEdit }: { isEdit: boolean }) {
    const [user, setUser] = this.useState(null);

    this.useEffectOnce(() => {
        store.dispatch(actions.initAction({}));
        const unsubscribe = store.subscribe((oldState, newState) => {
            if (oldState.user !== newState.user) {
                setUser(newState.user);
            }
        });
        return unsubscribe;
    });

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
                    fields: createProfileFormData(user, isEdit),
                    profile: user,
                    isEdit,
                },
            ),
        },
    );
}

export {
    Profile,
};
