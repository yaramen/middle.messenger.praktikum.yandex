type FormField = {
    type: string,
    name: string,
    placeholder?: string,
    value?:string,
    label?:string
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
