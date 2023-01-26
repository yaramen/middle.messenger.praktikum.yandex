import {html} from "../../modules/html";
import {Sidebar} from "../../components/Sidebar";
import {Chat} from "../../components/Chat";
import {event, getActiveRoute} from "../../router";
import styles from "./Messenger.css";

const contactList = [{
    id: 1,
    name: 'Андрей',
    lastMessage: 'Изображение',
    time: "10:20",
    unread: 2,
    avatar: 'http://dummyimage.com/46',
    messages: {
        "25:01.2023": [{
            actor: 'contact',
            time: "25:01.2023 11:50",
            messageType: 'html',
            content: `
                <p>Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.</p>
                <p>Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.</p>
            `,
        }, {
            actor: 'contact',
            time: "25:01.2023 11:52",
            messageType: 'image',
            content: `http://dummyimage.com/300x200`,
        }, {
            actor: 'my',
            time: "25:01.2023 12:00",
            messageType: 'html',
            status: 'send',
            content: `<p>Круто!</p>`,
        }, {
            actor: 'contact',
            time: "25:01.2023 11:52",
            messageType: 'image',
            content: `http://dummyimage.com/300x200`,
        }, {
            actor: 'my',
            time: "25:01.2023 12:00",
            messageType: 'html',
            status: 'sending',
            content: `
                <p>Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.</p>
                <p>Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.</p>
            `,
        }],
    },
}, {
    id: 2,
    name: 'Киноклуб',
    lastMessage: '<strong>Вы:</strong> стикер',
    time: "10:20",
    unread: 0,
    avatar: 'http://dummyimage.com/46',
    messages: {},
}, {
    id: 3,
    name: 'Илья',
    lastMessage: 'Друзья, у меня для вас особ... ',
    time: "10:20",
    unread: 2,
    avatar: 'http://dummyimage.com/46',
    messages: {},
}, {
    id: 4,
    name: 'Андрей',
    lastMessage: 'Изображение',
    time: "10:20",
    unread: 0,
    avatar: 'http://dummyimage.com/46',
    messages: {},
}, {
    id: 5,
    name: 'Киноклуб',
    lastMessage: '<strong>Вы:</strong> стикер',
    time: "10:20",
    unread: 0,
    avatar: 'http://dummyimage.com/46',
    messages: {},
}, {
    id: 6,
    name: 'Илья',
    lastMessage: 'Друзья, у меня для вас особ... ',
    time: "10:20",
    unread: 0,
    avatar: 'http://dummyimage.com/46',
    messages: {},
}]

function Messenger() {
    let activeChat = contactList.find(item => +getActiveRoute().id === item.id)

    event.addEventListener('idChange', () => {
        activeChat = contactList.find(item => +getActiveRoute().id === item.id)
        const chatDom = document.querySelector('[data-ref="chat"]')
        chatDom.innerHTML = html(Chat, activeChat)
    })

    return html`
<div class="${styles.container}">
    <div class="${styles.sidebar}">
        ${html(Sidebar, contactList)}
    </div>
    <div class="${styles.content}" data-ref="chat">
        ${html(Chat, activeChat)}
    </div>
</div>
`
}

export {
    Messenger,
}