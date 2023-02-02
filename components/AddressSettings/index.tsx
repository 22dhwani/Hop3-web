/* eslint-disable prettier/prettier */
import SettingsLayout from '../../layouts/SettingsLayout';
import Input from '../Input';
import classes from '../../styles/AddressSettings.module.scss';

const AddressSettings = () => {
  return (
    <SettingsLayout
      activeLink="/user-settings/address"
      className={classes.addressSettings}>
      <div className={classes.input}>
        <Input id="address-line-1" label="Address Line 1" />
      </div>
      <div className={classes.input}>
        <Input id="address-line-2" label="Address Line 2" />
      </div>

      <div className={classes.inputRow}>
        <div className={classes.input}>
          <Input id="city" label="City" />
        </div>
        <div className={classes.input}>
          <Input id="zip-code" label="Zip Code" />
        </div>
      </div>
      <div className={classes.inputRow}>
        <div className={classes.input}>
          <Input id="state" label="State" />
        </div>
        <div className={classes.input}>
          <Input id="country" label="Country" />
        </div>
      </div>
    </SettingsLayout>
  );
};

export default AddressSettings;
