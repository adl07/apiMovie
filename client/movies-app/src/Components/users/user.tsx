
function UserLogin<T>(name: T, password: T): [T,T]{
    console.log(name, password)
    return[name, password]
}

export default UserLogin