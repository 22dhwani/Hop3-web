import hop3Api from '../config/axiosconfig';

interface IOrderData {
  products: string[];
}

export const createOrder = async (orderInfo: IOrderData) =>
  (await hop3Api.post('/order/createOrder', orderInfo)).data;
