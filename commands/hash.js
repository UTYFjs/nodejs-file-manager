import { readFile} from 'fs/promises';
import { checkFile } from '../utils/files.js';
import crypto from 'crypto';

export const calcHash =  async (path)=>{
   if (!path) throw new Error('Invalid input');
  const resolvedPath = await checkFile(path);
  const content = await readFile(resolvedPath);
  const hashResult = crypto.createHash('sha256').update(content).digest('hex');
  console.log(hashResult);
}