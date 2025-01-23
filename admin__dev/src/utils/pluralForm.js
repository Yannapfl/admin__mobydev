export function getPluralForm(number, one, few, many) {
    if (number % 10 === 1 && number % 100 !== 11) return one; 
    if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) return few;
    return many; 
}