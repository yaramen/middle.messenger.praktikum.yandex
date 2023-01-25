import {html} from "../../modules/html";
import {MessengerLayout} from "../../layout/MessengerLayout";
import {Sidebar} from "../../components/Sidebar";
import {Chat} from "../../components/Chat";

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
    avatar: 'http://dummyimage.com/46'
}, {
    id: 3,
    name: 'Илья',
    lastMessage: 'Друзья, у меня для вас особ... ',
    time: "10:20",
    unread: 2,
    avatar: 'http://dummyimage.com/46'
}, {
    id: 4,
    name: 'Андрей',
    lastMessage: 'Изображение',
    time: "10:20",
    unread: 0,
    avatar: 'http://dummyimage.com/46'
}, {
    id: 5,
    name: 'Киноклуб',
    lastMessage: '<strong>Вы:</strong> стикер',
    time: "10:20",
    unread: 0,
    avatar: 'http://dummyimage.com/46'
}, {
    id: 6,
    name: 'Илья',
    lastMessage: 'Друзья, у меня для вас особ... ',
    time: "10:20",
    unread: 0,
    avatar: 'http://dummyimage.com/46'
}]

function Messenger() {
    const urlParams = new URLSearchParams(window.location.search)
    const activeChatId = +urlParams.get('chat')
    const activeChat = contactList.find(item => activeChatId === item.id)

    return html(MessengerLayout, {
        sidebar: html(Sidebar, contactList),
        content: html(Chat, activeChat)
    })
}

export {
    Messenger,
}