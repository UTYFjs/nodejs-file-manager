import {stat} from 'fs/promises';
import { sep, resolve } from 'path';

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
  console.log('result ispath', isPath);
  if(isPath){
    const resolvedPath = resolve(path + sep);
    console.log('path with sep', resolvedPath);
    return resolvedPath;
  } else {throw new Error('Invalid Input');}
  
}