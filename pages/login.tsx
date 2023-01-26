import React, { useEffect } from 'react';
import Login from '../components/Login/Login';

import { baseShopCMS } from '../services/airtable';

const LoginPage = () => {
  useEffect(() => {
    baseShopCMS('Table 1')
      .select({
        // Select the first 3 records in Grid view:
        maxRecords: 3,
        view: 'Grid view',
      })
      .eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function (record) {
          console.log('Retrieved', record.get('Product Name'));
        });
      });
  }, []);

  return <Login />;
};

export default LoginPage;
