import {EOL, cpus,homedir, userInfo, arch } from 'os';
export const os = async (command)=>{

  switch (command) {
    case '--EOL':
      console.log(JSON.stringify(EOL));
      break;
    case '--cpus':
      const cpu = cpus().map((cpu) => ({
        model: cpu.model,
        speed: `${cpu.speed} MHz`,
      }));
      console.log(`Total CPUs: ${cpu.length}`);
      console.log(cpu);
      break;
    case '--homedir':
      console.log(homedir());
      break;
    case '--username':
      console.log(userInfo().username);
      break;
    case '--architecture':
      console.log(arch());
      break;
      default: 
      console.log('Invalid input');
  }
}