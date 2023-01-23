import {html} from "../../modules/html";
import {TextField} from "../TextField";
import {Button} from "../Button";
import styles from "./Sidebar.css";
import hamburgerIcon from "../../icons/hamburger.svg"
import searchIcon from "../../icons/search.svg"
import {ChatList} from "../ChatList";

const list = [{
    name: 'Андрей',
    lastMessage: 'Изображение',
    time: "10:20",
    unread: 2,
    avatar: 'http://dummyimage.com/46'
}, {
    name: 'Киноклуб',
    lastMessage: '<strong>Вы:</strong> стикер',
    time: "10:20",
    unread: 0,
    avatar: 'http://dummyimage.com/46'
}, {
    name: 'Илья',
    lastMessage: 'Друзья, у меня для вас особ... ',
    time: "10:20",
    unread: 2,
    avatar: 'http://dummyimage.com/46'
}, {
    name: 'Андрей',
    lastMessage: 'Изображение',
    time: "10:20",
    unread: 0,
    avatar: 'http://dummyimage.com/46'
},{
    name: 'Киноклуб',
    lastMessage: '<strong>Вы:</strong> стикер',
    time: "10:20",
    unread: 0,
    avatar: 'http://dummyimage.com/46'
}, {
    name: 'Илья',
    lastMessage: 'Друзья, у меня для вас особ... ',
    time: "10:20",
    unread: 0,
    avatar: 'http://dummyimage.com/46'
},]


function Sidebar() {
    return html`
<div class="${styles.sidebar}">
    <div class="${styles.header}">
        <div class="${styles.hamburger}">
            ${html(Button, {
                type: 'icon',
                icon: hamburgerIcon
            })}
        </div>
        ${html(TextField, {
            placeholder: 'Поиск',
            icon: searchIcon
        })}
    </div>
    <div class="${styles.chatList}">
        ${html(ChatList, list)}
    </div>
</div>
`
}

export {
    Sidebar
}