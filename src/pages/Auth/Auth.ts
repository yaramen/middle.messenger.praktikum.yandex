import { PopupFormLayout } from '../../layout/PopupFormLayout';
import { Form } from '../../components/Form';
import { authFormData } from './data';
import { createComponent } from '../../modules/vdom/createElement';

// function Auth() {
//     return html(PopupFormLayout, {
//         children: html(Form, {
//             title: 'Вход',
//             formData: authFormData,
//             submit: async (element, button, data) => {
//                 // @ts-ignore
//                 // eslint-disable-next-line no-restricted-globals
//                 event.preventDefault();
//                 if (button.action === 'link') {
//                     goTo(button.link);
//                 } else {
//                     store.dispatch(actions.auth({
//                         login: data.login,
//                         password: data.password,
//                         link: button.link,
//                     }));
//                 }
//             },
//         }),
//     });
// }

function Auth() {
    return createComponent(
        PopupFormLayout,
        {
            key: 'form',
        },
        createComponent(
            Form,
            {
                key: 'form',
                title: 'Вход',
                formData: authFormData,
                submit: (e, state) => {
                    e.preventDefault();
                    console.log('submit', state);
                },
            },
        ),
    );
}

export {
    Auth,
};
