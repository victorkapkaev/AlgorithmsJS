let fs = require('fs');
let arg = process.argv;
let input, result = "";
let n = 1, i = 0;

let mode = process.argv[2];
let FileInput = process.argv[3];
let FileOutput = process.argv[4];

input = fs.readFileSync(FileInput);
input = input.toString();
console.log("Input: " + input);

function encode(input)
{
	while(i < input.length)
	{
		while(input[i] == input[i+n])
			n++;
		jump = n;
		while(n > 127)
		{
			result = result + '#' + String.fromCharCode(127) + input[i];
			n -= 127;
		}
		if((n > 3) || (input[i] == '#'))
			result = result + '#' + String.fromCharCode(n) + input[i];
		else
			for(k = 0; k < n; k++)
				result += input[i];
		i += jump;
		n = 1;
	}
	console.log("Encoded: " + result);
	fs.writeFileSync(FileOutput, result);
}

function decode(input)
{
	while (i < input.length)
	{
		if(input[i] == '#')
		{
			var number = input.charCodeAt(i + 1);
			ch = input[i+2];
			for(k = 0; k < number; k++)
				result += ch;
			i += 3;
		}
		else
		{
			result += input[i];
			i++;
		}
		
	}
	console.log("Decode: " + result);
	fs.writeFileSync(FileOutput, result);
}

if(mode == "code")
	encode(input);
else if (mode == "decode")
	decode(input);
else
	console.log("Error!");