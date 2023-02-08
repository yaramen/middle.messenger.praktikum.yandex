import { FormField } from '../../types/form';
import { Profile } from '../../types/model';

function createProfileFormData(profile: Profile): FormField[] {
    return [{
        name: 'avatar',
        value: profile.avatar,
        label: profile.nickName,
        type: 'image',
    }, {
        name: 'email',
        value: profile.email,
        label: 'Email',
        type: 'text',
    }, {
        name: 'login',
        value: profile.login,
        label: 'Логин',
        type: 'text',
    }, {
        name: 'first_name',
        value: profile.firstName,
        label: 'Имя',
        type: 'text',
    }, {
        name: 'second_name',
        value: profile.fastName,
        label: 'Фамилия',
        type: 'text',
    }, {
        name: 'display_name',
        value: profile.nickName,
        label: 'Имя в чате',
        type: 'text',
    }, {
        name: 'phone',
        value: profile.phone,
        label: 'Телефон',
        type: 'text',
    }];
}

export {
    createProfileFormData,
};
