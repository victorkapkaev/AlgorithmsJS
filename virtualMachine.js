// to run it, you must have in same directory file .txt with program. Then you need input this file name as arg in command line
const readline = require('readline-sync');
let arg = process.argv;
let fs = require('fs');
var memory = new Array(100);

let File = process.argv[2];

let program = fs.readFileSync(File);
program = program.toString();
var text = "";
var commands = new Array();
for(var i in program)
{
	if(program[i] != ' ' && program[i] != '\n' && program[i] != '\r')
		text+=program[i]
	else if (program[i] != '\r')
	{
		commands.push(text);
		text = "";
	}
}
commands.push(text);
commands.push('end');

let ip = 0;
var jne = new Boolean(false);
while(commands[ip] != 'end')
	switch(commands[ip])
	{
		case 'assign':
			memory[commands[ip+1]] = commands[ip+2];
			ip+=3;
			break;
		case 'set':
			memory[commands[ip+1]] = commands[ip+2];
			memory[commands[ip+1]*1 + 1] = (ip + 3);
			ip+=3;
			break;
		case 'input':
			var value = readline.question("Input variable: ");
			memory[commands[ip+1]] = value;
			ip+=2;
			break;
		case 'multiply':
			memory[commands[ip+3]] = memory[commands[ip+1]] * memory[commands[ip+2]];
			ip+=4;
			break;
		case 'decrement':
			memory[commands[ip+1]]--;
			ip+=2;
			break;
		case 'compare':
			if(memory[commands[ip+1]] != commands[ip+2])
				jne=true;
			else
				jne=false;
			ip+=3;
			break;
		case 'jumpNotEqual':
			if(jne == true)
				ip = memory[memory.indexOf(commands[ip+1])*1 + 1];
			else
				ip+=2;
			break;
		case 'output':
			console.log(memory[commands[ip+1]]);
			ip+=2;
			break;
		case 'mod':
			memory[commands[ip+3]] = memory[commands[ip+1]] % memory[commands[ip+2]];
			ip+=4;
			break;
		case 'swap':
		    var t = memory[commands[ip+1]];
			memory[commands[ip+1]] = memory[commands[ip+2]];
			memory[commands[ip+2]] = t;
			ip+=3;
			break;
	}
