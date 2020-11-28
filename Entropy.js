const readline = require('readline-sync');

const str = readline.question("Input: ");

let sum = 0;
let n = 0;

table = {};
for(var i = 0; i < str.length; i++)
{
	ch = str.charAt(i);
	if(!table[ch]) 
	{
		table[ch] = 0;
		n++;
	}
	table[ch]++;
}

for(ch in table)
{
	if(n != 1)
	{
		sum += ((table[ch] / str.length) * ((Math.log(table[ch] / str.length) / Math.log(n))));
		console.log(ch + ": " + table[ch] / str.length);
	}
}
console.log("Result: " + -1 * sum);