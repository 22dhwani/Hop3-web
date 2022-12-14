import path from 'path';
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

type Data = {
  routes: string[];
  error?: any;
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const { serverRuntimeConfig } = getConfig();
    const dir = path.join(serverRuntimeConfig.PROJECT_ROOT, './pages');

    const filenames = fs.readdirSync(dir);
    const files: string[] = [];
    filenames?.forEach(file => {
      if (
        file?.includes('.tsx') &&
        !file?.startsWith('_app') &&
        !file?.startsWith('login')
      ) {
        files.push(file?.split('.tsx')?.[0]);
      }
    });
    console.log({ files });
    res.status(200).json({ routes: files });
  } catch (error: any) {
    res.json({ error: error?.stack, routes: [] });
  }
}
