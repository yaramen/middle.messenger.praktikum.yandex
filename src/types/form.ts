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
    action: string,
    type?: 'primary' | 'secondary' | 'link' | 'action' | 'icon'
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
