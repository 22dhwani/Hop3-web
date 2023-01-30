import React, { useCallback, useState } from 'react';
import styles from '../styles/UserDetails.module.scss';
import Image from 'next/image';
import Logo from '../public/images/Logo.svg';
import { useRouter } from 'next/router';
import {
  createProfileImage,
  createUser,
  updateImageDetails,
} from '../services/auth';
import { useMutation } from 'react-query';
import { uploadOnS3Bucket } from '../services/post';
import { HandDrawnIcon1, HandDrawnIcon2 } from '../components/Icons/Icons';
import Button from '../components/Button';
import Input from '../components/Input';
import ProfileUploader from '../components/ProfileUploader';
import { useUserStore } from '../store/userStore';

export default function UserDetails() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [imageFile, setImageFile] = useState<any>(null);
  const [isSubmitting, SetIsSubmitting] = useState<any>(false);
  const createUserMutation = useMutation(createUser);
  const createProfileImageMutation = useMutation(createProfileImage);
  const updateProfileImageDetailsMutation = useMutation(updateImageDetails);
  const { fetchUserData } = useUserStore();
  const onChangeImage = useCallback((image: File) => {
    setImageFile(image);
  }, []);

  const moveToDashBoard = useCallback(async () => {
    fetchUserData().then();
    await router.replace('/explore');
    SetIsSubmitting(false);
  }, [fetchUserData, router]);

  const handleSubmit = useCallback(async () => {
    SetIsSubmitting(true);

    createUserMutation.mutate(
      {
        username,
      },
      {
        onSuccess: (resp: any) => {
          if (imageFile && resp?.id) {
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
                        moveToDashBoard();
                      },
                      onError: error => {
                        SetIsSubmitting(false);
                        console.error('Error in update profile details', error);
                      },
                    });
                  })
                  .catch(error => {
                    SetIsSubmitting(false);
                    console.error('error in upload', error);
                  });
              },
              onError: error => {
                SetIsSubmitting(false);
                console.error('Error in create profile picture', error);
              },
            });
          } else if (resp.id) {
            moveToDashBoard();
          }
        },
        onError: error => {
          SetIsSubmitting(false);
          console.error('Error in create user', error);
        },
      },
    );
  }, [
    createProfileImageMutation,
    createUserMutation,
    imageFile,
    moveToDashBoard,
    updateProfileImageDetailsMutation,
    username,
  ]);

  return (
    <div className={styles.userdetail}>
      <Image alt={''} src={Logo} />
      <div className={styles.userformwrapper}>
        <div className={styles.userform}>
          <div className={styles.title}>
            Update your profile photo and name to finalize account information
            <HandDrawnIcon1 classnames="onboard-1" />
            <HandDrawnIcon2 classnames="onboard-2" />
          </div>
          <ProfileUploader onChangeImage={onChangeImage} />
          <div className={styles.formcontainer}>
            <Input
              label={'Name'}
              autoComplete="off"
              name="username"
              onChange={(event: any) => {
                setUsername(event.target.value);
              }}
              placeholder="Your first name and last name"
              required
              id={'onboarding_username'}
            />
          </div>
          <Button
            variant={'dark'}
            isLoading={isSubmitting}
            disabled={!username.trim()}
            onClick={handleSubmit}>
            Start Hopping
          </Button>
        </div>
      </div>
    </div>
  );
}
