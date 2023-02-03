/* eslint-disable prettier/prettier */
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import styles from '../styles/Modal.module.scss';
import {
  CloseIcon,
  Hop3TokenIcon,
  ModalIcon2,
} from '../components/Icons/Icons';
import Button from '../components/Button';

interface Props {
  show: boolean;
  toggleShow: (toSet?: string) => void;
}

const Modal = ({ show, toggleShow }: Props) => {
  return (
    <>
      <div
        className={clsx(styles.overlay, show && styles.active)}
        onClick={() => toggleShow()}
      />{' '}
      <div className={clsx(styles.modal, show && styles.active)}>
        <ModalHeader toggleShow={toggleShow} show={show} />
        <ModalBody />

        <div className={styles.footer}>
          <Button variant="underline-text" onClick={() => toggleShow()}>
            Skip for Now
          </Button>
        </div>
      </div>
    </>
  );
};

const ModalHeader = (props: any) => {
  const { toggleShow, modelType, show } = props;

  return (
    <div className={styles.header}>
      <div className={styles.closeIcon} onClick={() => toggleShow()}>
        <CloseIcon onClick={() => toggleShow()} width={22} height={22} />
      </div>
    </div>
  );
};

const ModalBody = (props: any) => {
  const { toggleShow } = props;
  return (
    <div className={styles.body}>
      <div className={styles.contentLeft}>
        <ModalIcon2 />
      </div>
      <div className={styles.contentRight}>
        <div className={styles.contentTitle}>
          You just earned{' '}
          <span>
            <Hop3TokenIcon height={14.5} width={13.5} />2
          </span>{' '}
          !
        </div>
        <div className={styles.contentSubtitle}>
          We will notify you once your post get boosted
        </div>

        <p>More ways to earn:</p>

        <div className={styles.contentButtons}>
          <Button variant="default">
            Create a post <Hop3TokenIcon />
            100
          </Button>
          <Button variant="default">
            Invite a Friend
            <Hop3TokenIcon />
            50
          </Button>
          <Button variant="default">
            Complete Onboarding
            <Hop3TokenIcon />
            50
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
