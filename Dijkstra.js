const readline = require('readline-sync');

const input = readline.question('Input: ').toString().split(' ');

let stack = new Array();
let top;
let result = "";
let priorityTable = {
	"^" : 2,
	"*" : 1,
	"/" : 1,
	"+" : 0,
	"-" : 0
}

for(i = 0; i < input.length; i++)
{
	if(input[i] == '(' )
		stack.push(input[i]);
	else if (input[i] == ')') //
	{
		top = "";
		while(true)
		{
			top = stack.pop();
			if(top == '(')
				break;
			result += (top + " ");
		}
	}
	else 
	{
		if(isNaN(+input[i]))// знак
		{
			top = stack.pop();
			if(!top)
				stack.push(input[i]);
			else
			{
				if(priorityTable[top] >= priorityTable[input[i]])
				{
					result += (top + " ");
					while(stack.length > 0)
					{
						result += (stack.pop() + " ");
					}
					stack.push(input[i]);
				}
				else
				{
					stack.push(top);
					stack.push(input[i]);
				}
			}
		}
		else 
		{
			if(input[i][input[i].length - 1] == "\n")
				result += (input[i].substr(0, input[i].length - 1) + " ");
			else
				result += (input[i] + " ");
		}
	}
}

while(stack.length > 0)
{
	result += stack.pop();
	if(stack.length != 0)
		result += " ";
}

console.log(result);

result = result.split(' ');

let first, second;

for (let i = 0; i < result.length; i++) {
	if (!isNaN(+result[i]))
	{
		stack.push(+result[i]);
	}
	else {
		first = stack.pop();
		second = stack.pop();
		if (result[i] == "+") stack.push(first + second);
		else if (result[i] == "-") stack.push(second - first);
		else if (result[i] == "*") stack.push(first * second);
		else if (result[i] == "/") stack.push(second / first);
		else stack.push(Math.pow(second, first));
	}
}
console.log("Result: " + stack.pop());