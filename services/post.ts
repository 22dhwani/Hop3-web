/* eslint-disable prettier/prettier */
import hop3Api from '../config/axiosconfig';
import axios from 'axios';
import { PostDetail } from '../components/Explore/ExplorePostDetails';

interface IPostData {
  post_type: string;
  title: string;
  description: string;
  media_url: [
    {
      signUrl: string;
      content_type: string;
      media_name: string;
    },
  ];
  categories: any[];
  media_type: string;
  event?: string;
  location?: string;
  price_range?: string;
  hashtag?: string;
}

interface IReactionType {
  postId: string;
  reactionData: {
    reaction_type: string;
  };
}

export interface IPostDataUserItem {
  id: string;
  username: string;
  email: string;
  image: string;
  role: string;
}

export interface IPostMediaItem {
  content_type: string;
  file_size_mb: string;
}

export interface IPostMedia {
  post_media: IPostMediaItem[];
}

export interface IPostAddMedia {
  content_type: string;
  media_name: string;
}

interface IAddPostMediaApi {
  postId: string;
  mediaData: {
    post_media: IPostAddMedia[];
  };
}

interface IGetPostId {
  postId: string;
}

export interface IPostDataItem extends IPostData {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  totalLike: number;
  isLikeByMe: boolean;
  user: IPostDataUserItem;
}

export const createPost = async (postDate: IPostData) =>
  (await hop3Api.post('/post/createPost', postDate)).data;

export const getSignedUrl = async (data: {
  postId: string;
  postMediaData: IPostMedia;
}) => {
  const { postMediaData, postId } = data;
  return (
    await hop3Api.post(`/post/createPostMediaSignUrl/${postId}`, postMediaData)
  ).data;
};

export const uploadOnS3Bucket = async (data: {
  uploadUrl: string;
  fileData: any;
  fields: any;
  content_type: string;
}) => {
  try {
    const { uploadUrl, fileData, fields, content_type } = data;
    const formData = new FormData();
    Object.keys(fields).forEach((subItem: string) =>
      formData.append(subItem, fields[subItem]),
    );
    formData.append('Content-Type', content_type);
    formData.append('file', fileData);
    return (await axios.post(uploadUrl, formData)).status;
  } catch (e) {
    console.log('Error in upload on s3', e);
  }
};

export const createReaction = async (data: IReactionType) => {
  const postId = data.postId;
  const reactionData = data.reactionData;
  return (await hop3Api.put(`/post/addReaction/${postId}`, reactionData)).data;
};

export const approvePost = async (postId: string) => {
  return (await hop3Api.put(`/post/approve/${postId}`)).data;
};
export const rejectPost = async (postId: string) => {
  return (await hop3Api.put(`/post/reject/${postId}`)).data;
};

export const getAllPost = async ({ queryKey }: any) => {
  const [_, limit, page_number] = queryKey;
  return (
    await hop3Api.get(
      `/post/getAllPost?limit=${limit}&page_number${page_number}`,
    )
  ).data;
};

export const getPostForAdmin = async ({ queryKey }: any) => {
  const [_, limit, page_number, status] = queryKey;
  let url = `/post/getPostForAdmin?limit=${limit}&page_number${page_number}`;
  if (status !== 'All' && status) {
    url = url + `&status=${status}`;
  }
  return (await hop3Api.get(url)).data;
};

export const getPostForUser = async ({ queryKey }: any) => {
  const [_, limit, page_number, status] = queryKey;
  let url = `/post/getPostForMe?limit=${limit}&page_number${page_number}`;
  if (status !== 'All' && status) {
    url = url + `&status=${status}`;
  }
  const postdata = (await hop3Api.get(url)).data;
  console.log(postdata);
  return (await hop3Api.get(url)).data;
};

export const addPostMediaDetails = async (data: IAddPostMediaApi) => {
  const postId = data.postId;
  const mediaData = data.mediaData;
  return (await hop3Api.put(`/post/addPostMediaDetails/${postId}`, mediaData))
    .data;
};

export const getPostById = async ({ queryKey }: any) => {
  const postId = queryKey[1];
  console.log(queryKey, 'QUERY');
  // post/getPostById/63d0b3590dc5a1fe7a532d84
  const url = `/post/getPostById/${postId}`;
  return (await hop3Api.get(url)).data as PostDetail;
};
