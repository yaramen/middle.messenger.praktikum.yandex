import {html} from "../../modules/html";
import {TextField} from "../TextField";
import {Button} from "../Button";
import styles from "./Sidebar.css";
import hamburgerIcon from "../../icons/hamburger.svg"
import searchIcon from "../../icons/search.svg"
import {ChatList} from "../ChatList";

function Sidebar(contactList) {
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
        ${html(ChatList, contactList)}
    </div>
</div>
`
}

export {
    Sidebar
}