/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from '../../styles/DescriptionBox.module.scss';
import { Mention, MentionsInput } from 'react-mentions';
import { merge } from 'immutable';
import clsx from 'clsx';

interface Props {
  onValueSelect: (item: string) => void;
}

const users = [
  {
    id: 'walter',
    display: 'Walter White',
  },
  {
    id: 'pipilu',
    display: '皮皮鲁',
  },
  {
    id: 'luxixi',
    display: '鲁西西',
  },
  {
    id: 'satoshi1',
    display: '中本聪',
  },
  {
    id: 'satoshi2',
    display: 'サトシ・ナカモト',
  },
  {
    id: 'nobi',
    display: '野比のび太',
  },
  {
    id: 'sung',
    display: '성덕선',
  },
  {
    id: 'jesse',
    display: 'Jesse Pinkman',
  },
  {
    id: 'gus',
    display: 'Gustavo "Gus" Fring',
  },
  {
    id: 'saul',
    display: 'Saul Goodman',
  },
  {
    id: 'hank',
    display: 'Hank Schrader',
  },
  {
    id: 'skyler',
    display: 'Skyler White',
  },
  {
    id: 'mike',
    display: 'Mike Ehrmantraut',
  },
  {
    id: 'lydia',
    display: 'Lydìã Rôdarté-Qüayle',
  },
];
export const DescriptionBox = (props: Props) => {
  const [value, setValue] = useState('');
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  function fetchUsers(query: string, callback: any) {
    if (!query) {
      return;
    }
    callback([
      { id: query, display: query },
      ...users.filter(item => item.id.includes(query)),
    ]);
  }

  return (
    <MentionsInput
      value={value}
      onChange={handleChange}
      className={clsx(styles.container)}>
      <Mention
        trigger="#"
        data={fetchUsers}
        className={clsx(styles.mentions__mention)}
        displayTransform={(id: string, display: string) => `#${display}`}
      />
    </MentionsInput>
  );
};
