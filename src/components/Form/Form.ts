import { TextField } from '../TextField';
import { Button } from '../Button';
import styles from './Form.css';
import { createComponent, createElement, createText } from '../../modules/vdom/createElement';
import { FormData, FormButton } from '../../types/form';
import { formValidation, isValid } from '../../modules/validation';

interface FormProps {
    title: string,
    formData: FormData,
    submit: (e: Event, button: FormButton, data: object) => void
}

function Form({
    title,
    formData,
    submit,
}: FormProps) {
    const [formState, setFormState] = this.useState(formData.fields.reduce((acc, curr) => ({
        ...acc,
        [curr.name]: '',
    }), {}));

    const [errors, setErrors] = this.useState(formData.fields.reduce((acc, curr) => ({
        ...acc,
        [curr.name]: '',
    }), {}));

    const updateFormState = (e: InputEvent) => {
        const target = e.target as HTMLInputElement;
        const value = {
            ...formState(),
            [target.name]: target.value,
        };
        setFormState(value);
    };

    const validation = () => {
        const newErrors = formValidation(formData.fields, formState());
        setErrors(newErrors);

        return newErrors;
    };

    return createElement(
        'form',
        {
            className: styles.form,
        },
        createElement(
            'h1',
            {
                key: 'h1',
                className: styles.title,
            },
            createText(title),
        ),
        ...formData.fields.map((field) => createElement(
            'div',
            {
                key: field.name,
                className: styles.item,
            },
            createComponent(
                TextField,
                {
                    key: field.name,
                    ...field,
                    onChange: updateFormState,
                    onFocus: validation,
                    onBlur: validation,
                    errors: errors()[field.name],
                },
            ),
        )),
        ...formData.buttons.map((button) => createElement(
            'div',
            {
                className: styles.item,
                key: button.key,
            },
            createComponent(
                Button,
                {
                    ...button,
                    click: (e: Event) => {
                        if (button.type === 'submit') {
                            const newErrors = validation();
                            if (isValid(newErrors)) {
                                submit(e, button, formState());
                            } else {
                                e.preventDefault();
                            }
                        } else {
                            submit(e, button, formState());
                        }
                    },
                },
            ),
        )),
    );
}

export {
    Form,
};
