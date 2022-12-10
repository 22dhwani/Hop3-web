import axios from 'axios';
import { Hop3Api_Local as Hop3_Service_Url } from '../serviceConfig';

export const Hop3_API = axios.create({ baseURL: Hop3_Service_Url });
