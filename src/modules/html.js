window._handlers = [];

function html(parts, ...args) {
    if (typeof parts === 'function') {
        const component = parts;
        return component(...args);
    } else {
        let result = parts[0];
        for (let i = 1; i < parts.length; i++) {
            let currentArg = args[i - 1];
            if (!currentArg) {
                currentArg = '';
            }
            if (typeof currentArg === 'function') {
                const length = window._handlers.push(currentArg);
                currentArg = `window._handlers[${length - 1}](this)`;
            }
            if (typeof currentArg === 'object' && currentArg instanceof Array) {
                currentArg = currentArg.join('')
            }
            result += currentArg + parts[i]
        }
        return result
    }
}

function className(classObject) {
    return Object.keys(classObject).reduce((acc, curr) => {
        if  (classObject[curr]) {
            acc += ' ' + curr
        }
        return acc;
    }, '')
}

export {
    html,
    className,
}
