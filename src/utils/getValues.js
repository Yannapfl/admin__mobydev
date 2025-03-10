export function getValues(obj) {
    let values = [];

    Object.values(obj).forEach((value) => {
        if (typeof value === 'object') {
            values = [...values, ...getValues(value)];
        } else {
            values.push(String(value)); 
        }
    });

    return values;
}