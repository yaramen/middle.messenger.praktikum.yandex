import {html} from '../../modules/html';
import {ProfileLayout} from '../../layout/ProfileLayout';
import {PasswordForm} from '../../components/PasswordForm';

function PasswordEdit() {
    return html(ProfileLayout, html(PasswordForm));
}

export {
    PasswordEdit
}