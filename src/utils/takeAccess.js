export const takeAccess = (isAbleToManage) => {
    switch (isAbleToManage) {
        case true: 
            return 'Редактирование';
        case false: 
            return 'Только чтение';
        default:
            return '';
    }
}