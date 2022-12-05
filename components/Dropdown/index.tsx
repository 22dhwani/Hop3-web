import React, { useState, useRef } from "react";
import Image from "next/image";
import clsx from "clsx";

import InputLabel from "../InputLabel";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import styles from "../../styles/Dropdown.module.scss";

interface Option {
  label: string;
}

interface Props {
  id: string;
  label: string;
  required?: boolean;
  placeholder: string;
  options: Option[];
  listType?: boolean;
}

const Dropdown = ({
  id,
  label,
  required,
  placeholder,
  options,
  listType,
}: Props) => {
  const inputRef = useRef<HTMLDivElement>(null);

  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [value, setValue] = useState("");

  const toggleOptions = () => {
    setIsDropdownActive((prevState) => !prevState);
  };

  const hideOptions = () => {
    setIsDropdownActive(false);
  };

  useOnClickOutside({ ref: inputRef, handler: hideOptions });

  return (
    <div className={styles.dropdown}>
      <InputLabel id={id} label={label} required={required} />

      <div className={clsx(styles.inputContainer, listType && styles.listType)}>
        <div
          className={clsx(styles.inputMain, isDropdownActive && styles.active)}
          ref={inputRef}
        >
          <div className={styles.input} onClick={toggleOptions}>
            {value ? (
              <div className={styles.value}>{value}</div>
            ) : (
              <div className={styles.placeholder}>{placeholder}</div>
            )}
            <Image
              className={styles.arrow}
              src="/vectors/icons/arrow.svg"
              width={18}
              height={18}
              alt="arrow"
            />
          </div>
        </div>
        <div
          className={clsx(
            styles.options,
            isDropdownActive && styles.active,
            listType && styles.listType
          )}
        >
          {options.map((el, idx) => {
            return (
              <div
                key={"option" + idx}
                className={clsx(
                  styles.option,
                  el.label === value && styles.active
                )}
                onClick={() => setValue(el.label)}
              >
                {el.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
