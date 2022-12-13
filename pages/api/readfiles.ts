import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

const readfiles = (req: NextApiRequest, res: NextApiResponse) => {
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

  res.statusCode = 200;
  res.json(files);
};

export default readfiles;
