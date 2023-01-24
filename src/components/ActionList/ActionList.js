import {html} from "../../modules/html";
import {Button} from "../Button";

function ActionList(actions) {
    return html`
<ul>
    ${actions.map(({label, icon, click}) => html(Button, {
        type: 'action',
        label, 
        icon, 
        click
    }))}
<ul>
`
}

export {
    ActionList
}