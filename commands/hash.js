import { readFile} from 'fs/promises';
import crypto from 'crypto';

export const calcHash =  async (path)=>{
  const content = await readFile(path)
  const hashResult = crypto.createHash('sha256').update(content).digest('hex');
  console.log(hashResult);

}