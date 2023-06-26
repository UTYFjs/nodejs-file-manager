
import readlinePromises from 'readline/promises';
import {stdout, cwd, chdir} from 'process';
import {EOL, homedir} from 'os';
import { commandReducer} from './commandReducer.js'


export async function app () {
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

  rl.on('line',async (line) => { await commandReducer(line)
    .catch((error)=>{ console.log(error.message)})
    .finally(()=> {console.log(`You are currently in ${cwd()}`);})
  });
  rl.on('error', () => {console.log ('error readline')});
  rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${userName} , goodbye!`);
    process.exit(0);
  });
  rl.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${userName} , goodbye!`);
    process.exit(0);
  });
}