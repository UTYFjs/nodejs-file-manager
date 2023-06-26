import { createReadStream, createWriteStream } from 'fs';
import { rename, rm } from 'fs/promises';
import { pipeline} from 'stream/promises';
import { resolve, parse } from 'path';
import { cwd} from 'process';
import { checkFile, checkDirectory } from '../utils/files.js';

export const cat = async (path) => {
     if (!path) throw new Error('Invalid input');
  const resolvedPath = await checkFile(path);
  const readStream = createReadStream(resolvedPath);
  readStream.on('data', (chunk)=> {
    console.log(chunk.toString());
  })

};

export const add = async (fileName) => {
  if (!fileName) throw new Error('Invalid input');
  const resolvedPath = resolve(cwd(), fileName)
  const writeStream = createWriteStream(resolvedPath);
  writeStream.close();
};

export const rn = async (path, newFileName) => {
  if (!path || !newFileName) throw new Error('Invalid input');
  const resolvedPath = await checkFile(path);
  const pathDestResolved = resolve(cwd(), newFileName)
  await rename(resolvedPath, pathDestResolved);
};

export const cp = async (pathToFile, pathToNewDir) => {
  if (!pathToFile || !pathToNewDir) throw new Error('Invalid input');
  const resolvedPathToFile = await checkFile(pathToFile);
  const resolvedPathToNewDir = await checkDirectory(pathToNewDir);
  const fileName = parse(resolvedPathToFile).base;
  const readStream = createReadStream(resolvedPathToFile);
  const writeStream = createWriteStream(
    resolve(resolvedPathToNewDir, fileName)
  );
  await pipeline(readStream, writeStream);
};

export const mv = async (pathToFile, pathToNewDir) => {
  if (!pathToFile || !pathToNewDir) throw new Error('Invalid input');
  await cp(pathToFile, pathToNewDir);
  await rm(pathToFile);

};

export const remove = async (path) => {
  if (!path) throw new Error('Invalid input');
  const resolvedPath = await checkFile(path);
  await rm(resolvedPath);

};
