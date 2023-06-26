import {chdir, cwd} from 'process';
import {resolve, normalize} from 'path';
import { readdir } from 'fs/promises';
import {checkDirectory} from '../utils/files.js';

export const  up = async () => {
  const newPath = resolve(cwd(), '..');
  process.chdir(newPath);
}
export const ls = async () => {
  const path = cwd();
  const fileList = (await readdir(path, { withFileTypes: true}))
    .map((file) => ({Name: file.name, Type: file.isDirectory() ? 'directory' : 'file'}))
    fileList.sort((a, b) => {
      if (a.Type == b.Type) {
        if(a.Name > b.Name){
          return 1;
        }
        if (a.Name < b.Name) {
          return -1;
        }
        return 0;
      } else {
          if (a.Type > b.Type){
            return 1
          }
          if (a.Type < b.Type){
            return -1
          }
          return 0;
      } 
    });
  console.table(fileList);
}
export const cd = async (path='') => {
  const pathDirectory = await checkDirectory(path);
  const currentDirectory = cwd();
  const newPath = resolve(currentDirectory, pathDirectory);
  chdir(newPath);
};

