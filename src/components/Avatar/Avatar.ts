import styles from './Avatar.css';
import { createElement } from '../../modules/vdom/createElement';

interface AvatarProps {
    image: string,
    name: string;
}

function Avatar({ image, name }: AvatarProps) {
    return createElement(
        'div',
        { className: styles.avatar },
        createElement(
            'img',
            {
                className: styles.image,
                src: image,
                alt: name,
            },
        ),
    );
}

export {
    Avatar,
};
