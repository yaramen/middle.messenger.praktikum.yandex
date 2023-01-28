import {Button} from "../Button";
import {html} from "../../modules/html";
import uploadIcon from '../../icons/upload.svg'
import styles from './File.css'

function File() {
    function fileChange() {
        const label = document.querySelector('[data-ref="file"]')
        const image = label.querySelector('img')
        const input = label.querySelector('input')
        const fileName = input.files[0].name
        const fileElement = document.createElement('div');
        fileElement.innerText = fileName
        label.appendChild(fileElement)
        image.style.display = 'none'
    }

    return html`
<label class="${styles.container}" data-ref="file">
    <img class="${styles.image}" src="${uploadIcon}" alt="file"/>
    <input class="${styles.file}" type="file" id="file" onchange="${() => fileChange()}">
</label>
`
}

export {
    File
}