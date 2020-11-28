// to run it, you must have in same directory file CeasarCoded.txt with coded text
let fs = require('fs');
const readline = require('readline-sync');

input = fs.readFileSync("CeasarCoded.txt");
input = input.toString().toLowerCase();

var alphabet = "abcdefghijklmnopqrstuvwxyz".split('');

function xi(O, E)
{
	let sum = 0;
	for(i = 0; i < 26; i++)
	{
		if(E[String.fromCharCode(97 + i)] != 0)
			sum += ((O[String.fromCharCode(97 + i)] - E[String.fromCharCode(97 + i)]) 
			* (O[String.fromCharCode(97 + i)] - E[String.fromCharCode(97 + i)]) 
			/ (E[String.fromCharCode(97 + i)]))
	}
	return sum;
}

function GetTable(input, K)
{
	for(i = 0; i < input.length; i++)
	{
		if(input[i] >= 'a' && input[i] <= 'z')
		{
			K[input[i]]++;
		}
	}
	return K;
}

function Zero(E)
{
	for(i = 0; i < 26; i++)
		E[String.fromCharCode(97 + i)] = 0;
}

let O = {
	'a': 8.17 / 100,
	'b': 1.49 / 100,
	'c': 2.78 / 100,
	'd': 4.25 / 100,
	'e': 12.7 / 100,
	'f': 2.23 / 100,
	'g': 2.02 / 100,
	'h': 6.09 / 100,
	'i': 6.97 / 100,
	'j': 0.15 / 100,
	'k': 0.77 / 100,
	'l': 4.03 / 100,
	'm': 2.41 / 100,
	'n': 6.75 / 100,
	'o': 7.51 / 100,
	'p': 1.93 / 100,
	'q': 0.1 / 100,
	'r': 5.99 / 100,
	's': 6.33 / 100,
	't': 9.06 / 100,
	'u': 2.76 / 100,
	'v': 0.98 / 100,
	'w': 2.36 / 100,
	'x': 0.15 / 100,
	'y': 1.97 / 100,
	'z': 0.05 / 100
}

let E = {
	'a': 0,
	'b': 0,
	'c': 0,
	'd': 0,
	'e': 0,
	'f': 0,
	'g': 0,
	'h': 0,
	'i': 0,
	'j': 0,
	'k': 0,
	'l': 0,
	'm': 0,
	'n': 0,
	'o': 0,
	'p': 0,
	'q': 0,
	'r': 0,
	's': 0,
	't': 0,
	'u': 0,
	'v': 0,
	'w': 0,
	'x': 0,
	'y': 0,
	'z': 0
}

let min = 10;
let answer;

let output = "";
for(n = 1; n < 26; n++)
{
	for(i = 0; i < input.length; i++)
	{		
		if(alphabet.indexOf(input[i], 0) != -1)
			output += alphabet[(alphabet.indexOf(input[i], 0) + n*1) % 26];
		else
			output += input[i];
	}
	var K = GetTable(output, E);
	for(s in E)
	{
		E[s] = (E[s] / output.length);
	}
	console.log(xi(O, E) + "\t" + (26 - n) + "\t" + output);
	if(xi(O, E) < min) {
		min = xi(O, E);
		answer = 26 - n;
	}
	Zero(E)
	output = "";
}

console.log("Maybe it is " + answer + "?");

for(i = 0; i < input.length; i++)
{
	if(alphabet.indexOf(input[i], 0) != -1)
		output += alphabet[(26 + alphabet.indexOf(input[i], 0) - answer*1) % 26];
	else
		output += input[i];
}

console.log(output);
