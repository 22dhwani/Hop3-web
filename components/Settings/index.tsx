import React, { ChangeEvent, useCallback, useState } from 'react';
import SettingsLayout from '../../layouts/SettingsLayout';
import Input from '../Input';
import ProfileUploader from '../ProfileUploader';
import Headline4 from '../Headline4';
import { categories as all_categories } from '../ShareExperience';
import clsx from 'clsx';
import Image from 'next/image';
import BodyText3 from '../BodyText3';
import classes from '../../styles/Settings.module.scss';

const Settings = () => {
  const [showAddress, setShowAddress] = useState(false);
  const [addressInfo, setAddressInfo] = useState({
    name: '',
    phone_number: '',
    address_line1: '',
    address_line2: '',
    city: '',
    zip_code: '',
    state: '',
    country: '',
  });
  const [categories, setCategories] = useState<string[]>([]);

  const onSelectCategory = useCallback(
    (item: string) => {
      if (categories.includes(item)) {
        setCategories(prevState =>
          prevState.filter((subItem: any) => item !== subItem),
        );
      } else {
        setCategories(prevState => [...prevState, item]);
      }
    },
    [categories],
  );

  const onPressShowAddress = useCallback(() => {
    setShowAddress(prevState => !prevState);
  }, []);

  const onChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setAddressInfo(prevState => ({ ...prevState, name: event.target.value }));
  }, []);

  const onChangePhoneNumber = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setAddressInfo(prevState => ({
        ...prevState,
        phone_number: event.target.value,
      }));
    },
    [],
  );

  const onChangeAddress1 = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setAddressInfo(prevState => ({
        ...prevState,
        address_line1: event.target.value,
      }));
    },
    [],
  );

  const onChangeAddress2 = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setAddressInfo(prevState => ({
        ...prevState,
        address_line2: event.target.value,
      }));
    },
    [],
  );

  const onChangeCity = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setAddressInfo(prevState => ({ ...prevState, city: event.target.value }));
  }, []);

  const onChangeAddressZipcode = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setAddressInfo(prevState => ({
        ...prevState,
        zip_code: event.target.value,
      }));
    },
    [],
  );

  const onChangeState = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setAddressInfo(prevState => ({
      ...prevState,
      state: event.target.value,
    }));
  }, []);

  const onChangeCountry = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setAddressInfo(prevState => ({
        ...prevState,
        country: event.target.value,
      }));
    },
    [],
  );

  return (
    <SettingsLayout activeLink="/user-settings/account">
      <ProfileUploader />
      <div className={classes.settings}>
        <Input id="name" label="Name" placeholder="Your First and Last Name" />
        <Headline4 text={'Shipping Address'} className={classes.headline4Div} />
        {!showAddress ? (
          <div className={classes.emptyAddress} onClick={onPressShowAddress}>
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
        ) : (
          <div>
            <div className={classes.inputRow}>
              <div className={classes.input}>
                <Input
                  id="name"
                  label="Name"
                  onChange={onChangeName}
                  value={addressInfo.name}
                  placeholder="Name"
                />
              </div>
              <div className={classes.input}>
                <Input
                  id="phone_number"
                  label="Phone number"
                  onChange={onChangePhoneNumber}
                  value={addressInfo.phone_number}
                  placeholder="Phone number"
                />
              </div>
            </div>
            <div className={classes.input}>
              <Input
                id="address-line-1"
                label="Address Line 1"
                onChange={onChangeAddress1}
                value={addressInfo.address_line1}
                placeholder="Address Line 1"
              />
            </div>
            <div className={classes.input}>
              <Input
                id="address-line-2"
                label="Address Line 2"
                onChange={onChangeAddress2}
                value={addressInfo.address_line2}
                placeholder="Address Line 2"
              />
            </div>
            <div className={classes.inputRow}>
              <div className={classes.input}>
                <Input
                  id="city"
                  label="City"
                  onChange={onChangeCity}
                  value={addressInfo.city}
                  placeholder="City"
                />
              </div>
              <div className={classes.input}>
                <Input
                  id="zip-code"
                  label="Zip Code"
                  onChange={onChangeAddressZipcode}
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
                  onChange={onChangeState}
                  value={addressInfo.state}
                  placeholder="State"
                />
              </div>
              <div>
                <Input
                  id="country"
                  label="Country"
                  onChange={onChangeCountry}
                  value={addressInfo.country}
                  placeholder="Country"
                />
              </div>
            </div>
          </div>
        )}
        <Headline4
          text={'Where are you located?'}
          className={classes.headline4Div}
        />
        <div className={classes.inputRow}>
          <div className={classes.mainZipCode}>
            <Input id="main_zip_code" label="Zip Code" />
          </div>
          <div className={classes.mainZipCode} />
        </div>
        <Headline4 text={'Preferences'} className={classes.headline4Div} />
        <div className={classes.preferenceContainer}>
          {all_categories.map((el: any, idx) => {
            return (
              <div
                key={'option' + idx}
                className={clsx(
                  classes.option,
                  categories.includes(el.label) && classes.active,
                )}
                onClick={() => {
                  onSelectCategory(el.label);
                }}>
                {el.label}
              </div>
            );
          })}
        </div>
      </div>
    </SettingsLayout>
  );
};

export default Settings;
