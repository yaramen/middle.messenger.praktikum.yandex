import { FormField } from '../types/form';

function formValidation(fields: FormField[], formState: Record<string, string>): Record<string, string> {
    return fields.reduce((acc, field) => {
        const { name } = field;
        const value = formState[name];

        if (!field.validation) {
            acc[field.name] = '';
            return acc;
        }

        const { validation } = field;

        const length = 'length' in validation ? validation.length : null;
        if (length && (value.length < length.min || value.length > length.max)) {
            acc[field.name] = `Длина от ${length.min} до ${length.max}`;
            return acc;
        }

        if ('pattern' in validation && validation.pattern && !value.match(validation.pattern.reg)) {
            acc[field.name] = validation.pattern.message;
            return acc;
        }

        if ('equal' in validation && validation.equal && value !== formState[validation.equal]) {
            acc[field.name] = 'Поля не совпадают';
            return acc;
        }

        acc[field.name] = '';
        return acc;
    }, {} as Record<string, string>);
}

const isValid = (errs: Record<string, string>) => Object.keys(errs).every((key) => errs[key] === '');

export {
    formValidation,
    isValid,
};
