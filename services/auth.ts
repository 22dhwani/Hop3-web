import axios from "../config/axiosconfig";

interface userDataType {
  username: string;
  email: string;
}

export const createUser = async (userData: userDataType) =>
  await axios.post("/user/createUser", userData);

export const getUser = async () =>{
 const response= await axios.get("/user/getMineUser/");
  return response.data
}