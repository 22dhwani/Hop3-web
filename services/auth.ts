import axios from '../config/axiosconfig'

interface userDataType {
    username: string,
    email: string,

}

export const createUser = (userData: userDataType) =>
    axios.post('/user/createUser', userData);

export const getUser = () => axios.get('/user/getMineUser/');
