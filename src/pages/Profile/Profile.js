import {html} from "../../modules/html";
import styles from './Profile.css';
import {Button} from "../../components/Button";
import backIcon from "../../icons/back.svg";
import {getLinkPage, goTo} from "../../modules/router";
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
    name: 'firstName',
    value: profile.firstName,
    label: 'Имя',
    type: 'text',
}, {
    name: 'fastName',
    value: profile.fastName,
    label: 'Фамилия',
    type: 'text',
}, {
    name: 'nickName',
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