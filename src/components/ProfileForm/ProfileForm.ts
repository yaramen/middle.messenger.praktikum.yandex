import { TextFieldLabel } from '../TextFieldLabel';
import { createComponent, createElement } from '../../modules/vdom/createElement';
import { FormField } from '../../types/form';
import styles from './ProfileForm.css';
import { Button } from '../Button';
import { getLinkPage, goTo } from '../../modules/router';
import { AvatarEdit } from '../AvatarEdit';
import { formValidation, isValid } from '../../modules/validation';
import { store } from '../../modules/store';
import { actions } from '../../modules/actions';

function ProfileForm({ fields, isEdit }: { fields: FormField[], isEdit: boolean }) {
    const [formState, setFormState] = this.useState(fields.reduce((acc, curr) => ({
        ...acc,
        [curr.name]: curr.value,
    }), {}));

    const [errors, setErrors] = this.useState(fields.reduce((acc, curr) => ({
        ...acc,
        [curr.name]: '',
    }), {}));

    const updateFormState = (e: InputEvent) => {
        const target = e.target as HTMLInputElement;
        const value = {
            ...formState,
            [target.name]: target.value,
        };
        setFormState(value);
    };

    const validation = () => {
        const newErrors = formValidation(fields, formState);
        setErrors(newErrors);
        return newErrors;
    };

    return createElement(
        'form',
        {
            key: 'form',
        },
        ...fields.map((field) => (field.type === 'text'
            ? createElement(
                'div',
                { key: field.name },
                createComponent(
                    TextFieldLabel,
                    {
                        ...field,
                        readonly: !isEdit,
                        key: field.name,
                        value: formState[field.name],
                        errors: errors[field.name],
                        onChange: updateFormState,
                        onFocus: validation,
                        onBlur: validation,
                    },
                ),
            )
            : createComponent(AvatarEdit, { key: 'avatar', value: field })
        )),
        isEdit
            ? createElement(
                'div',
                {
                    key: 'pair',
                    className: styles.pair,
                },
                createComponent(
                    Button,
                    {
                        key: 'save',
                        label: 'Сохранить',
                        click: (e: Event) => {
                            console.log('click');
                            const newErrors = validation();
                            if (isValid(newErrors)) {
                                store.dispatch(actions.profileUpdate(formState));
                            } else {
                                e.preventDefault();
                            }
                        },
                    },
                ),
                createComponent(
                    Button,
                    {
                        key: 'cansel',
                        label: 'Отмена',
                        click: () => goTo(getLinkPage('profile')),
                    },
                ),
            )
            : createElement(
                'div',
                {
                    key: 'action-list',
                },
                createComponent(
                    Button,
                    {
                        key: 'data',
                        label: 'Изменить данные',
                        type: 'link',
                        click: () => goTo(getLinkPage('profileEdit')),
                    },
                ),
                createComponent(
                    Button,
                    {
                        key: 'password',
                        label: 'Изменить пароль',
                        type: 'link',
                        click: () => goTo(getLinkPage('passwordEdit')),
                    },
                ),
            ),
    );
}

export {
    ProfileForm,
};
