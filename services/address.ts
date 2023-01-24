import hop3Api from '../config/axiosconfig';

interface IAddressData {
  name: string;
  phone_number: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  zip_code: number;
  state: string;
  country: string;
}

export const createAddress = async (addressInfo: IAddressData) =>
  (await hop3Api.post('/address/createAddress', addressInfo)).data;

export const updateAddress = async ({
  addressId,
  addressInfo,
}: {
  addressId: string;
  addressInfo: IAddressData;
}) => (await hop3Api.put(`/address/${addressId}`, addressInfo)).data;

export const deleteAddress = async (addressId: string) =>
  (await hop3Api.delete(`/address/${addressId}`)).data;
