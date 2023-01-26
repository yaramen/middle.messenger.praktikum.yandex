import {App} from "./App";
import "./index.css"
import {event} from "./router";

const root = document.querySelector('#root');
root.innerHTML = App()

event.addEventListener('pageChange', () => {
    root.innerHTML = App()
})
