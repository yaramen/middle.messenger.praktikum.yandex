import {html} from "../../modules/html";
import {Button} from "../Button";

function ActionList(actions) {
    return html`
<ul>
    ${actions.map(({label, icon, click}) => html`
        <li>
            ${html(Button, {
                type: 'action',
                label,
                icon,
                click
            })}
        </li>
    `)}
</ul>
`
}

export {
    ActionList
}