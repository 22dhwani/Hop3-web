import React, { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";

import styles from "../../styles/ProfileUploader.module.scss";

interface Preview {
  preview: string;
}

const ProfileUploader = () => {
  const [files, setFiles] = useState<Preview[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(() => {
        return acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      });
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const thumbs = files.map((file, idx) => (
    <Image
      key={"image" + idx}
      src={file.preview}
      width={106}
      height={106}
      alt="upload-img"
      onLoad={() => {
        URL.revokeObjectURL(file.preview);
      }}
    />
  ));

  return (
    <div {...getRootProps({ className: clsx(styles.profileUploader) })}>
      <div className={styles.uploader}>
        <input {...getInputProps()} />
        {thumbs.length ? (
          thumbs[0]
        ) : (
          <Image
            width={24}
            height={24}
            src="/vectors/icons/uploader.svg"
            alt="uploader"
          />
        )}
      </div>
      <div className={styles.text}>
        <div className={styles.title}>Click to upload profile photo</div>
        <div className={clsx(styles.subTitle, "mb-6")}>Less than 2GB</div>
        <div className={styles.subTitle}>110x110 resolution or higher</div>
      </div>
    </div>
  );
};

export default ProfileUploader;
