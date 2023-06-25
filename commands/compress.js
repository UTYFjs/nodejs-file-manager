import zlib from 'zlib';
import fs from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';


export const compress = async (pathFile ='', pathDestination='') =>{
  if (!pathFile || !pathDestination) throw new Error('Invalid input');


  try {
  const resolvePathFile = resolve(cwd(), pathFile);
  const resolvePathDestination = resolve(cwd(), pathDestination);
  const readStream = fs.createReadStream(resolvePathFile);
  const writeStream = fs.createWriteStream(resolvePathDestination);
  const brotli = zlib.createBrotliCompress();

  readStream.pipe(brotli).pipe(writeStream);    
  } catch (err) {
    throw new Error('Operation failed');
  }
}

export const decompress = async (pathFile='', pathDestination='') => {
  if(!pathFile || !pathDestination) throw new Error('Invalid input');
  try{
  const resolvePathFile = resolve(cwd(), pathFile);
  const resolvePathDestination = resolve(cwd(), pathDestination);
  const readStream = fs.createReadStream(resolvePathFile);
  const writeStream = fs.createWriteStream(resolvePathDestination);
  const unBrotli = zlib.createBrotliDecompress();

  readStream.pipe(unBrotli).pipe(writeStream);
  }catch (err){
    throw new Error('Operation failed');
  }

  
};