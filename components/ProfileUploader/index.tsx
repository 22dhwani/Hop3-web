import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';

import styles from '../../styles/ProfileUploader.module.scss';
import Upload from '../../public/images/Upload.svg';

interface IProfileUploader {
  onChangeImage: (file: File) => void;
  url?: string;
}

const ProfileUploader = (props: IProfileUploader) => {
  const { url, onChangeImage } = props;
  const [imageFile, setImageFile] = useState<any>(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
    },
    multiple: false,
    onDrop: files => {
      const file = files[0];
      setImageFile({
        fileData: file,
        fileUrl: URL.createObjectURL(file),
      });
      onChangeImage && onChangeImage(file);
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => imageFile?.fileUrl && URL.revokeObjectURL(imageFile.fileUrl);
  }, [imageFile]);

  const fileUrl = imageFile?.fileUrl || url;

  return (
    <div {...getRootProps({ className: clsx(styles.profileUploader) })}>
      <div className={styles.uploader}>
        <input {...getInputProps()} />
        {fileUrl ? (
          <Image alt={''} src={fileUrl} height={110} width={110} />
        ) : (
          <Image alt={''} src={Upload} />
        )}
      </div>
      <div className={styles.text}>
        <div className={styles.title}>{`Click to ${
          fileUrl ? 'replace' : 'upload'
        } profile photo`}</div>
        <div className={clsx(styles.subTitle, 'mb-6')}>Less than 2GB</div>
        <div className={styles.subTitle}>110x110 resolution or higher</div>
      </div>
    </div>
  );
};

export default ProfileUploader;
