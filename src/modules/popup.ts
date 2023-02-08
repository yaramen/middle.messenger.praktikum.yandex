import { VNode } from './vdom/types';
import { renderDom } from './vdom/render';
import styles from '../pages/Pages/Pages.css';
import { unmountChildren } from './vdom/different';

const getPopupRef = () => document.querySelector(`.${styles.overlay}`) as HTMLElement | null;

function usePopup(component: VNode) {
    return {
        component,
        close: () => {
            const popupRef = getPopupRef();
            if (popupRef) {
                if (component.type === 'component' && component.instance) {
                    component.instance.unmount();
                    unmountChildren(component.children);
                }
                popupRef.innerHTML = '';
                popupRef.style.display = 'none';
            }
        },
        show: () => {
            const popupRef = getPopupRef();
            if (popupRef) {
                const dom = renderDom(popupRef, component);
                popupRef.appendChild(dom);
                popupRef.style.display = 'block';
            }
        },
    };
}

export {
    usePopup,
};
