/* eslint-disable prettier/prettier */
import Airtable from 'airtable';

const personalAccessToken =
  'patoegYXDw3iAuK6h.be8c0fb469e9db1f64007f1e6c461c16f332233f0e3b8123867d5c9b795ce082';

Airtable.configure({ apiKey: personalAccessToken });

export const baseShopCMS = Airtable.base('app6ldGCFVSkP9wtG');

export default Airtable;
