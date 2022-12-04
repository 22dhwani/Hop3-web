import React, {useCallback, useEffect, useState} from "react";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";

import InputLabel from "../InputLabel";
import Image from "next/image";
import styles from "../../styles/UploaderInput.module.scss";

interface Preview {
  preview: string;
  fileSize:number;
}

interface Props {
  className?: string;
  label: string;
  id: string;
  required?: boolean;
  onFilesSelected?: (files:any) => void;
  [x: string]: any;
}

const UploaderInput = ({
  required,
  className,
  label,
  id,
  textarea,
  onFilesSelected,
  ...rest
}: Props) => {
  const [files, setFiles] = useState<Preview[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
      maxFiles:5,
    accept: {
        'image/jpeg': [],
        'image/png': [],
        'image/webp': [],
        'video/mp4': [],
    },
    onDrop: (acceptedFiles) => {
      setFiles((prevstate) =>([...prevstate,...acceptedFiles.map((file) =>{
        return  {
              preview: URL.createObjectURL(file),
              fileSize: file.size,
              type: file.type,
              name: file.name,
              fileObj: file,
          }}
      )]));},

  });
  const onDeleteItem = useCallback((item: Preview)=>{
        setFiles((prevState => (prevState.filter(subItem => subItem.preview !== item.preview))))
  },[])


  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  useEffect(()=> {
      if (onFilesSelected) {
          onFilesSelected(files)
      }
  },[files])

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
      <div className={styles.delete} onClick={()=> onDeleteItem(file)}>Delete</div>
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
