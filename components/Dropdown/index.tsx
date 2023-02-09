/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import InputLabel from '../InputLabel';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import styles from '../../styles/Dropdown.module.scss';

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
  multiple?: boolean;
  onSelect: (item: string) => void;
}

const Dropdown = ({
  id,
  label,
  required,
  placeholder,
  options,
  listType,
  multiple,
  onSelect,
}: Props) => {
  const inputRef = useRef<HTMLDivElement>(null);

  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [value, setValue] = useState('');
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    onSelect(selectedValues.join(', '));
  }, [selectedValues]);

  const toggleOptions = () => {
    setIsDropdownActive(prevState => !prevState);
  };

  const hideOptions = () => {
    setIsDropdownActive(false);
  };

  const onPressItem = useCallback(
    (item: string) => {
      if (!multiple) {
        setValue(item);
        setIsDropdownActive(false);
        onSelect && onSelect(item);
        return;
      }
      if (selectedValues.includes(item)) {
        setSelectedValues(prevState =>
          prevState.filter((subItem: any) => item !== subItem),
        );
      } else {
        setSelectedValues(prevState => [...prevState, item]);
      }
    },
    [multiple, selectedValues],
  );

  useOnClickOutside({ ref: inputRef, handler: hideOptions });
  console.log('Vlauess', value);
  return (
    <div className={styles.dropdown}>
      <InputLabel id={id} label={label} required={required} />

      <div
        className={clsx(styles.inputContainer, listType && styles.listType)}
        ref={inputRef}>
        <div
          className={clsx(styles.inputMain, isDropdownActive && styles.active)}>
          <div className={styles.input} onClick={toggleOptions}>
            {!multiple && value ? (
              <div className={styles.value}>{value}</div>
            ) : multiple && selectedValues.length ? (
              <div className={styles.value}>{selectedValues.join(', ')}</div>
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
            listType && styles.listType,
          )}>
          {options.map((el: Option, idx) => {
            return (
              <div
                key={'option' + idx}
                className={clsx(
                  styles.option,
                  ((!multiple && el.label === value) ||
                    (multiple && selectedValues.includes(el?.label))) &&
                    styles.active,
                )}
                onClick={() => onPressItem(el.label)}>
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
