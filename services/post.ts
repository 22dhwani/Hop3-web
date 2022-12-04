import axios from "../config/axiosconfig";

interface IPostData {
  post_type: string;
  title: string;
  description: string;
  category: string;
  media_type: string;
  event?:string
  location?:string
  price_range?:string
  hashtag?:string
}

interface IReactionType {
  postId:string
  reactionData:{
    reaction_type: string
  };
}

export interface IPostDataUserItem {
  id:string,
  username: string,
  email:string,
  image:string
  role:string
}



export interface IPostDataItem extends IPostData {
  id:string,
  createdAt: string,
  updatedAt:string,
  status:string,
  totalLike: number,
  isLikeByMe:boolean,
  user: IPostDataUserItem
}

export const createPost = async (postDate: IPostData) =>
    (await axios.post("/post/createPost", postDate)).data;

export const createReaction = async (data: IReactionType) =>{
  const postId = data.postId
  const reactionData = data.reactionData
  return (await axios.put(`/post/addReaction/${postId}`, reactionData)).data;
}

export const approvePost = async (postId: string) =>{
  return (await axios.put(`/post/approve/${postId}`)).data;
}
export const rejectPost = async (postId: string) =>{
  return (await axios.put(`/post/reject/${postId}`)).data;
}

export const getPostForUser = async ({ queryKey } : any) =>{
  const [_, limit,page_number] = queryKey
  return (await axios.get(`/post/getAllPost?limit=${limit}&page_number${page_number}`)).data;
}

export const getPostForAdmin = async ({ queryKey } : any) =>{
  const [_, limit,page_number,status] = queryKey
  let url = `/post/getPostForAdmin?limit=${limit}&page_number${page_number}`
  if(status !== 'All' && status){
    url = url + `&status=${status}`
  }
  return (await axios.get(url)).data;
}



