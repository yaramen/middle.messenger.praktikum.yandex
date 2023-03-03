import { ProfileForm } from '../../components/ProfileForm';
import { ProfileLayout } from '../../layout/ProfileLayout';
import { createComponent } from '../../modules/vdom/createElement';
import { store } from '../../modules/store';
import { createProfileFormData } from './data';
import { actions } from '../../modules/actions';
import { Loading } from '../../components/Loading';

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

    if (!user()) {
        return createComponent(Loading, { key: 'load' });
    }

    return createComponent(
        ProfileLayout,
        {
            key: 'ProfileLayout' + user().avatar,
            content: createComponent(
                ProfileForm,
                {
                    key: 'ProfileForm' + user().avatar,
                    fields: createProfileFormData(user(), isEdit),
                    profile: user(),
                    isEdit,
                },
            ),
        },
    );
}

export {
    Profile,
};
