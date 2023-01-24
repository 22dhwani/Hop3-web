import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import SettingsLayout from '../../layouts/SettingsLayout';
import Input from '../Input';
import ProfileUploader from '../ProfileUploader';
import clsx from 'clsx';
import Image from 'next/image';
import BodyText3 from '../BodyText3';
import classes from '../../styles/Settings.module.scss';
import Button from '../Button';
import InputGroup from '../InputGroup';
import HeaderProfileNotification from '../HeaderProfileNotification';
import { useUserStore } from '../../store/userStore';
import { useMutation } from 'react-query';
import {
  createAddress,
  deleteAddress,
  updateAddress,
} from '../../services/address';
import editIcon from '../../public/vectors/icons/edit.svg';
import deleteIcon from '../../public/vectors/icons/delete.svg';
import { useCategoriesStore } from '../../store/categoriesStore';
import {
  createProfileImage,
  updateImageDetails,
  updateUser,
} from '../../services/auth';
import { uploadOnS3Bucket } from '../../services/post';
import { PREFERRED_CITIES } from '../../constant/constant';

const initialAddressInfo = {
  name: '',
  phone_number: '',
  address_line_1: '',
  address_line_2: '',
  city: '',
  zip_code: '',
  state: '',
  country: '',
};

const Settings = () => {
  const { userDetails: userData, fetchUserData } = useUserStore();
  const [showAddress, setShowAddress] = useState(false);
  const [addressInfo, setAddressInfo] = useState(initialAddressInfo);
  const [imageFile, setImageFile] = useState<any>(null);
  const mainZipCodeLength = userData?.main_zip_code.length || 0;
  const mainzipCode = userData?.main_zip_code[mainZipCodeLength - 1] || '';
  const [userInfo, setUserInfo] = useState({
    username: userData?.username || '',
    image: userData?.image || '',
    main_zip_code: mainzipCode || '',
    other_category: userData?.other_category || '',
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [error, setError] = useState({
    name: '',
    phone_number: '',
    address_line_1: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    username: '',
  });
  const { categories: allCategories } = useCategoriesStore();

  const createAddressMutation = useMutation(createAddress);
  const deleteAddressMutation = useMutation(deleteAddress);
  const updateAddressMutation = useMutation(updateAddress);
  const updateUserMutation = useMutation(updateUser);
  const createProfileImageMutation = useMutation(createProfileImage);
  const updateProfileImageDetailsMutation = useMutation(updateImageDetails);

  useEffect(() => {
    const localMainZipCodeLength = userData?.main_zip_code.length || 0;
    const localMainzipCode =
      userData?.main_zip_code[localMainZipCodeLength - 1] || '';
    if (
      userData?.username ||
      userData?.main_zip_code?.length ||
      userData?.other_category
    ) {
      setUserInfo(prevState => ({
        ...prevState,
        username: userData?.username,
        main_zip_code: localMainzipCode,
        other_category: userData?.other_category || '',
      }));
    }
  }, [userData?.username, userData?.main_zip_code, userData?.other_category]);

  useEffect(() => {
    if (userData?.preferred_categories?.length && userData?.other_category) {
      setCategories([
        ...userData.preferred_categories.map((item: any) => item?.id),
        'other',
      ]);
    } else if (userData?.preferred_categories?.length) {
      setCategories(userData.preferred_categories.map((item: any) => item?.id));
    }
  }, [userData?.preferred_categories, userData?.other_category]);

  useEffect(() => {
    if (userData?.preferred_cities?.length) {
      setCities(userData.preferred_cities);
    }
  }, [userData?.preferred_cities]);

  useEffect(() => {
    if (userData?.addresses.length) {
      const address = userData.addresses[0];
      setAddressInfo({
        name: address?.name || '',
        phone_number: address?.phone_number || '',
        address_line_1: address?.address_line_1 || '',
        address_line_2: address?.address_line_2 || '',
        city: address?.city || '',
        state: address?.state || '',
        zip_code: address?.zip_code || '',
        country: address?.country || '',
      });
    }
  }, [userData?.addresses]);

  useEffect(() => {
    fetchUserData().then();
  }, [fetchUserData]);

  const onSelectCategory = useCallback(
    (item: string) => {
      if (categories.includes(item)) {
        if (item === 'other') {
          setUserInfo(prevState => ({ ...prevState, other_category: '' }));
        }
        setCategories(prevState =>
          prevState.filter((subItem: any) => item !== subItem),
        );
      } else {
        setCategories(prevState => [...prevState, item]);
      }
    },
    [categories],
  );

  const onSelectCities = useCallback(
    (item: string) => {
      if (cities.includes(item)) {
        setCities(prevState =>
          prevState.filter((subItem: any) => item !== subItem),
        );
      } else {
        setCities(prevState => [...prevState, item]);
      }
    },
    [cities],
  );

  const onPressToggleAddress = useCallback(() => {
    setShowAddress(prevState => !prevState);
  }, []);

  const onChangeAddressText = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const id = event.target.id;
      const value = event.target.value;
      setAddressInfo(prevState => ({
        ...prevState,
        [id]: value,
      }));
    },
    [],
  );

  const onChangeUserInfo = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const id = event.target.id;
      const value = event.target.value;
      setUserInfo(prevState => ({
        ...prevState,
        [id]: value,
      }));
    },
    [],
  );

  const checkValidation = useCallback(() => {
    const tempError = { ...error };
    tempError.name = addressInfo.name === '' ? 'Name is required' : '';
    tempError.phone_number =
      addressInfo.phone_number === '' ? 'Phone number is required' : '';
    tempError.address_line_1 =
      addressInfo.address_line_1 === '' ? 'Address Line 1 is required' : '';
    tempError.city = addressInfo.city === '' ? 'City is required' : '';
    tempError.zip_code =
      addressInfo.zip_code === '' ? 'Zip code is required' : '';
    tempError.zip_code = isNaN(parseInt(addressInfo.zip_code))
      ? 'Zip code should be only number'
      : '';
    tempError.state = addressInfo.state === '' ? 'State code is required' : '';
    tempError.country =
      addressInfo.country === '' ? 'Country code is required' : '';
    setError(tempError);
    return tempError;
  }, [error, addressInfo]);

  const onPressSaveAddress = useCallback(() => {
    // VALIDATION ADDRESS FORM
    // const tempError = checkValidation();
    // if (
    //   !tempError.name &&
    //   !tempError.phone_number &&
    //   !tempError.address_line_1 &&
    //   !tempError.city &&
    //   !tempError.state &&
    //   !tempError.zip_code &&
    //   !tempError.country
    // ) {
    const payload: any = {
      name: addressInfo.name.trim(),
      phone_number: addressInfo.phone_number.trim(),
      address_line_1: addressInfo.address_line_1.trim(),
      city: addressInfo.city.trim(),
      state: addressInfo.state.trim(),
      country: addressInfo.country.trim(),
      zip_code: parseInt(addressInfo.zip_code),
    };
    if (addressInfo.address_line_2.trim()) {
      payload.address_line_2 = addressInfo.address_line_2.trim();
    }
    const options = {
      onSuccess: (data: any) => {
        if (data) {
          fetchUserData().then();
          onPressToggleAddress();
        }
      },
      onError: (error: any) => {
        console.error('Error in save data', error);
      },
    };
    const addressId = userData?.addresses?.length && userData?.addresses[0]?.id;
    if (addressId) {
      updateAddressMutation.mutate(
        { addressId, addressInfo: payload },
        options,
      );
    } else {
      createAddressMutation.mutate(payload, options);
    }
    // }
  }, [
    addressInfo,
    checkValidation,
    createAddressMutation,
    fetchUserData,
    onPressToggleAddress,
    updateAddressMutation,
    userData?.addresses,
  ]);

  const uploadImage = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      const userId = userData?.id;
      if (imageFile && userId) {
        const payload = {
          image_media: {
            content_type: imageFile?.type,
            file_size_mb: imageFile?.size / 1024 / 1024,
          },
        };
        createProfileImageMutation.mutate(payload, {
          onSuccess: imageData => {
            uploadOnS3Bucket({
              uploadUrl: imageData.signUrl,
              fileData: imageFile,
              fields: imageData.fields,
              content_type: imageData.content_type,
            })
              .then(() => {
                const payload = {
                  image_name: imageData.name,
                };
                updateProfileImageDetailsMutation.mutate(payload, {
                  onSuccess: () => {
                    resolve();
                  },
                  onError: error => {
                    reject(error);
                    console.error('Error in update profile details', error);
                  },
                });
              })
              .catch(error => {
                reject(error);
                console.error('error in upload', error);
              });
          },
          onError: error => {
            reject(error);
            console.error('Error in create profile picture', error);
          },
        });
      }
    });
  }, [
    createProfileImageMutation,
    imageFile,
    updateProfileImageDetailsMutation,
    userData?.id,
  ]);

  const onPressUpdateUser = useCallback(async () => {
    try {
      const payload: any = {};
      if (userInfo.username.trim()) {
        payload.username = userInfo.username.trim();
        setError(prevState => ({
          ...prevState,
          username: '',
        }));
      } else {
        setError(prevState => ({
          ...prevState,
          username: 'Username is require',
        }));
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        return;
      }
      const mainZipCode = userInfo?.main_zip_code?.trim();
      if (mainZipCode) {
        payload.main_zip_code = mainZipCode;
      }
      payload.other_category = userInfo.other_category.trim();
      if (categories.length > 0) {
        payload.preferred_categories = categories.filter(
          item => item !== 'other',
        );
      }
      if (cities.length) {
        payload.preferred_cities = cities;
      }
      if (cities.length) {
        payload.preferred_cities = cities;
      }
      const options = {
        onSuccess: (data: any) => {
          if (data) {
            fetchUserData().then();
          }
        },
        onError: (error: any) => {
          console.error('Error in update user data', error);
        },
      };
      if (imageFile) {
        await uploadImage();
      }
      updateUserMutation.mutate(payload, options);
    } catch (e) {
      console.error('Error in update', e);
    }
  }, [
    categories,
    cities,
    fetchUserData,
    imageFile,
    updateUserMutation,
    uploadImage,
    userInfo?.main_zip_code,
    userInfo.other_category,
    userInfo.username,
  ]);

  const onChangeImage = useCallback((image: File) => {
    setImageFile(image);
  }, []);

  const onPressDeleteAddress = useCallback(() => {
    if (userData?.addresses?.length) {
      const addressId = userData?.addresses[0]?.id;
      const options = {
        onSuccess: () => {
          fetchUserData().then();
          setAddressInfo(initialAddressInfo);
        },
        onError: (error: any) => {
          console.log('Error in delete address', error);
        },
      };
      if (addressId) {
        deleteAddressMutation.mutate(addressId, options);
      }
    }
  }, [deleteAddressMutation, fetchUserData, userData?.addresses]);

  const address = userData?.addresses.length ? userData?.addresses[0] : null;

  return (
    <SettingsLayout activeLink="/user-settings/account">
      <div className={classes.settings}>
        <HeaderProfileNotification />
        <ProfileUploader url={userData?.image} onChangeImage={onChangeImage} />
        <Input
          id="username"
          label="Name"
          placeholder="Your First and Last Name"
          value={userInfo.username}
          onChange={onChangeUserInfo}
          required
          errorText={error.username}
        />
        <h2 className={classes.headline4Div}>{'Shipping Address'}</h2>
        {!showAddress ? (
          <div className={classes.emptyAddress}>
            {address ? (
              <>
                <div className={classes.leftView}>
                  <p className={classes.nameTitle}>{address.name}</p>
                  <p className={classes.addressDescription}>
                    {`${address?.address_line_1 || ''}, ${
                      address?.address_line_2 || ''
                    },
                 ${address?.city || ''}, ${address?.state || ''} ${
                      address?.zip_code || ''
                    }, ${address?.country || ''}`}
                    <br />
                    {`${address.phone_number || ''}`}
                  </p>
                </div>
                <div>
                  <button
                    className={classes.iconStyle}
                    onClick={onPressToggleAddress}>
                    <Image src={editIcon} alt={'Edit'} />
                  </button>
                  <button
                    className={classes.iconStyle}
                    onClick={onPressDeleteAddress}>
                    <Image src={deleteIcon} alt={'Delete'} />
                  </button>
                </div>
              </>
            ) : (
              <div onClick={onPressToggleAddress} className={classes.rowDiv}>
                <Image
                  src="/vectors/icons/add.svg"
                  alt="add"
                  width={18}
                  height={18}
                />
                <BodyText3
                  text={'Add a shipping address'}
                  className={classes.emptyAddressText}
                />
              </div>
            )}
          </div>
        ) : (
          <InputGroup>
            <div className={classes.inputRow}>
              <div className={classes.input}>
                <Input
                  id="name"
                  label="Name"
                  onChange={onChangeAddressText}
                  value={addressInfo.name}
                  placeholder="Name"
                />
              </div>
              <div className={classes.input}>
                <Input
                  id="phone_number"
                  label="Phone number"
                  onChange={onChangeAddressText}
                  value={addressInfo.phone_number}
                  placeholder="Phone number"
                />
              </div>
            </div>
            <div className={classes.input}>
              <Input
                id="address_line_1"
                label="Address Line 1"
                onChange={onChangeAddressText}
                value={addressInfo.address_line_1}
                placeholder="Address Line 1"
              />
            </div>
            <div className={classes.input}>
              <Input
                id="address_line_2"
                label="Address Line 2"
                onChange={onChangeAddressText}
                value={addressInfo.address_line_2}
                placeholder="Address Line 2"
              />
            </div>
            <div className={classes.inputRow}>
              <div className={classes.input}>
                <Input
                  id="city"
                  label="City"
                  onChange={onChangeAddressText}
                  value={addressInfo.city}
                  placeholder="City"
                />
              </div>
              <div className={classes.input}>
                <Input
                  id="zip_code"
                  label="Zip Code"
                  onChange={onChangeAddressText}
                  value={addressInfo.zip_code}
                  placeholder="Zip Code"
                />
              </div>
            </div>
            <div className={classes.inputRow}>
              <div>
                <Input
                  id="state"
                  label="State"
                  onChange={onChangeAddressText}
                  value={addressInfo.state}
                  placeholder="State"
                />
              </div>
              <div>
                <Input
                  id="country"
                  label="Country"
                  onChange={onChangeAddressText}
                  value={addressInfo.country}
                  placeholder="Country"
                />
              </div>
            </div>
            <div className={classes.buttonContainer}>
              <Button variant="transparent" onClick={onPressToggleAddress}>
                Cancel
              </Button>
              <Button variant="primary" onClick={onPressSaveAddress}>
                Save
              </Button>
            </div>
          </InputGroup>
        )}
        <h2 className={classes.headline4Div}>{'Where are you located?'}</h2>

        <div className={classes.inputRow}>
          <div className={classes.mainZipCode}>
            <Input
              id="main_zip_code"
              label="Zip Code"
              placeholder={'Zip code'}
              value={userInfo.main_zip_code}
              onChange={onChangeUserInfo}
            />
          </div>
          <div className={classes.mainZipCode} />
        </div>
        <h2 className={classes.headline4Div}>{'Preferred Cities'}</h2>
        <div className={classes.preferenceContainer}>
          {PREFERRED_CITIES.map((el: any, idx: number) => {
            return (
              <button
                key={'option' + idx}
                className={clsx(
                  classes.option,
                  cities.includes(el) && classes.active,
                )}
                onClick={() => {
                  onSelectCities(el);
                }}>
                {el}
              </button>
            );
          })}
        </div>
        <h2 className={classes.headline4Div}>{'Preferences'}</h2>
        <div className={classes.preferenceContainer}>
          {allCategories.map((el: any, idx: number) => {
            return (
              <button
                key={'option' + idx}
                className={clsx(
                  classes.option,
                  categories.includes(el.id) && classes.active,
                )}
                onClick={() => {
                  onSelectCategory(el.id);
                }}>
                {el.name}
              </button>
            );
          })}
        </div>
        {categories.includes('other') && (
          <div className={classes.otherThingDiv}>
            <Input
              id="other_category"
              label=""
              placeholder={'Other things you want to see'}
              value={userInfo.other_category}
              onChange={onChangeUserInfo}
            />
          </div>
        )}
        <div
          className={clsx(
            classes.buttonContainer,
            classes.mainButtonContainer,
          )}>
          <Button variant="primary" onClick={onPressUpdateUser}>
            Update
          </Button>
        </div>
      </div>
    </SettingsLayout>
  );
};

export default Settings;
