import {html} from "../../modules/html";
import {MessengerLayout} from "../../layout/MessengerLayout";
import {Sidebar} from "../../components/Sidebar";

function Messenger() {
    return html(MessengerLayout, {
        sidebar: html(Sidebar),
        content: html`<div>content</div>`
    })
}

export {
    Messenger,
}