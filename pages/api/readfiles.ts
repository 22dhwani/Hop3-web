import path from 'path';
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  routes: string[];
  error?: any;
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const dir = path.join(process.cwd(), '.next/server/pages');

    const filenames = fs.readdirSync(dir);
    // const files: string[] = [];
    console.log({ filenames });
    // filenames?.forEach(file => {
    //   if (
    //     (file?.includes('.tsx') || file?.includes('.html')) &&
    //     !file?.startsWith('_app') &&
    //     !file?.startsWith('login')
    //   ) {
    //     files.push(file?.split(file?.includes('.tsx') ? '.tsx' : '.html')?.[0]);
    //   }
    // });
    res.status(200).json({ routes: filenames });
  } catch (error: any) {
    res.json({ error: error?.stack, routes: [] });
  }
}
