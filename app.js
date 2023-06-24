
import readlinePromises from 'readline/promises';
import {pipeline} from 'stream/promises';
import {stdout, cwd, exit, chdir} from 'process';
import {EOL, homedir} from 'os';
import { commandReducer} from './commandReducer.js'
import os from 'os';

export async function app () {
  //console.log('this is app')
  //console.log(process.argv.slice(2)[0])
  //console.time('label');
  
  let userName = getUserName();
  if(!userName) throw new Error( 'noUser')
  chdir(homedir());
  stdout.write(`Welcome to the File Manager, ${userName}${EOL}${EOL}You are currently in ${cwd()}${EOL}`);
  function getUserName(){
    const string = process.argv.slice(2)[0];
    if(string && string.startsWith('--')){
        const userName =  string.split('=')[1];
        return userName;
      }
      return '';
  }

  const rl = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  /*rl.on('line', (line) => {
    commandReducer(line)
    //if (line === '.exit') {
    //  rl.close();
    //}
    
  });*/
  rl.on('line',async (line) => { await commandReducer(line)
    .catch((error)=>{ console.log('Operation failed')})
    .finally(()=> {console.log(`You are currently in ${cwd()}`);})
  });
  rl.on('error', () => {console.log ('error')});
  rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${userName} , goodbye!`);
    process.exit(0);
  });
  rl.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${userName} , goodbye!`);
    process.exit(0);
  });

  //process.stdin;
  //console.timeEnd('label');
  //await pipeline(process.stdin, process.stdout);

  //console.log(process.uptime());
}