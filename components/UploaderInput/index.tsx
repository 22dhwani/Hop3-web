import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";

import InputLabel from "../InputLabel";
import Image from "next/image";
import styles from "../../styles/UploaderInput.module.scss";

interface Preview {
  preview: string;
}

interface Props {
  className?: string;
  label: string;
  id: string;
  required?: boolean;
  [x: string]: any;
}

const UploaderInput = ({
  required,
  className,
  label,
  id,
  textarea,
  ...rest
}: Props) => {
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
  }, []);

  const thumbs = files.map((file, idx) => (
    <div className={styles.previewWrap} key={"files" + idx}>
      <Image
        className={styles.preview}
        src={file.preview}
        width={102}
        height={102}
        alt="upload-img"
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
      <div className={styles.delete}>Delete</div>
    </div>
  ));

  return (
    <div className={clsx(styles.uploaderInput, styles.className)}>
      <InputLabel id={id} label={label} required={required} />
      <input {...getInputProps()} />

      <div className={styles.uploaderWrap}>
        {thumbs.length ? (
          <div className={styles.previews}>
            {thumbs}
            <div className={styles.miniUploader} {...getRootProps()}>
              <Image
                src="/vectors/icons/add.svg"
                alt="add"
                width={18}
                height={18}
              />
            </div>
          </div>
        ) : (
          <div className={styles.uploader} {...getRootProps()}>
            <div className={styles.title}>
              Drag and drop images or video here
            </div>
            <div className={styles.subTitle}>MP4, WebM, JPG or PNG</div>
            <div className={styles.subTitle}>Less than 2GB </div>
            <div className={styles.subTitle}>720x900 resolution or higher</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploaderInput;
