import React, { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import styles from '../styles/UserDetails.module.scss';
import Image from 'next/image';
import Logo from '../public/images/Logo.svg';
import Upload from '../public/images/Upload.svg';
import { getThemeColor } from '../utils/utils';

import {
  Button,
  CardContent,
  Fab,
  FormControl,
  FormLabel,
  Grid,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/router';
import {
  createProfileImage,
  createUser,
  updateImageDetails,
} from '../services/auth';
import { useMutation } from 'react-query';
import { uploadOnS3Bucket } from '../services/post';

export default function UserDetails() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [imageFile, setImageFile] = useState<any>(null);
  const createUserMutation = useMutation(createUser);
  const createProfileImageMutation = useMutation(createProfileImage);
  const updateProfileImageDetailsMutation = useMutation(updateImageDetails);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated || !router?.query?.user) {
      router.back();
    }
  }, []);

  const handleUploadClick = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e?.target?.files?.length && e?.target?.files[0];
      if (file) {
        setImageFile({
          fileData: file,
          fileUrl: URL.createObjectURL(file),
        });
      }
    },
    [],
  );

  const moveToDashBoard = useCallback(() => {
    localStorage.setItem('isAuthenticated', 'true');
    router.push('/dashboard');
  }, []);

  const handleSubmit = useCallback(async () => {
    createUserMutation.mutate(
      {
        username,
      },
      {
        onSuccess: (resp: any) => {
          Cookies.set('loggedin', 'true');

          if (imageFile && resp?.id) {
            const payload = {
              image_media: {
                content_type: imageFile?.fileData.type,
                file_size_mb: imageFile?.fileData?.size / 1024 / 1024,
              },
            };
            createProfileImageMutation.mutate(payload, {
              onSuccess: imageData => {
                uploadOnS3Bucket({
                  uploadUrl: imageData.signUrl,
                  fileData: imageFile.fileData,
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
                        console.error('Error in update profile details', error);
                      },
                    });
                  })
                  .catch(error => {
                    console.error('error in upload', error);
                  });
              },
              onError: error => {
                console.error('Error in create profile picture', error);
              },
            });
          } else if (resp.id) {
            moveToDashBoard();
          }
        },
        onError: error => {
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
      <div>
        <Image alt={''} src={Logo} />
      </div>
      <div className={styles.userformwrapper}>
        <div className={styles.userform}>
          <p className={styles.title}>
            Update your profile photo and name to finalize account information
          </p>
          <CardContent>
            <Grid className={styles.uploadwrapper}>
              <input
                accept="image/png,image/jpeg/image/webp"
                className={styles.input}
                id="contained-button-file"
                onChange={handleUploadClick}
                type="file"
              />
              <label htmlFor="contained-button-file">
                <div className={styles.uploaddiv}>
                  {imageFile?.fileUrl ? (
                    <Image
                      alt={''}
                      src={imageFile?.fileUrl}
                      height={110}
                      width={110}
                    />
                  ) : (
                    <Image alt={''} src={Upload} />
                  )}
                </div>
              </label>
              <div className={styles.uploadtextwrapper}>
                <p className={styles.uploadtitle}>
                  {' '}
                  Click to upload profile photo
                </p>
                <p className={styles.graytext}>Less than 2GB </p>
                <p className={styles.graytext}>110x110 resolution or higher</p>
              </div>
            </Grid>
          </CardContent>
          <FormControl className={styles.formcontainer}>
            <FormLabel
              sx={{
                color: getThemeColor(),
                fontSize: '18px',
                paddingBottom: '5px',
              }}>
              Username
            </FormLabel>
            <Grid container direction="column" spacing={10}>
              <Grid item>
                <TextField
                  autoComplete="off"
                  autoFocus
                  name="username"
                  onChange={event => {
                    setUsername(event.target.value);
                  }}
                  placeholder="Username"
                  required
                  sx={{
                    width: '450px',
                    borderRadius: '4px',
                    border: `1px solid ${getThemeColor()}`,
                  }}
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <Button
                  className="button-block"
                  onClick={handleSubmit}
                  sx={{
                    width: '250px',
                    background: '#000000 !important',
                    border: '1px solid #000000',
                    borderRadius: '33px',
                    color: '#FFF',
                  }}
                  type="submit"
                  variant="contained">
                  Start hopping
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
