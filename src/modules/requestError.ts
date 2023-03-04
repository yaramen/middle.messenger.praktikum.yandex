import { showMessage } from './messageBox';

const ERROR_MESSAGE = 'Ошибка сервера';

function requestError(xhr: XMLHttpRequest) {
    try {
        const data = JSON.parse(xhr.responseText);
        showMessage('reason' in data
            ? data.reason
            : ERROR_MESSAGE);
    } catch (e) {
        showMessage(ERROR_MESSAGE);
    }
}

export {
    requestError,
};
