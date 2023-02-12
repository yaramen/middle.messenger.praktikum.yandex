type FormField = {
    type: string,
    name: string,
    placeholder?: string,
    value?:string,
    label?:string
    validation?: {
        length?: {
            min: number,
            max: number
        };
        pattern?: {
            reg: RegExp,
            message: string,
        },
        equal?: string
    }
};

type FormButton = {
    key: string,
    label: string,
    style?: 'primary' | 'secondary' | 'link' | 'action' | 'icon'
    type?: 'button' | 'reset' | 'submit'
    link: string,
};

type FormData = {
    fields: FormField[],
    buttons: FormButton[]
};

export {
    FormField,
    FormButton,
    FormData,
};
