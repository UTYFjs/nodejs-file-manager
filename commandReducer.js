import {EOL} from 'os'
import { stdout, stdin } from 'process';
import { up,cd, ls } from './commands/navigation.js';
import { os } from './commands/os.js';
import {calcHash} from './commands/hash.js';
import {compress, decompress} from './commands/compress.js';
import { cat, add, rn, cp,mv, remove } from './commands/files.js';

export const commandReducer = async (command = '') =>{
  const arrCommands = command.split(' ');
  try{
    switch (arrCommands[0]) {
      case '.exit':
        process.exit(0);
      case 'up':
        await up();
        break;
      case 'cd':
        await cd(arrCommands[1])
        break;
      case 'ls':
        await ls();
        break;
      case 'cat':
        await cat(arrCommands[1]);
        break;
      case 'add':
        await add(arrCommands[1]);
        break;
      case 'rn':
        await rn(arrCommands[1], arrCommands[2]);
        break;
      case 'cp':
        await cp(arrCommands[1], arrCommands[2]);
        break;
      case 'mv':
        await mv(arrCommands[1], arrCommands[2]);
        break;
      case 'rm':
        await remove(arrCommands[1]);
        break;
      case 'os':
        await os(arrCommands[1]);
        break;
      case 'hash':
        await calcHash(arrCommands[1])
        //.catch((err) => {console.log('Invalid input');});
        break;
      case 'compress':
        await compress(arrCommands[1], arrCommands[2]).catch((err)=> {console.log(err.message)});
        break;
      case 'decompress':
        await decompress(arrCommands[1], arrCommands[2]).catch((err) => {
          console.log(err.message);
        });
        break;
      case EOL:
        return EOL;
      default:
        console.log('Invalid input default switch');
    }
  }catch(err){
    console.log('из редьюсера', err.message);
    throw new Error(err.message);
  }
  
}