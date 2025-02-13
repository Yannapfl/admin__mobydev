export const takeAccess = (section, role) => {
    if (!role) {
        return ''
    }
    if (role.editAccess.includes(section)) {
        return 'Редактирование'
    }
    if (role.readAccess.includes(section)) {
        return 'Только чтение'
    }
    return ''
}