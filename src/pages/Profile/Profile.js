import {html} from "../../modules/html";
import {ProfileForm} from "../../components/ProfileForm";
import {ProfileLayout} from "../../layout/ProfileLayout/ProfileLayout";

const profile = {
    email: 'pochta@yandex.ru',
    login: 'ivanivanov',
    firstName: 'Иван',
    fastName: 'Иванов',
    nickName: 'Иван',
    phone: '+7 (909) 967 30 30',
    password: 'password',
    avatar: 'http://dummyimage.com/148',
}

const profileForm = [{
    name: 'avatar',
    value: profile.avatar,
    label: profile.nickName,
    type: 'image',
},{
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
}]

function Profile(isEdit = false) {
    return html(ProfileLayout, html(ProfileForm, profileForm, isEdit));
}

export {
    Profile
}