import { TextFieldLabel } from '../TextFieldLabel';
import { createComponent, createElement } from '../../modules/vdom/createElement';
import { FormField } from '../../types/form';
import styles from './FormEdit.css';
import { Button } from '../Button';
import { formValidation, isValid } from '../../modules/validation';

interface FormEditProps {
    fields: FormField[],
    isEdit?: boolean,
    submit: (data: Record<string, string>) => void,
    cancel: () => void
}

function FormEdit({
    fields,
    isEdit = true,
    submit,
    cancel,
}: FormEditProps) {
    const [formState, setFormState] = this.useState(fields.reduce((acc, curr) => ({
        ...acc,
        [curr.name]: curr.value ?? '',
    }), {}));

    const [errors, setErrors] = this.useState(fields.reduce((acc, curr) => ({
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
        const newErrors = formValidation(fields, formState());
        setErrors(newErrors);
        return newErrors;
    };

    return createElement(
        'form',
        {
            key: 'form',
        },
        ...fields.map((field) => createElement(
            'div',
            { key: field.name },
            createComponent(
                TextFieldLabel,
                {
                    ...field,
                    readonly: !isEdit,
                    key: field.name,
                    value: formState()[field.name],
                    errors: errors()[field.name],
                    onChange: updateFormState,
                    onFocus: validation,
                    onBlur: validation,
                },
            ),
        )),
        !isEdit ? null : createElement(
            'div',
            {
                key: 'pair',
                className: styles.pair,
            },
            createComponent(
                Button,
                {
                    key: 'save',
                    label: 'Сохранить',
                    type: 'submit',
                    click: (e: Event) => {
                        e.preventDefault();
                        const newErrors = validation();
                        if (isValid(newErrors)) {
                            submit(formState());
                        }
                    },
                },
            ),
            createComponent(
                Button,
                {
                    key: 'cansel',
                    label: 'Отмена',
                    click: cancel,
                },
            ),
        ),
    );
}

export {
    FormEdit,
};
