import zlib from 'zlib';
import fs from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import { pipeline } from 'stream/promises';
import { checkFile, checkPath } from '../utils/files.js';


export const compress = async (pathFile ='', pathDestination='') =>{
  if (!pathFile || !pathDestination) throw new Error('Invalid input');


  try {
  const resolvePathFile = await checkFile(pathFile);
  const resolvePathDestination = resolve(cwd(), pathDestination);
  
  const readStream = fs.createReadStream(resolvePathFile);
  const writeStream = fs.createWriteStream(resolvePathDestination);
  const brotli = zlib.createBrotliCompress();

  pipeline(readStream, brotli, writeStream)
  //readStream.pipe(brotli).pipe(writeStream);    
  } catch (err) {
    throw new Error('Operation failed');
  }
}

export const decompress = async (pathFile='', pathDestination='') => {
  if(!pathFile || !pathDestination) throw new Error('Invalid input');
  try{
  const resolvePathFile = await checkFile(pathFile);
  const resolvePathDestination = resolve(cwd(), pathDestination);
  const readStream = fs.createReadStream(resolvePathFile);
  const writeStream = fs.createWriteStream(resolvePathDestination);
  const unBrotli = zlib.createBrotliDecompress();

  readStream.pipe(unBrotli).pipe(writeStream);
  }catch (err){
    throw new Error('Operation failed');
  }  
};