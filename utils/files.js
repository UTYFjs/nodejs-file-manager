import {stat} from 'fs/promises';
import { sep, resolve, parse } from 'path';

export const checkPath = async (path) =>{
  try{
     const result = await stat(path);
     return true;
  } catch {
    return false
  }
  //const result = await stat(path).catch(()=> {throw new Error('invalid input')});
  //console.log('result after stat', result);
}

export const checkDirectory = async (path) =>{
  const isPath = await checkPath(path);
  if(isPath){
    const resolvedPath = resolve(path + sep);
    return resolvedPath;
  } else {throw new Error('Operation failed');}
  
}

export const checkFile = async (path) =>{
  const isPath = await checkPath(path);
  if (isPath) {
    const resolvedPath = resolve(process.cwd(), path);
    const parsedPath = parse(resolvedPath);
    if(parsedPath.base){
      return resolvedPath;
    }
    throw new Error('Operation failed');
  } else {
    throw new Error('Operation failed');
  }
  

}