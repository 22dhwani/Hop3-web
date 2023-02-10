import SettingsLayout from '../../layouts/SettingsLayout';
import Input from '../Input';
import ProfileUploader from '../ProfileUploader';

const UserSettings = () => {
  return (
    <SettingsLayout activeLink="/user-settings/account">
      <ProfileUploader onChangeImage={file => {}} />
      <Input id="name" label="Name" placeholder="Your First and Last Name" />
    </SettingsLayout>
  );
};

export default UserSettings;
