import { createReadStream, createWriteStream } from 'fs';
import { rename, rm } from 'fs/promises';
import { pipeline} from 'stream/promises';
import { resolve, parse } from 'path';
import { cwd} from 'process';

export const cat = async (path) => {
  
  const readStream = createReadStream(path);
  readStream.on('data', (chunk)=> {
    console.log(chunk.toString());
  })

};

export const add = async (fileName) => {
  const resolvedPath = resolve(cwd(), fileName)
  const writeStream = createWriteStream(resolvedPath);
  writeStream.close();
};

export const rn = async (path, newFileName) => {
  console.log('заходит в rn');
  const pathResolved = resolve(cwd(), path);
  const pathDestResolved = resolve(cwd(), newFileName)
  await rename(path, pathDestResolved);
  console.log('выходит из rn');
};

export const cp = async (pathToFile, pathToNewDir) => {
  console.log('заходит в cp');
  const fileName = parse(pathToFile).base;
  const readStream = createReadStream(pathToFile);
  const writeStream = createWriteStream(resolve(pathToNewDir, fileName));
  await pipeline(readStream, writeStream);
  
  console.log('выходит из cp');
};

export const mv = async (pathToFile, pathToNewDir) => {
  await cp(pathToFile, pathToNewDir);
  await rm(pathToFile);

};

export const remove = async (path) => {
  await rm(path);

};
