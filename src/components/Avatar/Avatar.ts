import styles from './Avatar.css';
import { createElement } from '../../modules/vdom/createElement';
import avatarIcon from '../../icons/avatar.svg';
import { resourceUrl } from '../../api/baseUrl';

interface AvatarProps {
    image?: string,
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
                src: image ? resourceUrl + image : avatarIcon,
                alt: name,
            },
        ),
    );
}

export {
    Avatar,
};
