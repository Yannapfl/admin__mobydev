export function checkFilled(value) {
    if (typeof value === 'number') {
        return value > 0;
    }
    return !!(value && value.length > 0);
};
