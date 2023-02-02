const getPopupRef = () => document.querySelector('[data-ref="overlay"]') as HTMLElement | null;

function usePopup(component) {
    return {
        close: () => {
            const popupRef = getPopupRef();
            if (popupRef) {
                popupRef.innerHTML = '';
                popupRef.style.display = 'none';
            }
        },
        show: () => {
            const popupRef = getPopupRef();
            if (popupRef) {
                popupRef.innerHTML = component;
                popupRef.style.display = 'block';
            }
        },
    };
}

export {
    usePopup,
};
