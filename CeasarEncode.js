// to run it, you must have in same directory file CeasarToCode.txt with text that you want to code.
let fs = require('fs');
const readline = require('readline-sync');

input = fs.readFileSync("CeasarToCode.txt");
input = input.toString().toLowerCase();

var alphabet = "abcdefghijklmnopqrstuvwxyz".split('');

let n = readline.question("Input a number: ");

var output = "";

for(i = 0; i < input.length; i++)
{
	if(alphabet.indexOf(input[i], 0) != -1)
		output += alphabet[(alphabet.indexOf(input[i], 0) + n*1) % 26];
	else
		output += input[i];
}
console.log("Done!");
fs.writeFileSync("CeasarCoded.txt", output);
