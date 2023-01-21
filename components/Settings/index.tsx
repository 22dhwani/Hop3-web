import React, { ChangeEvent, useCallback, useState } from 'react';
import SettingsLayout from '../../layouts/SettingsLayout';
import Input from '../Input';
import ProfileUploader from '../ProfileUploader';
import { categories as all_categories } from '../ShareExperience';
import clsx from 'clsx';
import Image from 'next/image';
import BodyText3 from '../BodyText3';
import classes from '../../styles/Settings.module.scss';
import Button from '../Button';
import InputGroup from '../InputGroup';
import HeaderProfileNotification from '../HeaderProfileNotification';

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

  return (
    <SettingsLayout activeLink="/user-settings/account">
      <div className={classes.settings}>
        <HeaderProfileNotification />
        <ProfileUploader />
        <Input id="name" label="Name" placeholder="Your First and Last Name" />
        <h2 className={classes.headline4Div}>{'Shipping Address'}</h2>
        {!showAddress ? (
          <div className={classes.emptyAddress} onClick={onPressToggleAddress}>
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
                id="address_line1"
                label="Address Line 1"
                onChange={onChangeAddressText}
                value={addressInfo.address_line1}
                placeholder="Address Line 1"
              />
            </div>
            <div className={classes.input}>
              <Input
                id="address_line2"
                label="Address Line 2"
                onChange={onChangeAddressText}
                value={addressInfo.address_line2}
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
              <Button variant="primary">Save</Button>
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
            />
          </div>
          <div className={classes.mainZipCode} />
        </div>
        <h2 className={classes.headline4Div}>{'Preferences'}</h2>
        <div className={classes.preferenceContainer}>
          {all_categories.map((el: any, idx) => {
            return (
              <button
                key={'option' + idx}
                className={clsx(
                  classes.option,
                  categories.includes(el.label) && classes.active,
                )}
                onClick={() => {
                  onSelectCategory(el.label);
                }}>
                {el.label}
              </button>
            );
          })}
        </div>
        {categories.includes('Other') && (
          <div className={classes.otherThingDiv}>
            <Input
              id="other_category"
              label=""
              placeholder={'Other things you want to see'}
            />
          </div>
        )}
      </div>
    </SettingsLayout>
  );
};

export default Settings;
