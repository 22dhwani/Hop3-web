import path from 'path';
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  routes: string[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const dir = path.join('./pages');

  const filenames = fs.readdirSync(dir);
  const files: string[] = [];
  filenames.forEach(file => {
    if (
      file.includes('.tsx') &&
      !file.startsWith('_app') &&
      !file.startsWith('login')
    ) {
      files.push(file.split('.tsx')[0]);
    }
  });
  console.log({ files });
  res.status(200).json({ routes: files });
}
