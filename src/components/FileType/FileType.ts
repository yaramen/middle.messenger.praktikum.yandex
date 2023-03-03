import styles from './FileType.css';
import { createElement, createText } from '../../modules/vdom/createElement';
import { resourceUrl } from '../../api/baseUrl';

function FileType({ file }: { file: { path: string, content_type: string, filename: string } }) {
    return file.content_type.startsWith('image')
        ? createElement(
            'img',
            {
                className: styles.image,
                key: 'file',
                src: resourceUrl + file.path,
            },
        )
        : createElement(
            'a',
            {
                key: 'link',
                href: resourceUrl + file.path,
                target: '_blank',
            },
            createText(file.filename),
        );
}

export {
    FileType,
};
