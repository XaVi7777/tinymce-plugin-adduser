export const filterByParam = (arrayOfUsers, param) => {
    return arrayOfUsers.filter(user => user.name.toLowerCase().indexOf(param) === 0)
}