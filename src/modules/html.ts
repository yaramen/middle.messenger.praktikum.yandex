(window as Window).handlers = [];

function html(parts, ...args): string {
    if (typeof parts === 'function') {
        const component = parts;
        return component(...args);
    }
    let result = parts[0];
    for (let i = 1; i < parts.length; i++) {
        let currentArg = args[i - 1];
        if (!currentArg) {
            currentArg = '';
        }
        if (typeof currentArg === 'function') {
            const length = (window as Window).handlers.push(currentArg);
            currentArg = `window.handlers[${length - 1}](this)`;
        }
        if (typeof currentArg === 'object') {
            if (currentArg instanceof Array) {
                currentArg = currentArg.join('');
            } else if (currentArg instanceof Object) {
                currentArg = Object.keys(currentArg).map((key) => `${key}="${currentArg[key]}"`);
            }
        }
        result += currentArg + parts[i];
    }
    return result;
}

function className(classObject) {
    return Object.keys(classObject).reduce((acc, curr) => {
        if (classObject[curr]) {
            // eslint-disable-next-line no-param-reassign
            acc += ` ${curr}`;
        }
        return acc.trim();
    }, '');
}

export {
    html,
    className,
};
