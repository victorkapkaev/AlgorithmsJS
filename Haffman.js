const readline = require('readline-sync');

const input = readline.question('Input: ');

function IsUsed(array)
{
	var count = 0;
	for(i = 0; i < array.length; i++)
	{
		if(array[i].used == false)
			count++;
	}
	if(count == 1)
		return true;
	return false;
}

function Node(text, count, used, left, right, code)
{
	this.text = text;
	this.count = count;
	this.used = used;
	this.left = left;
	this.right = right;
	this.code = code;
}

function travers(start, prefix, code)
{
	start.code = prefix + code;
	if(start.left == undefined)
		return;
	if(start.right == undefined)
		return;
	travers(start.left, start.code, '0');
	travers(start.right, start.code, '1');
}

function find(codes, value)
{
	for(key in codes)
		if(codes[key] == value)
			return key;
	return undefined;
}

let table = {}; //таблица частот
let tree = new Array();
for(var i = 0; i < input.length; i++)
{
	ch = input.charAt(i);
	if(!table[ch]) 
	{
		table[ch] = 0;
	}
	table[ch]++;
}
if(Object.keys(table).length > 1) {
	for(i in table)
	{
		let newNode = new Node(i, table[i], false, null, null, '');
		tree.push(newNode);
	}	
	while(!IsUsed(tree))
	{
		var min = 1000;
		for(var i = 0; i < tree.length - 1; i++)
		{
			for(var j = i + 1; j < tree.length; j++)
			{
				if(tree[i].count + tree[j].count < min && tree[i].used == false && tree[j].used == false)
				{
					min = tree[i].count + tree[j].count;
					var iIndex = i;
					var jIndex = j;
				}
			}
		}
		var child = new Node(tree[iIndex].text + tree[jIndex].text, tree[iIndex].count*1 + tree[jIndex].count*1, false, tree[iIndex], tree[jIndex], '');
		tree.push(child);
		tree[iIndex].used = true;
		tree[jIndex].used = true;
	}
	travers(child, "", "");
}
else
	for(i in table)
		tree.push(new Node(i, table[i], false, null, null, '0'));
	
codes = {}; // таблица кодов

for(i = 0; i < tree.length; i++)
{
	if(tree[i].text.length == 1)
	{
		if(!codes[tree[i].text]) 
		{
			codes[tree[i].text] = '0';
		}
		codes[tree[i].text] = tree[i].code
	}
}

for(var i in codes)
{
	console.log(i +  ": " + codes[i]);
}

let code = ""; // закодированное слово
for(i = 0; i < input.length; i++)
{
	code += codes[input[i]];
}

console.log("Code: " + code);

let current = "";
let decode = ""; // раскодированное слово
for(i = 0; i < code.length; i++)
{
	current += code[i];
	if(find(codes, current) != undefined)
	{
		decode += find(codes, current);
		current = "";
	}
}
console.log("Decoded: " + decode);