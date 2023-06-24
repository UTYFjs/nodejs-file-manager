import {EOL} from 'os'
import { stdout, stdin } from 'process';
import { up,cd, ls } from './commands/navigation.js';
import { os } from './commands/os.js';
import {calcHash} from './commands/hash.js';

export const commandReducer = async (command = '') =>{
  const arrCommands = command.split(' ');
  switch (arrCommands[0]) {
    case '.exit':
      process.exit(0);
    case 'up':
      await up();
      break;
    case 'cd':
      await cd(arrCommands[1]);
      break;
    case 'ls':
      await ls();
      break;
    case 'cat':
      console.log('cat');
      break;
    case 'add':
      console.log('add');
      break;
    case 'cd':
      console.log('cd');
      break;
    case 'rn':
      console.log('rn');
      break;
    case 'cp':
      console.log('cp');
      break;
    case 'mv':
      console.log('mv');
      break;
    case 'rm':
      console.log('rm');
      break;
    case 'os':
      await os(arrCommands[1]);
      break;
    case 'hash':
      await calcHash(arrCommands[1]).catch(()=>{ console.log('Invalid input')});
      break;
    case 'compress':
      console.log('compress');
      break;
    case 'decompress':
      console.log('decompress');
      break;
    case EOL:
      return EOL;
    default:
      
      console.log('Invalid input')
       //process.stdout.write(`Received: ${line}` + EOL);
      //break;
      //throw new Error(`Invalid input`);
      //stdout.write(`invalid input: ${command}` + EOL);
  }
}