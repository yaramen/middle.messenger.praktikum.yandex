import {html} from "./modules/html";
import {Button} from "./components/Button/Button";

function App() {
    return html`
<div>
    ${html(Button, {
        label: 'Авторизоваться',
    })}
    ${html(Button, {
        label: 'Авторизоваться',
        type: 'link',
    })}
</div>
`
}

export {
    App,
}