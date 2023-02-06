import { Button, ButtonProps } from '../Button';
import { createComponent, createElement } from '../../modules/vdom/createElement';

interface ActionListProps {
    actions: (ButtonProps & { key: string }) []
}

function ActionList({ actions }: ActionListProps) {
    return createElement(
        'ul',
        {},
        ...actions.map(({
            label, icon, click, key,
        }) => createElement(
            'li',
            {
                key,
            },
            createComponent(
                Button,
                {
                    key,
                    type: 'action',
                    label,
                    icon,
                    click,
                },
            ),
        )),
    );
}

export {
    ActionList,
};
