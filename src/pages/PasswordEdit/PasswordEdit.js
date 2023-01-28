import {html} from "../../modules/html";
import {ProfileForm} from "../../components/ProfileForm";
import {ProfileLayout} from "../../layout/ProfileLayout/ProfileLayout";
import {PasswordForm} from "../../components/PasswordForm";

const passwordEdit = {
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
    value: passwordEdit.avatar,
    label: passwordEdit.nickName,
    type: 'image',
},{
    name: 'email',
    value: passwordEdit.email,
    label: 'Email',
    type: 'text',
}, {
    name: 'login',
    value: passwordEdit.login,
    label: 'Логин',
    type: 'text',
}, {
    name: 'firstName',
    value: passwordEdit.firstName,
    label: 'Имя',
    type: 'text',
}, {
    name: 'fastName',
    value: passwordEdit.fastName,
    label: 'Фамилия',
    type: 'text',
}, {
    name: 'nickName',
    value: passwordEdit.nickName,
    label: 'Имя в чате',
    type: 'text',
}, {
    name: 'phone',
    value: passwordEdit.phone,
    label: 'Телефон',
    type: 'text',
}]

function PasswordEdit() {
    return html(ProfileLayout, html(PasswordForm));
}

export {
    PasswordEdit
}