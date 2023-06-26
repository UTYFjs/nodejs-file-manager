import {chdir, cwd} from 'process';
import {resolve} from 'path';
import { readdir } from 'fs/promises';

export const  up = async () => {
  const newPath = resolve(cwd(), '..');
  process.chdir(newPath);
  //const path1 = cwd();
  //console.log('ghjdthrf up', path1);
}
export const ls = async () => {
  const path = cwd();
  const fileList = (await readdir(path, { withFileTypes: true}))
    .map((file) => ({Name: file.name, Type: file.isFile() ? 'file' : 'directory'}))
    
    fileList.sort((a, b) => {
      if (a.Type === b.Type) {
        return a.Name > b.Name ? 1 : -1;
      } else if ((a.Type = 'directory')) {
        return -1;
      } else {
        return 1;
      }
    });
  console.table(fileList);
}
export const cd = async (path='') => {
  const resolvedPath = resolve(path)
  const currentDirectory = cwd();
  const newPath = resolve(currentDirectory, resolvedPath);
  chdir(newPath);

};

/*.sort((a,b) => {if (a.Type === b.Type){ return a.Name > b.Name ? 1 :-1
    } else if (a.Type ='file'){ return -1} else {return 1}
  });*/