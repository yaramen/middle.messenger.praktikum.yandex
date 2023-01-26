let popupRef = null;

const getPopupRef = () => document.querySelector('[data-ref="overlay"]')

function usePopup(component) {
    return {
        close: () => {
            const popupRef = getPopupRef()
            popupRef.innerHTML = '';
            popupRef.style.display = "none";
        },
        show: () => {
            const popupRef = getPopupRef()
            popupRef.innerHTML = component
            popupRef.style.display = "block";
        },
    }
}

export {
    popupRef,
    usePopup,
}


