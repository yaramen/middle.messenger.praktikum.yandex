(window as Window).handlers = [];

function className(classObject: Record<string, boolean>) {
    return Object.keys(classObject).reduce((acc, curr) => {
        if (classObject[curr]) {
            return [...acc, curr];
        }
        return acc;
    }, []);
}

export {
    className,
};
