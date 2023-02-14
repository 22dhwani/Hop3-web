import React, { useEffect } from 'react';
import Login from '../components/Login/Login';

import { baseShopCMS } from '../services/airtable';
import { Client } from '@notionhq/client';
const LoginPage = ({ data }: any) => {
  useEffect(() => {
    console.log(data);
  }, []);

  return <Login />;
};

export const getStaticProps = async () => {
  const token = 'secret_cxJ7MEhil10WBl1w1mEIVIK7FmwwK1jYgs2HOfYEIzh';
  const notion = new Client({ auth: token });
  const data = await notion.databases.query({
    database_id: 'f6980531c1ac4e539a444771e819452d',
  });
  return {
    props: { data },
  };
};

export default LoginPage;
