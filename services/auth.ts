import axios from '../config/axiosconfig';

interface userDataType {
  username: string;
}

interface IUploadProfileImage {
  image_media: {
    content_type: string;
    file_size_mb: number;
  };
}

interface IUpdateImageDetails {
  image_name: string;
}

export const createUser = async (userData: userDataType) =>
  (await axios.post('/user/createUser', userData)).data;

export const getUser = async () => {
  const response = await axios.get('/user/getMineUser/');
  console.log(response?.data);
  return response?.data;
};

export const createProfileImage = async (imageData: IUploadProfileImage) => {
  const response = await axios.post('/user/createProfileImageUrl/', imageData);
  return response?.data;
};

export const updateImageDetails = async (imageData: IUpdateImageDetails) => {
  const response = await axios.put('/user/updateImageDetails/', imageData);
  return response?.data;
};
