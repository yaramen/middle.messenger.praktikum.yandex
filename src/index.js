import {App} from "./App";
import "./index.css"
import {store} from "./modules/store";

const root = document.querySelector('#root');
const render = () => {
    root.innerHTML = App()
}

store.subscribe((oldState, newState) => {
    if (oldState.page !== newState.page) {
        render()
    }
})
render()
