(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.t.dE === region.p.dE)
	{
		return 'on line ' + region.t.dE;
	}
	return 'on lines ' + region.t.dE + ' through ' + region.p.dE;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.jN,
		impl.k$,
		impl.kI,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$LT = 0;
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$GT = 2;
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.V) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder._),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder._);
		} else {
			var treeLen = builder.V * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.ac) : builder.ac;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.V);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder._) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder._);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{ac: nodeList, V: (len / $elm$core$Array$branchFactor) | 0, _: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $miniBill$elm_codec$Codec$decoder = function (_v0) {
	var m = _v0;
	return m.av;
};
var $miniBill$elm_codec$Codec$decodeValue = function (codec) {
	return $elm$json$Json$Decode$decodeValue(
		$miniBill$elm_codec$Codec$decoder(codec));
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $author$project$FigmaPlugin$escapeText = A2(
	$elm$core$Basics$composeR,
	A2($elm$core$String$replace, '\n', '\\n'),
	A2($elm$core$String$replace, '\"', '\\\"'));
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$FigmaPlugin$figmaOutput = _Platform_outgoingPort('figmaOutput', $elm$json$Json$Encode$string);
var $author$project$FigmaPlugin$EllipseNode_ = function (a) {
	return {$: 4, a: a};
};
var $author$project$FigmaPlugin$FrameNode = function (size) {
	return function (bottomLeftRadius) {
		return function (bottomRightRadius) {
			return function (topLeftRadius) {
				return function (topRightRadius) {
					return function (strokeWeight) {
						return function (strokes) {
							return function (fills) {
								return function (effects) {
									return function (x) {
										return function (y) {
											return function (paddingLeft) {
												return function (paddingRight) {
													return function (paddingTop) {
														return function (paddingBottom) {
															return function (children) {
																return function (visible) {
																	return function (itemSpacing) {
																		return function (layoutMode) {
																			return function (primaryAxisSizingMode) {
																				return function (counterAxisSizingMode) {
																					return function (layoutAlign) {
																						return function (layoutPositioning) {
																							return function (name) {
																								return function (primaryAxisAlignItems) {
																									return function (counterAxisAlignItems) {
																										return {aN: bottomLeftRadius, bJ: bottomRightRadius, bL: children, hp: counterAxisAlignItems, hq: counterAxisSizingMode, aR: effects, aX: fills, dC: itemSpacing, hO: layoutAlign, eS: layoutMode, hP: layoutPositioning, fZ: name, aF: paddingBottom, M: paddingLeft, aG: paddingRight, al: paddingTop, ik: primaryAxisAlignItems, il: primaryAxisSizingMode, o: size, a3: strokeWeight, bj: strokes, bX: topLeftRadius, bY: topRightRadius, r: visible, x: x, y: y};
																									};
																								};
																							};
																						};
																					};
																				};
																			};
																		};
																	};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$FigmaPlugin$FrameNode_ = function (a) {
	return {$: 2, a: a};
};
var $author$project$FigmaPlugin$GroupNode = F6(
	function (size, effects, x, y, children, visible) {
		return {bL: children, aR: effects, o: size, r: visible, x: x, y: y};
	});
var $author$project$FigmaPlugin$GroupNode_ = function (a) {
	return {$: 3, a: a};
};
var $author$project$FigmaPlugin$InstanceNode = function (size) {
	return function (name) {
		return function (bottomLeftRadius) {
			return function (bottomRightRadius) {
				return function (topLeftRadius) {
					return function (topRightRadius) {
						return function (strokeWeight) {
							return function (strokes) {
								return function (fills) {
									return function (effects) {
										return function (x) {
											return function (y) {
												return function (paddingLeft) {
													return function (paddingRight) {
														return function (paddingTop) {
															return function (paddingBottom) {
																return function (children) {
																	return function (visible) {
																		return function (itemSpacing) {
																			return function (layoutMode) {
																				return {aN: bottomLeftRadius, bJ: bottomRightRadius, bL: children, aR: effects, aX: fills, dC: itemSpacing, eS: layoutMode, fZ: name, aF: paddingBottom, M: paddingLeft, aG: paddingRight, al: paddingTop, o: size, a3: strokeWeight, bj: strokes, bX: topLeftRadius, bY: topRightRadius, r: visible, x: x, y: y};
																			};
																		};
																	};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$FigmaPlugin$InstanceNode_ = function (a) {
	return {$: 6, a: a};
};
var $author$project$FigmaPlugin$RectangleNode_ = function (a) {
	return {$: 1, a: a};
};
var $author$project$FigmaPlugin$TextNode_ = function (a) {
	return {$: 0, a: a};
};
var $author$project$FigmaPlugin$VectorNode_ = function (a) {
	return {$: 5, a: a};
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $author$project$FigmaPlugin$Auto = 0;
var $author$project$FigmaPlugin$Fixed = 1;
var $author$project$FigmaPlugin$allAxisSizingModes = _List_fromArray(
	[0, 1]);
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $miniBill$elm_codec$Codec$Codec = $elm$core$Basics$identity;
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $miniBill$elm_codec$Codec$encoder = function (_v0) {
	var m = _v0;
	return m.bO;
};
var $miniBill$elm_codec$Codec$andThen = F3(
	function (dec, enc, c) {
		return {
			av: A2(
				$elm$json$Json$Decode$andThen,
				A2($elm$core$Basics$composeR, dec, $miniBill$elm_codec$Codec$decoder),
				$miniBill$elm_codec$Codec$decoder(c)),
			bO: A2(
				$elm$core$Basics$composeL,
				$miniBill$elm_codec$Codec$encoder(c),
				enc)
		};
	});
var $author$project$FigmaPlugin$axisSizingModesToString = function (a) {
	if (!a) {
		return 'AUTO';
	} else {
		return 'FIXED';
	}
};
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $miniBill$elm_codec$Codec$fail = function (msg) {
	return {
		av: $elm$json$Json$Decode$fail(msg),
		bO: $elm$core$Basics$always($elm$json$Json$Encode$null)
	};
};
var $elm_community$list_extra$List$Extra$find = F2(
	function (predicate, list) {
		find:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var first = list.a;
				var rest = list.b;
				if (predicate(first)) {
					return $elm$core$Maybe$Just(first);
				} else {
					var $temp$predicate = predicate,
						$temp$list = rest;
					predicate = $temp$predicate;
					list = $temp$list;
					continue find;
				}
			}
		}
	});
var $miniBill$elm_codec$Codec$build = F2(
	function (encoder_, decoder_) {
		return {av: decoder_, bO: encoder_};
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $miniBill$elm_codec$Codec$string = A2($miniBill$elm_codec$Codec$build, $elm$json$Json$Encode$string, $elm$json$Json$Decode$string);
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $miniBill$elm_codec$Codec$succeed = function (default_) {
	return {
		av: $elm$json$Json$Decode$succeed(default_),
		bO: function (_v0) {
			return $elm$json$Json$Encode$null;
		}
	};
};
var $author$project$FigmaPlugin$axisSizingModesCodec = A3(
	$miniBill$elm_codec$Codec$andThen,
	function (text) {
		var _v0 = A2(
			$elm_community$list_extra$List$Extra$find,
			A2(
				$elm$core$Basics$composeR,
				$author$project$FigmaPlugin$axisSizingModesToString,
				$elm$core$Basics$eq(text)),
			$author$project$FigmaPlugin$allAxisSizingModes);
		if (!_v0.$) {
			var mode = _v0.a;
			return $miniBill$elm_codec$Codec$succeed(mode);
		} else {
			return $miniBill$elm_codec$Codec$fail(text + ' is an invalid layout align');
		}
	},
	$author$project$FigmaPlugin$axisSizingModesToString,
	$miniBill$elm_codec$Codec$string);
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$json$Json$Encode$bool = _Json_wrap;
var $miniBill$elm_codec$Codec$bool = A2($miniBill$elm_codec$Codec$build, $elm$json$Json$Encode$bool, $elm$json$Json$Decode$bool);
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var $miniBill$elm_codec$Codec$buildObject = function (_v0) {
	var om = _v0;
	return {
		av: om.av,
		bO: function (v) {
			return $elm$json$Json$Encode$object(
				om.bO(v));
		}
	};
};
var $author$project$FigmaPlugin$Effect = F6(
	function (color, offset, radius, spread, effectType, visible) {
		return {aO: color, gC: effectType, e0: offset, fa: radius, fe: spread, r: visible};
	});
var $miniBill$elm_codec$Codec$ObjectCodec = $elm$core$Basics$identity;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $miniBill$elm_codec$Codec$field = F4(
	function (name, getter, codec, _v0) {
		var ocodec = _v0;
		return {
			av: A3(
				$elm$json$Json$Decode$map2,
				F2(
					function (f, x) {
						return f(x);
					}),
				ocodec.av,
				A2(
					$elm$json$Json$Decode$field,
					name,
					$miniBill$elm_codec$Codec$decoder(codec))),
			bO: function (v) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(
						name,
						A2(
							$miniBill$elm_codec$Codec$encoder,
							codec,
							getter(v))),
					ocodec.bO(v));
			}
		};
	});
var $author$project$FigmaPlugin$FigmaColorWithAlpha = F4(
	function (red, green, blue, alpha) {
		return {ej: alpha, a6: blue, ba: green, bi: red};
	});
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm$json$Json$Encode$float = _Json_wrap;
var $miniBill$elm_codec$Codec$float = A2($miniBill$elm_codec$Codec$build, $elm$json$Json$Encode$float, $elm$json$Json$Decode$float);
var $elm$json$Json$Decode$map = _Json_map1;
var $miniBill$elm_codec$Codec$map = F3(
	function (go, back, codec) {
		return {
			av: A2(
				$elm$json$Json$Decode$map,
				go,
				$miniBill$elm_codec$Codec$decoder(codec)),
			bO: function (v) {
				return A2(
					$miniBill$elm_codec$Codec$encoder,
					codec,
					back(v));
			}
		};
	});
var $elm$core$Basics$round = _Basics_round;
var $author$project$FigmaPlugin$colorCodec = A3(
	$miniBill$elm_codec$Codec$map,
	A2(
		$elm$core$Basics$composeR,
		$elm$core$Basics$mul(255),
		$elm$core$Basics$round),
	A2(
		$elm$core$Basics$composeR,
		$elm$core$Basics$toFloat,
		$elm$core$Basics$mul(1 / 255)),
	$miniBill$elm_codec$Codec$float);
var $miniBill$elm_codec$Codec$object = function (ctor) {
	return {
		av: $elm$json$Json$Decode$succeed(ctor),
		bO: function (_v0) {
			return _List_Nil;
		}
	};
};
var $author$project$FigmaPlugin$figmaColorWithAlphaCodec = $miniBill$elm_codec$Codec$buildObject(
	A4(
		$miniBill$elm_codec$Codec$field,
		'a',
		function ($) {
			return $.ej;
		},
		$miniBill$elm_codec$Codec$float,
		A4(
			$miniBill$elm_codec$Codec$field,
			'b',
			function ($) {
				return $.a6;
			},
			$author$project$FigmaPlugin$colorCodec,
			A4(
				$miniBill$elm_codec$Codec$field,
				'g',
				function ($) {
					return $.ba;
				},
				$author$project$FigmaPlugin$colorCodec,
				A4(
					$miniBill$elm_codec$Codec$field,
					'r',
					function ($) {
						return $.bi;
					},
					$author$project$FigmaPlugin$colorCodec,
					$miniBill$elm_codec$Codec$object($author$project$FigmaPlugin$FigmaColorWithAlpha))))));
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$json$Json$Decode$maybe = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder),
				$elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing)
			]));
};
var $miniBill$elm_codec$Codec$maybeField = F4(
	function (name, getter, codec, _v0) {
		var ocodec = _v0;
		return {
			av: A3(
				$elm$json$Json$Decode$map2,
				F2(
					function (f, x) {
						return f(x);
					}),
				ocodec.av,
				$elm$json$Json$Decode$maybe(
					A2(
						$elm$json$Json$Decode$field,
						name,
						$miniBill$elm_codec$Codec$decoder(codec)))),
			bO: function (v) {
				var _v1 = getter(v);
				if (!_v1.$) {
					var present = _v1.a;
					return A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							name,
							A2($miniBill$elm_codec$Codec$encoder, codec, present)),
						ocodec.bO(v));
				} else {
					return ocodec.bO(v);
				}
			}
		};
	});
var $author$project$FigmaPlugin$offsetCodec = $miniBill$elm_codec$Codec$buildObject(
	A4(
		$miniBill$elm_codec$Codec$field,
		'y',
		function ($) {
			return $.y;
		},
		$miniBill$elm_codec$Codec$float,
		A4(
			$miniBill$elm_codec$Codec$field,
			'x',
			function ($) {
				return $.x;
			},
			$miniBill$elm_codec$Codec$float,
			$miniBill$elm_codec$Codec$object(
				F2(
					function (x, y) {
						return {x: x, y: y};
					})))));
var $author$project$FigmaPlugin$effectCodec = $miniBill$elm_codec$Codec$buildObject(
	A4(
		$miniBill$elm_codec$Codec$field,
		'visible',
		function ($) {
			return $.r;
		},
		$miniBill$elm_codec$Codec$bool,
		A4(
			$miniBill$elm_codec$Codec$field,
			'type',
			function ($) {
				return $.gC;
			},
			$miniBill$elm_codec$Codec$string,
			A4(
				$miniBill$elm_codec$Codec$field,
				'spread',
				function ($) {
					return $.fe;
				},
				$miniBill$elm_codec$Codec$float,
				A4(
					$miniBill$elm_codec$Codec$field,
					'radius',
					function ($) {
						return $.fa;
					},
					$miniBill$elm_codec$Codec$float,
					A4(
						$miniBill$elm_codec$Codec$field,
						'offset',
						function ($) {
							return $.e0;
						},
						$author$project$FigmaPlugin$offsetCodec,
						A4(
							$miniBill$elm_codec$Codec$maybeField,
							'color',
							function ($) {
								return $.aO;
							},
							$author$project$FigmaPlugin$figmaColorWithAlphaCodec,
							$miniBill$elm_codec$Codec$object($author$project$FigmaPlugin$Effect))))))));
var $author$project$FigmaPlugin$EllipseNode = F8(
	function (size, x, y, visible, strokeWeight, strokes, fills, effects) {
		return {aR: effects, aX: fills, o: size, a3: strokeWeight, bj: strokes, r: visible, x: x, y: y};
	});
var $author$project$FigmaPlugin$ImageFill_ = function (a) {
	return {$: 1, a: a};
};
var $author$project$FigmaPlugin$SolidFill_ = function (a) {
	return {$: 0, a: a};
};
var $author$project$FigmaPlugin$ImageFill = function (visible) {
	return {r: visible};
};
var $author$project$FigmaPlugin$imageFillCodec = $miniBill$elm_codec$Codec$buildObject(
	A4(
		$miniBill$elm_codec$Codec$field,
		'visible',
		function ($) {
			return $.r;
		},
		$miniBill$elm_codec$Codec$bool,
		$miniBill$elm_codec$Codec$object($author$project$FigmaPlugin$ImageFill)));
var $elm$json$Json$Encode$int = _Json_wrap;
var $author$project$FigmaPlugin$SolidFill = F3(
	function (color, opacity, visible) {
		return {aO: color, f$: opacity, r: visible};
	});
var $author$project$FigmaPlugin$FigmaColor = F3(
	function (red, green, blue) {
		return {a6: blue, ba: green, bi: red};
	});
var $author$project$FigmaPlugin$figmaColorCodec = $miniBill$elm_codec$Codec$buildObject(
	A4(
		$miniBill$elm_codec$Codec$field,
		'b',
		function ($) {
			return $.a6;
		},
		$author$project$FigmaPlugin$colorCodec,
		A4(
			$miniBill$elm_codec$Codec$field,
			'g',
			function ($) {
				return $.ba;
			},
			$author$project$FigmaPlugin$colorCodec,
			A4(
				$miniBill$elm_codec$Codec$field,
				'r',
				function ($) {
					return $.bi;
				},
				$author$project$FigmaPlugin$colorCodec,
				$miniBill$elm_codec$Codec$object($author$project$FigmaPlugin$FigmaColor)))));
var $author$project$FigmaPlugin$solidFillCodec = $miniBill$elm_codec$Codec$buildObject(
	A4(
		$miniBill$elm_codec$Codec$field,
		'visible',
		function ($) {
			return $.r;
		},
		$miniBill$elm_codec$Codec$bool,
		A4(
			$miniBill$elm_codec$Codec$field,
			'opacity',
			function ($) {
				return $.f$;
			},
			$miniBill$elm_codec$Codec$float,
			A4(
				$miniBill$elm_codec$Codec$field,
				'color',
				function ($) {
					return $.aO;
				},
				$author$project$FigmaPlugin$figmaColorCodec,
				$miniBill$elm_codec$Codec$object($author$project$FigmaPlugin$SolidFill)))));
var $author$project$FigmaPlugin$fillCodec = A2(
	$miniBill$elm_codec$Codec$build,
	function (_v0) {
		return $elm$json$Json$Encode$int(0);
	},
	A2(
		$elm$json$Json$Decode$andThen,
		function (fillType) {
			switch (fillType) {
				case 'IMAGE':
					return A2(
						$elm$json$Json$Decode$map,
						$author$project$FigmaPlugin$ImageFill_,
						$miniBill$elm_codec$Codec$decoder($author$project$FigmaPlugin$imageFillCodec));
				case 'SOLID':
					return A2(
						$elm$json$Json$Decode$map,
						$author$project$FigmaPlugin$SolidFill_,
						$miniBill$elm_codec$Codec$decoder($author$project$FigmaPlugin$solidFillCodec));
				default:
					return $elm$json$Json$Decode$fail(fillType + ' is not a valid fill type');
			}
		},
		A2($elm$json$Json$Decode$field, 'type', $elm$json$Json$Decode$string)));
var $author$project$FigmaPlugin$lenientIntCodec = A3($miniBill$elm_codec$Codec$map, $elm$core$Basics$round, $elm$core$Basics$toFloat, $miniBill$elm_codec$Codec$float);
var $ianmackenzie$elm_units$Quantity$Quantity = $elm$core$Basics$identity;
var $ianmackenzie$elm_units$Quantity$unsafe = function (value) {
	return value;
};
var $ianmackenzie$elm_units$Quantity$unwrap = function (_v0) {
	var value = _v0;
	return value;
};
var $author$project$FigmaPlugin$lenientIntQuantityCodec = A3(
	$miniBill$elm_codec$Codec$map,
	A2($elm$core$Basics$composeR, $elm$core$Basics$round, $ianmackenzie$elm_units$Quantity$unsafe),
	A2($elm$core$Basics$composeR, $ianmackenzie$elm_units$Quantity$unwrap, $elm$core$Basics$toFloat),
	$miniBill$elm_codec$Codec$float);
var $miniBill$elm_codec$Codec$composite = F3(
	function (enc, dec, _v0) {
		var codec = _v0;
		return {
			av: dec(codec.av),
			bO: enc(codec.bO)
		};
	});
var $elm$json$Json$Decode$list = _Json_decodeList;
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var $miniBill$elm_codec$Codec$list = A2($miniBill$elm_codec$Codec$composite, $elm$json$Json$Encode$list, $elm$json$Json$Decode$list);
var $author$project$FigmaPlugin$Stroke = F2(
	function (color, opacity) {
		return {aO: color, f$: opacity};
	});
var $author$project$FigmaPlugin$strokeCodec = $miniBill$elm_codec$Codec$buildObject(
	A4(
		$miniBill$elm_codec$Codec$field,
		'opacity',
		function ($) {
			return $.f$;
		},
		$miniBill$elm_codec$Codec$float,
		A4(
			$miniBill$elm_codec$Codec$field,
			'color',
			function ($) {
				return $.aO;
			},
			$author$project$FigmaPlugin$figmaColorCodec,
			$miniBill$elm_codec$Codec$object($author$project$FigmaPlugin$Stroke))));
var $author$project$FigmaPlugin$ellipseNodeCodec = $miniBill$elm_codec$Codec$buildObject(
	A4(
		$miniBill$elm_codec$Codec$field,
		'effects',
		function ($) {
			return $.aR;
		},
		$miniBill$elm_codec$Codec$list($author$project$FigmaPlugin$effectCodec),
		A4(
			$miniBill$elm_codec$Codec$field,
			'fills',
			function ($) {
				return $.aX;
			},
			$miniBill$elm_codec$Codec$list($author$project$FigmaPlugin$fillCodec),
			A4(
				$miniBill$elm_codec$Codec$field,
				'strokes',
				function ($) {
					return $.bj;
				},
				$miniBill$elm_codec$Codec$list($author$project$FigmaPlugin$strokeCodec),
				A4(
					$miniBill$elm_codec$Codec$field,
					'strokeWeight',
					function ($) {
						return $.a3;
					},
					$author$project$FigmaPlugin$lenientIntCodec,
					A4(
						$miniBill$elm_codec$Codec$field,
						'visible',
						function ($) {
							return $.r;
						},
						$miniBill$elm_codec$Codec$bool,
						A4(
							$miniBill$elm_codec$Codec$field,
							'y',
							function ($) {
								return $.y;
							},
							$author$project$FigmaPlugin$lenientIntCodec,
							A4(
								$miniBill$elm_codec$Codec$field,
								'x',
								function ($) {
									return $.x;
								},
								$author$project$FigmaPlugin$lenientIntCodec,
								A4(
									$miniBill$elm_codec$Codec$field,
									'height',
									function (a) {
										return a.o.T;
									},
									$author$project$FigmaPlugin$lenientIntQuantityCodec,
									A4(
										$miniBill$elm_codec$Codec$field,
										'width',
										function (a) {
											return a.o.P;
										},
										$author$project$FigmaPlugin$lenientIntQuantityCodec,
										$miniBill$elm_codec$Codec$object(
											F2(
												function (a, b) {
													return $author$project$FigmaPlugin$EllipseNode(
														{T: b, P: a});
												}))))))))))));
var $author$project$FigmaPlugin$Left = 0;
var $author$project$FigmaPlugin$Right = 2;
var $author$project$FigmaPlugin$Center = 1;
var $author$project$FigmaPlugin$SpaceBetween = 3;
var $author$project$FigmaPlugin$allItemAligns = _List_fromArray(
	[0, 1, 2, 3]);
var $author$project$FigmaPlugin$itemAlignToString = function (a) {
	switch (a) {
		case 0:
			return 'LEFT';
		case 1:
			return 'CENTER';
		case 2:
			return 'RIGHT';
		default:
			return 'SPACE_BETWEEN';
	}
};
var $author$project$FigmaPlugin$itemAlignCodec = A3(
	$miniBill$elm_codec$Codec$andThen,
	function (text) {
		if (text === 'MIN') {
			return $miniBill$elm_codec$Codec$succeed(0);
		} else {
			if (text === 'MAX') {
				return $miniBill$elm_codec$Codec$succeed(2);
			} else {
				var _v0 = A2(
					$elm_community$list_extra$List$Extra$find,
					A2(
						$elm$core$Basics$composeR,
						$author$project$FigmaPlugin$itemAlignToString,
						$elm$core$Basics$eq(text)),
					$author$project$FigmaPlugin$allItemAligns);
				if (!_v0.$) {
					var mode = _v0.a;
					return $miniBill$elm_codec$Codec$succeed(mode);
				} else {
					return $miniBill$elm_codec$Codec$fail(text + ' is an invalid layout mode');
				}
			}
		}
	},
	$author$project$FigmaPlugin$itemAlignToString,
	$miniBill$elm_codec$Codec$string);
var $author$project$FigmaPlugin$Inherit = 0;
var $author$project$FigmaPlugin$Stretch = 1;
var $author$project$FigmaPlugin$allLayoutAligns = _List_fromArray(
	[0, 1]);
var $author$project$FigmaPlugin$layoutAlignToString = function (a) {
	if (!a) {
		return 'INHERIT';
	} else {
		return 'STRETCH';
	}
};
var $author$project$FigmaPlugin$layoutAlignCodec = A3(
	$miniBill$elm_codec$Codec$andThen,
	function (text) {
		var _v0 = A2(
			$elm_community$list_extra$List$Extra$find,
			A2(
				$elm$core$Basics$composeR,
				$author$project$FigmaPlugin$layoutAlignToString,
				$elm$core$Basics$eq(text)),
			$author$project$FigmaPlugin$allLayoutAligns);
		if (!_v0.$) {
			var mode = _v0.a;
			return $miniBill$elm_codec$Codec$succeed(mode);
		} else {
			return $miniBill$elm_codec$Codec$fail(text + ' is an invalid layout align');
		}
	},
	$author$project$FigmaPlugin$layoutAlignToString,
	$miniBill$elm_codec$Codec$string);
var $author$project$FigmaPlugin$Horizontal = 0;
var $author$project$FigmaPlugin$NoLayoutMode = 2;
var $author$project$FigmaPlugin$Vertical = 1;
var $author$project$FigmaPlugin$allLayoutModes = _List_fromArray(
	[0, 1, 2]);
var $author$project$FigmaPlugin$layoutModeToString = function (mode) {
	switch (mode) {
		case 0:
			return 'HORIZONTAL';
		case 1:
			return 'VERTICAL';
		default:
			return 'NONE';
	}
};
var $author$project$FigmaPlugin$layoutModeCodec = A3(
	$miniBill$elm_codec$Codec$andThen,
	function (text) {
		var _v0 = A2(
			$elm_community$list_extra$List$Extra$find,
			A2(
				$elm$core$Basics$composeR,
				$author$project$FigmaPlugin$layoutModeToString,
				$elm$core$Basics$eq(text)),
			$author$project$FigmaPlugin$allLayoutModes);
		if (!_v0.$) {
			var mode = _v0.a;
			return $miniBill$elm_codec$Codec$succeed(mode);
		} else {
			return $miniBill$elm_codec$Codec$fail(text + ' is an invalid layout mode');
		}
	},
	$author$project$FigmaPlugin$layoutModeToString,
	$miniBill$elm_codec$Codec$string);
var $elm$json$Json$Decode$lazy = function (thunk) {
	return A2(
		$elm$json$Json$Decode$andThen,
		thunk,
		$elm$json$Json$Decode$succeed(0));
};
var $miniBill$elm_codec$Codec$lazy = function (f) {
	return {
		av: $elm$json$Json$Decode$lazy(
			function (_v0) {
				return $miniBill$elm_codec$Codec$decoder(
					f(0));
			}),
		bO: function (v) {
			return A2(
				$miniBill$elm_codec$Codec$encoder,
				f(0),
				v);
		}
	};
};
var $author$project$FigmaPlugin$RectangleNode = function (size) {
	return function (bottomLeftRadius) {
		return function (bottomRightRadius) {
			return function (topLeftRadius) {
				return function (topRightRadius) {
					return function (strokeWeight) {
						return function (strokes) {
							return function (fills) {
								return function (effects) {
									return function (x) {
										return function (y) {
											return function (visible) {
												return {aN: bottomLeftRadius, bJ: bottomRightRadius, aR: effects, aX: fills, o: size, a3: strokeWeight, bj: strokes, bX: topLeftRadius, bY: topRightRadius, r: visible, x: x, y: y};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$FigmaPlugin$rectangleNodeCodec = $miniBill$elm_codec$Codec$buildObject(
	A4(
		$miniBill$elm_codec$Codec$field,
		'visible',
		function ($) {
			return $.r;
		},
		$miniBill$elm_codec$Codec$bool,
		A4(
			$miniBill$elm_codec$Codec$field,
			'y',
			function ($) {
				return $.y;
			},
			$author$project$FigmaPlugin$lenientIntCodec,
			A4(
				$miniBill$elm_codec$Codec$field,
				'x',
				function ($) {
					return $.x;
				},
				$author$project$FigmaPlugin$lenientIntCodec,
				A4(
					$miniBill$elm_codec$Codec$field,
					'effects',
					function ($) {
						return $.aR;
					},
					$miniBill$elm_codec$Codec$list($author$project$FigmaPlugin$effectCodec),
					A4(
						$miniBill$elm_codec$Codec$field,
						'fills',
						function ($) {
							return $.aX;
						},
						$miniBill$elm_codec$Codec$list($author$project$FigmaPlugin$fillCodec),
						A4(
							$miniBill$elm_codec$Codec$field,
							'strokes',
							function ($) {
								return $.bj;
							},
							$miniBill$elm_codec$Codec$list($author$project$FigmaPlugin$strokeCodec),
							A4(
								$miniBill$elm_codec$Codec$field,
								'strokeWeight',
								function ($) {
									return $.a3;
								},
								$author$project$FigmaPlugin$lenientIntCodec,
								A4(
									$miniBill$elm_codec$Codec$field,
									'topRightRadius',
									function ($) {
										return $.bY;
									},
									$author$project$FigmaPlugin$lenientIntCodec,
									A4(
										$miniBill$elm_codec$Codec$field,
										'topLeftRadius',
										function ($) {
											return $.bX;
										},
										$author$project$FigmaPlugin$lenientIntCodec,
										A4(
											$miniBill$elm_codec$Codec$field,
											'bottomRightRadius',
											function ($) {
												return $.bJ;
											},
											$author$project$FigmaPlugin$lenientIntCodec,
											A4(
												$miniBill$elm_codec$Codec$field,
												'bottomLeftRadius',
												function ($) {
													return $.aN;
												},
												$author$project$FigmaPlugin$lenientIntCodec,
												A4(
													$miniBill$elm_codec$Codec$field,
													'height',
													function (a) {
														return a.o.T;
													},
													$author$project$FigmaPlugin$lenientIntQuantityCodec,
													A4(
														$miniBill$elm_codec$Codec$field,
														'width',
														function (a) {
															return a.o.P;
														},
														$author$project$FigmaPlugin$lenientIntQuantityCodec,
														$miniBill$elm_codec$Codec$object(
															F2(
																function (a, b) {
																	return $author$project$FigmaPlugin$RectangleNode(
																		{T: b, P: a});
																}))))))))))))))));
var $author$project$FigmaPlugin$TextNode = function (strokeWeight) {
	return function (strokes) {
		return function (effects) {
			return function (fills) {
				return function (text) {
					return function (fontName) {
						return function (fontSize) {
							return function (textDecoration) {
								return function (horizontalAlignment) {
									return function (x) {
										return function (y) {
											return function (width) {
												return function (height) {
													return function (visible) {
														return function (lineHeight) {
															return {aR: effects, aX: fills, gG: fontName, fP: fontSize, T: height, gL: horizontalAlignment, gR: lineHeight, a3: strokeWeight, bj: strokes, ec: text, iA: textDecoration, r: visible, P: width, x: x, y: y};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$FigmaPlugin$FontName = F2(
	function (family, style) {
		return {hw: family, g5: style};
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $author$project$FigmaPlugin$Bold = 4;
var $author$project$FigmaPlugin$ExtraBold = 5;
var $author$project$FigmaPlugin$Hairline = 0;
var $author$project$FigmaPlugin$Heavy = 6;
var $author$project$FigmaPlugin$Medium = 2;
var $author$project$FigmaPlugin$Regular = 1;
var $author$project$FigmaPlugin$SemiBold = 3;
var $author$project$FigmaPlugin$weights = _List_fromArray(
	[
		_Utils_Tuple2('Hairline', 0),
		_Utils_Tuple2('Regular', 1),
		_Utils_Tuple2('Medium', 2),
		_Utils_Tuple2('Semi Bold', 3),
		_Utils_Tuple2('Bold', 4),
		_Utils_Tuple2('Extra Bold', 5),
		_Utils_Tuple2('Heavy', 6)
	]);
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$FigmaPlugin$fontStyleCodec = A3(
	$miniBill$elm_codec$Codec$andThen,
	function (text) {
		var _v0 = A2(
			$elm_community$list_extra$List$Extra$find,
			A2(
				$elm$core$Basics$composeR,
				$elm$core$Tuple$first,
				$elm$core$Basics$eq(text)),
			$author$project$FigmaPlugin$weights);
		if (!_v0.$) {
			var _v1 = _v0.a;
			var weight = _v1.b;
			return $miniBill$elm_codec$Codec$succeed(weight);
		} else {
			return $miniBill$elm_codec$Codec$fail(text + ' is not a recognized font style');
		}
	},
	function (weight) {
		return A2(
			$elm$core$Maybe$withDefault,
			'Regular',
			A2(
				$elm$core$Maybe$map,
				$elm$core$Tuple$first,
				A2(
					$elm_community$list_extra$List$Extra$find,
					A2(
						$elm$core$Basics$composeR,
						$elm$core$Tuple$second,
						$elm$core$Basics$eq(weight)),
					$author$project$FigmaPlugin$weights)));
	},
	$miniBill$elm_codec$Codec$string);
var $author$project$FigmaPlugin$fontNameCodec = $miniBill$elm_codec$Codec$buildObject(
	A4(
		$miniBill$elm_codec$Codec$field,
		'style',
		function ($) {
			return $.g5;
		},
		$author$project$FigmaPlugin$fontStyleCodec,
		A4(
			$miniBill$elm_codec$Codec$field,
			'family',
			function ($) {
				return $.hw;
			},
			$miniBill$elm_codec$Codec$string,
			$miniBill$elm_codec$Codec$object($author$project$FigmaPlugin$FontName))));
var $author$project$FigmaPlugin$AutoLineHeight = {$: 0};
var $author$project$FigmaPlugin$PixelLineHeight = function (a) {
	return {$: 1, a: a};
};
var $author$project$FigmaPlugin$lineHeightCodec = A2(
	$miniBill$elm_codec$Codec$build,
	function (lineHeight) {
		if (!lineHeight.$) {
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'unit',
						$elm$json$Json$Encode$string('AUTO'))
					]));
		} else {
			var px = lineHeight.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'unit',
						$elm$json$Json$Encode$string('PIXELS')),
						_Utils_Tuple2(
						'value',
						$elm$json$Json$Encode$int(px))
					]));
		}
	},
	A2(
		$elm$json$Json$Decode$andThen,
		function (unit) {
			switch (unit) {
				case 'AUTO':
					return $elm$json$Json$Decode$succeed($author$project$FigmaPlugin$AutoLineHeight);
				case 'PIXELS':
					return A2(
						$elm$json$Json$Decode$map,
						$author$project$FigmaPlugin$PixelLineHeight,
						A2(
							$elm$json$Json$Decode$field,
							'value',
							$miniBill$elm_codec$Codec$decoder($author$project$FigmaPlugin$lenientIntCodec)));
				default:
					return $elm$json$Json$Decode$fail('Invalid unit \"' + (unit + '\"'));
			}
		},
		A2($elm$json$Json$Decode$field, 'unit', $elm$json$Json$Decode$string)));
var $author$project$FigmaPlugin$mixedTextCodec = function (codec) {
	return A2(
		$miniBill$elm_codec$Codec$build,
		function (maybe) {
			if (!maybe.$) {
				var a = maybe.a;
				return A2($miniBill$elm_codec$Codec$encoder, codec, a);
			} else {
				return $elm$json$Json$Encode$null;
			}
		},
		$elm$json$Json$Decode$maybe(
			$miniBill$elm_codec$Codec$decoder(codec)));
};
var $author$project$FigmaPlugin$textNodeCodec = $miniBill$elm_codec$Codec$buildObject(
	A4(
		$miniBill$elm_codec$Codec$field,
		'lineHeight',
		function ($) {
			return $.gR;
		},
		$author$project$FigmaPlugin$lineHeightCodec,
		A4(
			$miniBill$elm_codec$Codec$field,
			'visible',
			function ($) {
				return $.r;
			},
			$miniBill$elm_codec$Codec$bool,
			A4(
				$miniBill$elm_codec$Codec$field,
				'height',
				function ($) {
					return $.T;
				},
				$author$project$FigmaPlugin$lenientIntCodec,
				A4(
					$miniBill$elm_codec$Codec$field,
					'width',
					function ($) {
						return $.P;
					},
					$author$project$FigmaPlugin$lenientIntCodec,
					A4(
						$miniBill$elm_codec$Codec$field,
						'y',
						function ($) {
							return $.y;
						},
						$author$project$FigmaPlugin$lenientIntCodec,
						A4(
							$miniBill$elm_codec$Codec$field,
							'x',
							function ($) {
								return $.x;
							},
							$author$project$FigmaPlugin$lenientIntCodec,
							A4(
								$miniBill$elm_codec$Codec$field,
								'textAlignHorizontal',
								function ($) {
									return $.gL;
								},
								$author$project$FigmaPlugin$itemAlignCodec,
								A4(
									$miniBill$elm_codec$Codec$field,
									'textDecoration',
									function ($) {
										return $.iA;
									},
									$miniBill$elm_codec$Codec$string,
									A4(
										$miniBill$elm_codec$Codec$field,
										'fontSize',
										function ($) {
											return $.fP;
										},
										$author$project$FigmaPlugin$mixedTextCodec($author$project$FigmaPlugin$lenientIntCodec),
										A4(
											$miniBill$elm_codec$Codec$field,
											'fontName',
											function ($) {
												return $.gG;
											},
											$author$project$FigmaPlugin$mixedTextCodec($author$project$FigmaPlugin$fontNameCodec),
											A4(
												$miniBill$elm_codec$Codec$field,
												'characters',
												function ($) {
													return $.ec;
												},
												$miniBill$elm_codec$Codec$string,
												A4(
													$miniBill$elm_codec$Codec$field,
													'fills',
													function ($) {
														return $.aX;
													},
													$author$project$FigmaPlugin$mixedTextCodec(
														$miniBill$elm_codec$Codec$list($author$project$FigmaPlugin$solidFillCodec)),
													A4(
														$miniBill$elm_codec$Codec$field,
														'effects',
														function ($) {
															return $.aR;
														},
														$miniBill$elm_codec$Codec$list($author$project$FigmaPlugin$effectCodec),
														A4(
															$miniBill$elm_codec$Codec$field,
															'strokes',
															function ($) {
																return $.bj;
															},
															$miniBill$elm_codec$Codec$list($author$project$FigmaPlugin$strokeCodec),
															A4(
																$miniBill$elm_codec$Codec$field,
																'strokeWeight',
																function ($) {
																	return $.a3;
																},
																$author$project$FigmaPlugin$lenientIntCodec,
																$miniBill$elm_codec$Codec$object($author$project$FigmaPlugin$TextNode)))))))))))))))));
var $author$project$FigmaPlugin$VectorNode = function (visible) {
	return {r: visible};
};
var $author$project$FigmaPlugin$vectorNodeCodec = $miniBill$elm_codec$Codec$buildObject(
	A4(
		$miniBill$elm_codec$Codec$field,
		'visible',
		function ($) {
			return $.r;
		},
		$miniBill$elm_codec$Codec$bool,
		$miniBill$elm_codec$Codec$object($author$project$FigmaPlugin$VectorNode)));
function $author$project$FigmaPlugin$cyclic$frameNodeCodec() {
	return $miniBill$elm_codec$Codec$buildObject(
		A4(
			$miniBill$elm_codec$Codec$field,
			'counterAxisAlignItems',
			function ($) {
				return $.hp;
			},
			$author$project$FigmaPlugin$itemAlignCodec,
			A4(
				$miniBill$elm_codec$Codec$field,
				'primaryAxisAlignItems',
				function ($) {
					return $.ik;
				},
				$author$project$FigmaPlugin$itemAlignCodec,
				A4(
					$miniBill$elm_codec$Codec$field,
					'name',
					function ($) {
						return $.fZ;
					},
					$miniBill$elm_codec$Codec$string,
					A4(
						$miniBill$elm_codec$Codec$maybeField,
						'layoutPositioning',
						function ($) {
							return $.hP;
						},
						$author$project$FigmaPlugin$layoutAlignCodec,
						A4(
							$miniBill$elm_codec$Codec$field,
							'layoutAlign',
							function ($) {
								return $.hO;
							},
							$author$project$FigmaPlugin$layoutAlignCodec,
							A4(
								$miniBill$elm_codec$Codec$field,
								'counterAxisSizingMode',
								function ($) {
									return $.hq;
								},
								$author$project$FigmaPlugin$axisSizingModesCodec,
								A4(
									$miniBill$elm_codec$Codec$field,
									'primaryAxisSizingMode',
									function ($) {
										return $.il;
									},
									$author$project$FigmaPlugin$axisSizingModesCodec,
									A4(
										$miniBill$elm_codec$Codec$field,
										'layoutMode',
										function ($) {
											return $.eS;
										},
										$author$project$FigmaPlugin$layoutModeCodec,
										A4(
											$miniBill$elm_codec$Codec$field,
											'itemSpacing',
											function ($) {
												return $.dC;
											},
											$author$project$FigmaPlugin$lenientIntCodec,
											A4(
												$miniBill$elm_codec$Codec$field,
												'visible',
												function ($) {
													return $.r;
												},
												$miniBill$elm_codec$Codec$bool,
												A4(
													$miniBill$elm_codec$Codec$field,
													'children',
													function ($) {
														return $.bL;
													},
													$miniBill$elm_codec$Codec$list(
														$author$project$FigmaPlugin$cyclic$nodeCodec()),
													A4(
														$miniBill$elm_codec$Codec$field,
														'paddingBottom',
														function ($) {
															return $.aF;
														},
														$author$project$FigmaPlugin$lenientIntCodec,
														A4(
															$miniBill$elm_codec$Codec$field,
															'paddingTop',
															function ($) {
																return $.al;
															},
															$author$project$FigmaPlugin$lenientIntCodec,
															A4(
																$miniBill$elm_codec$Codec$field,
																'paddingRight',
																function ($) {
																	return $.aG;
																},
																$author$project$FigmaPlugin$lenientIntCodec,
																A4(
																	$miniBill$elm_codec$Codec$field,
																	'paddingLeft',
																	function ($) {
																		return $.M;
																	},
																	$author$project$FigmaPlugin$lenientIntCodec,
																	A4(
																		$miniBill$elm_codec$Codec$field,
																		'y',
																		function ($) {
																			return $.y;
																		},
																		$author$project$FigmaPlugin$lenientIntCodec,
																		A4(
																			$miniBill$elm_codec$Codec$field,
																			'x',
																			function ($) {
																				return $.x;
																			},
																			$author$project$FigmaPlugin$lenientIntCodec,
																			A4(
																				$miniBill$elm_codec$Codec$field,
																				'effects',
																				function ($) {
																					return $.aR;
																				},
																				$miniBill$elm_codec$Codec$list($author$project$FigmaPlugin$effectCodec),
																				A4(
																					$miniBill$elm_codec$Codec$field,
																					'fills',
																					function ($) {
																						return $.aX;
																					},
																					$miniBill$elm_codec$Codec$list($author$project$FigmaPlugin$fillCodec),
																					A4(
																						$miniBill$elm_codec$Codec$field,
																						'strokes',
																						function ($) {
																							return $.bj;
																						},
																						$miniBill$elm_codec$Codec$list($author$project$FigmaPlugin$strokeCodec),
																						A4(
																							$miniBill$elm_codec$Codec$field,
																							'strokeWeight',
																							function ($) {
																								return $.a3;
																							},
																							$author$project$FigmaPlugin$lenientIntCodec,
																							A4(
																								$miniBill$elm_codec$Codec$field,
																								'topRightRadius',
																								function ($) {
																									return $.bY;
																								},
																								$author$project$FigmaPlugin$lenientIntCodec,
																								A4(
																									$miniBill$elm_codec$Codec$field,
																									'topLeftRadius',
																									function ($) {
																										return $.bX;
																									},
																									$author$project$FigmaPlugin$lenientIntCodec,
																									A4(
																										$miniBill$elm_codec$Codec$field,
																										'bottomRightRadius',
																										function ($) {
																											return $.bJ;
																										},
																										$author$project$FigmaPlugin$lenientIntCodec,
																										A4(
																											$miniBill$elm_codec$Codec$field,
																											'bottomLeftRadius',
																											function ($) {
																												return $.aN;
																											},
																											$author$project$FigmaPlugin$lenientIntCodec,
																											A4(
																												$miniBill$elm_codec$Codec$field,
																												'height',
																												function (a) {
																													return a.o.T;
																												},
																												$author$project$FigmaPlugin$lenientIntQuantityCodec,
																												A4(
																													$miniBill$elm_codec$Codec$field,
																													'width',
																													function (a) {
																														return a.o.P;
																													},
																													$author$project$FigmaPlugin$lenientIntQuantityCodec,
																													$miniBill$elm_codec$Codec$object(
																														F2(
																															function (a, b) {
																																return $author$project$FigmaPlugin$FrameNode(
																																	{T: b, P: a});
																															}))))))))))))))))))))))))))))));
}
function $author$project$FigmaPlugin$cyclic$groupNodeCodec() {
	return $miniBill$elm_codec$Codec$buildObject(
		A4(
			$miniBill$elm_codec$Codec$field,
			'visible',
			function ($) {
				return $.r;
			},
			$miniBill$elm_codec$Codec$bool,
			A4(
				$miniBill$elm_codec$Codec$field,
				'children',
				function ($) {
					return $.bL;
				},
				$miniBill$elm_codec$Codec$list(
					$author$project$FigmaPlugin$cyclic$nodeCodec()),
				A4(
					$miniBill$elm_codec$Codec$field,
					'y',
					function ($) {
						return $.y;
					},
					$author$project$FigmaPlugin$lenientIntCodec,
					A4(
						$miniBill$elm_codec$Codec$field,
						'x',
						function ($) {
							return $.x;
						},
						$author$project$FigmaPlugin$lenientIntCodec,
						A4(
							$miniBill$elm_codec$Codec$field,
							'effects',
							function ($) {
								return $.aR;
							},
							$miniBill$elm_codec$Codec$list($author$project$FigmaPlugin$effectCodec),
							A4(
								$miniBill$elm_codec$Codec$field,
								'height',
								function (a) {
									return a.o.T;
								},
								$author$project$FigmaPlugin$lenientIntQuantityCodec,
								A4(
									$miniBill$elm_codec$Codec$field,
									'width',
									function (a) {
										return a.o.P;
									},
									$author$project$FigmaPlugin$lenientIntQuantityCodec,
									$miniBill$elm_codec$Codec$object(
										F2(
											function (a, b) {
												return $author$project$FigmaPlugin$GroupNode(
													{T: b, P: a});
											}))))))))));
}
function $author$project$FigmaPlugin$cyclic$instanceNodeCodec() {
	return $miniBill$elm_codec$Codec$buildObject(
		A4(
			$miniBill$elm_codec$Codec$field,
			'layoutMode',
			function ($) {
				return $.eS;
			},
			$author$project$FigmaPlugin$layoutModeCodec,
			A4(
				$miniBill$elm_codec$Codec$field,
				'itemSpacing',
				function ($) {
					return $.dC;
				},
				$author$project$FigmaPlugin$lenientIntCodec,
				A4(
					$miniBill$elm_codec$Codec$field,
					'visible',
					function ($) {
						return $.r;
					},
					$miniBill$elm_codec$Codec$bool,
					A4(
						$miniBill$elm_codec$Codec$field,
						'children',
						function ($) {
							return $.bL;
						},
						$miniBill$elm_codec$Codec$list(
							$author$project$FigmaPlugin$cyclic$nodeCodec()),
						A4(
							$miniBill$elm_codec$Codec$field,
							'paddingBottom',
							function ($) {
								return $.aF;
							},
							$author$project$FigmaPlugin$lenientIntCodec,
							A4(
								$miniBill$elm_codec$Codec$field,
								'paddingTop',
								function ($) {
									return $.al;
								},
								$author$project$FigmaPlugin$lenientIntCodec,
								A4(
									$miniBill$elm_codec$Codec$field,
									'paddingRight',
									function ($) {
										return $.aG;
									},
									$author$project$FigmaPlugin$lenientIntCodec,
									A4(
										$miniBill$elm_codec$Codec$field,
										'paddingLeft',
										function ($) {
											return $.M;
										},
										$author$project$FigmaPlugin$lenientIntCodec,
										A4(
											$miniBill$elm_codec$Codec$field,
											'y',
											function ($) {
												return $.y;
											},
											$author$project$FigmaPlugin$lenientIntCodec,
											A4(
												$miniBill$elm_codec$Codec$field,
												'x',
												function ($) {
													return $.x;
												},
												$author$project$FigmaPlugin$lenientIntCodec,
												A4(
													$miniBill$elm_codec$Codec$field,
													'effects',
													function ($) {
														return $.aR;
													},
													$miniBill$elm_codec$Codec$list($author$project$FigmaPlugin$effectCodec),
													A4(
														$miniBill$elm_codec$Codec$field,
														'fills',
														function ($) {
															return $.aX;
														},
														$miniBill$elm_codec$Codec$list($author$project$FigmaPlugin$fillCodec),
														A4(
															$miniBill$elm_codec$Codec$field,
															'strokes',
															function ($) {
																return $.bj;
															},
															$miniBill$elm_codec$Codec$list($author$project$FigmaPlugin$strokeCodec),
															A4(
																$miniBill$elm_codec$Codec$field,
																'strokeWeight',
																function ($) {
																	return $.a3;
																},
																$author$project$FigmaPlugin$lenientIntCodec,
																A4(
																	$miniBill$elm_codec$Codec$field,
																	'topRightRadius',
																	function ($) {
																		return $.bY;
																	},
																	$author$project$FigmaPlugin$lenientIntCodec,
																	A4(
																		$miniBill$elm_codec$Codec$field,
																		'topLeftRadius',
																		function ($) {
																			return $.bX;
																		},
																		$author$project$FigmaPlugin$lenientIntCodec,
																		A4(
																			$miniBill$elm_codec$Codec$field,
																			'bottomRightRadius',
																			function ($) {
																				return $.bJ;
																			},
																			$author$project$FigmaPlugin$lenientIntCodec,
																			A4(
																				$miniBill$elm_codec$Codec$field,
																				'bottomLeftRadius',
																				function ($) {
																					return $.aN;
																				},
																				$author$project$FigmaPlugin$lenientIntCodec,
																				A4(
																					$miniBill$elm_codec$Codec$field,
																					'name',
																					function ($) {
																						return $.fZ;
																					},
																					$miniBill$elm_codec$Codec$string,
																					A4(
																						$miniBill$elm_codec$Codec$field,
																						'height',
																						function (a) {
																							return a.o.T;
																						},
																						$author$project$FigmaPlugin$lenientIntQuantityCodec,
																						A4(
																							$miniBill$elm_codec$Codec$field,
																							'width',
																							function (a) {
																								return a.o.P;
																							},
																							$author$project$FigmaPlugin$lenientIntQuantityCodec,
																							$miniBill$elm_codec$Codec$object(
																								F2(
																									function (a, b) {
																										return $author$project$FigmaPlugin$InstanceNode(
																											{T: b, P: a});
																									}))))))))))))))))))))))));
}
function $author$project$FigmaPlugin$cyclic$nodeCodec() {
	return $miniBill$elm_codec$Codec$lazy(
		function (_v0) {
			return A2(
				$miniBill$elm_codec$Codec$build,
				function (node) {
					switch (node.$) {
						case 2:
							var item = node.a;
							return A2(
								$miniBill$elm_codec$Codec$encoder,
								$author$project$FigmaPlugin$cyclic$frameNodeCodec(),
								item);
						case 0:
							var item = node.a;
							return A2($miniBill$elm_codec$Codec$encoder, $author$project$FigmaPlugin$textNodeCodec, item);
						case 1:
							var item = node.a;
							return A2($miniBill$elm_codec$Codec$encoder, $author$project$FigmaPlugin$rectangleNodeCodec, item);
						case 3:
							var item = node.a;
							return A2(
								$miniBill$elm_codec$Codec$encoder,
								$author$project$FigmaPlugin$cyclic$groupNodeCodec(),
								item);
						case 4:
							var item = node.a;
							return A2($miniBill$elm_codec$Codec$encoder, $author$project$FigmaPlugin$ellipseNodeCodec, item);
						case 5:
							var item = node.a;
							return A2($miniBill$elm_codec$Codec$encoder, $author$project$FigmaPlugin$vectorNodeCodec, item);
						default:
							var item = node.a;
							return A2(
								$miniBill$elm_codec$Codec$encoder,
								$author$project$FigmaPlugin$cyclic$instanceNodeCodec(),
								item);
					}
				},
				A2(
					$elm$json$Json$Decode$andThen,
					function (nodeType) {
						switch (nodeType) {
							case 'FRAME':
								return A2(
									$elm$json$Json$Decode$map,
									$author$project$FigmaPlugin$FrameNode_,
									$miniBill$elm_codec$Codec$decoder(
										$author$project$FigmaPlugin$cyclic$frameNodeCodec()));
							case 'TEXT':
								return A2(
									$elm$json$Json$Decode$map,
									$author$project$FigmaPlugin$TextNode_,
									$miniBill$elm_codec$Codec$decoder($author$project$FigmaPlugin$textNodeCodec));
							case 'GROUP':
								return A2(
									$elm$json$Json$Decode$map,
									$author$project$FigmaPlugin$GroupNode_,
									$miniBill$elm_codec$Codec$decoder(
										$author$project$FigmaPlugin$cyclic$groupNodeCodec()));
							case 'RECTANGLE':
								return A2(
									$elm$json$Json$Decode$map,
									$author$project$FigmaPlugin$RectangleNode_,
									$miniBill$elm_codec$Codec$decoder($author$project$FigmaPlugin$rectangleNodeCodec));
							case 'ELLIPSE':
								return A2(
									$elm$json$Json$Decode$map,
									$author$project$FigmaPlugin$EllipseNode_,
									$miniBill$elm_codec$Codec$decoder($author$project$FigmaPlugin$ellipseNodeCodec));
							case 'VECTOR':
								return A2(
									$elm$json$Json$Decode$map,
									$author$project$FigmaPlugin$VectorNode_,
									$miniBill$elm_codec$Codec$decoder($author$project$FigmaPlugin$vectorNodeCodec));
							case 'INSTANCE':
								return A2(
									$elm$json$Json$Decode$map,
									$author$project$FigmaPlugin$InstanceNode_,
									$miniBill$elm_codec$Codec$decoder(
										$author$project$FigmaPlugin$cyclic$instanceNodeCodec()));
							default:
								return $elm$json$Json$Decode$fail(nodeType + ' prototype not handled');
						}
					},
					A2(
						$elm$json$Json$Decode$at,
						_List_fromArray(
							['__proto__', 'type']),
						$elm$json$Json$Decode$string)));
		});
}
var $author$project$FigmaPlugin$frameNodeCodec = $author$project$FigmaPlugin$cyclic$frameNodeCodec();
$author$project$FigmaPlugin$cyclic$frameNodeCodec = function () {
	return $author$project$FigmaPlugin$frameNodeCodec;
};
var $author$project$FigmaPlugin$groupNodeCodec = $author$project$FigmaPlugin$cyclic$groupNodeCodec();
$author$project$FigmaPlugin$cyclic$groupNodeCodec = function () {
	return $author$project$FigmaPlugin$groupNodeCodec;
};
var $author$project$FigmaPlugin$instanceNodeCodec = $author$project$FigmaPlugin$cyclic$instanceNodeCodec();
$author$project$FigmaPlugin$cyclic$instanceNodeCodec = function () {
	return $author$project$FigmaPlugin$instanceNodeCodec;
};
var $author$project$FigmaPlugin$nodeCodec = $author$project$FigmaPlugin$cyclic$nodeCodec();
$author$project$FigmaPlugin$cyclic$nodeCodec = function () {
	return $author$project$FigmaPlugin$nodeCodec;
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$Application = function (a) {
	return {$: 1, a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Infix$Left = 0;
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $stil4m$elm_syntax$Elm$Syntax$Node$Node = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Syntax$Range$emptyRange = {
	p: {dl: 0, kr: 0},
	t: {dl: 0, kr: 0}
};
var $the_sett$elm_syntax_dsl$Util$nodify = function (exp) {
	return A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, $stil4m$elm_syntax$Elm$Syntax$Range$emptyRange, exp);
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression = function (a) {
	return {$: 14, a: a};
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $the_sett$elm_syntax_dsl$Util$symbolToPrecedence = function (symbol) {
	switch (symbol) {
		case '>>':
			return 9;
		case '<<':
			return 9;
		case '^':
			return 8;
		case '*':
			return 7;
		case '/':
			return 7;
		case '//':
			return 7;
		case '%':
			return 7;
		case 'rem':
			return 7;
		case '+':
			return 6;
		case '-':
			return 6;
		case '++':
			return 5;
		case '::':
			return 5;
		case '==':
			return 4;
		case '/=':
			return 4;
		case '<':
			return 4;
		case '>':
			return 4;
		case '<=':
			return 4;
		case '>=':
			return 4;
		case '&&':
			return 3;
		case '||':
			return 2;
		case '|>':
			return 0;
		case '<|':
			return 0;
		default:
			return -1;
	}
};
var $the_sett$elm_syntax_dsl$Util$parentify = F3(
	function (precedence, associativity, expr) {
		switch (expr.$) {
			case 1:
				var apps = expr.a;
				return ($elm$core$List$length(apps) === 1) ? expr : ((precedence === 10) ? $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression(
					$the_sett$elm_syntax_dsl$Util$nodify(expr)) : expr);
			case 2:
				var symbol = expr.a;
				var opAssociativity = expr.b;
				return ((_Utils_cmp(
					precedence,
					$the_sett$elm_syntax_dsl$Util$symbolToPrecedence(symbol)) > 0) || (_Utils_eq(
					precedence,
					$the_sett$elm_syntax_dsl$Util$symbolToPrecedence(symbol)) && (!_Utils_eq(associativity, opAssociativity)))) ? $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression(
					$the_sett$elm_syntax_dsl$Util$nodify(expr)) : expr;
			case 4:
				return $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression(
					$the_sett$elm_syntax_dsl$Util$nodify(expr));
			case 15:
				return $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression(
					$the_sett$elm_syntax_dsl$Util$nodify(expr));
			case 16:
				return $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression(
					$the_sett$elm_syntax_dsl$Util$nodify(expr));
			default:
				return expr;
		}
	});
var $the_sett$elm_syntax_dsl$Util$nodifyAndParentifyAll = F2(
	function (precedence, associativity) {
		return $elm$core$List$map(
			A2(
				$elm$core$Basics$composeR,
				A2($the_sett$elm_syntax_dsl$Util$parentify, precedence, associativity),
				$the_sett$elm_syntax_dsl$Util$nodify));
	});
var $the_sett$elm_syntax_dsl$Elm$CodeGen$apply = function (exprs) {
	return $stil4m$elm_syntax$Elm$Syntax$Expression$Application(
		A3($the_sett$elm_syntax_dsl$Util$nodifyAndParentifyAll, 10, 0, exprs));
};
var $mdgriffith$elm_ui$Internal$Model$Rgba = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_ui$Element$rgb = F3(
	function (r, g, b) {
		return A4($mdgriffith$elm_ui$Internal$Model$Rgba, r, g, b, 1);
	});
var $mdgriffith$elm_ui$Element$rgb255 = F3(
	function (red, green, blue) {
		return A4($mdgriffith$elm_ui$Internal$Model$Rgba, red / 255, green / 255, blue / 255, 1);
	});
var $mdgriffith$elm_ui$Element$rgba = $mdgriffith$elm_ui$Internal$Model$Rgba;
var $author$project$FigmaPlugin$allColors = _List_fromArray(
	[
		_Utils_Tuple2(
		'white',
		A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1)),
		_Utils_Tuple2(
		'red0',
		A3($mdgriffith$elm_ui$Element$rgb255, 148, 12, 0)),
		_Utils_Tuple2(
		'red1',
		A3($mdgriffith$elm_ui$Element$rgb255, 219, 68, 55)),
		_Utils_Tuple2(
		'red2',
		A3($mdgriffith$elm_ui$Element$rgb255, 255, 219, 219)),
		_Utils_Tuple2(
		'transparent',
		A4($mdgriffith$elm_ui$Element$rgba, 0, 0, 0, 0)),
		_Utils_Tuple2(
		'black',
		A3($mdgriffith$elm_ui$Element$rgb255, 0, 0, 0)),
		_Utils_Tuple2(
		'dark1',
		A3($mdgriffith$elm_ui$Element$rgb255, 56, 56, 56)),
		_Utils_Tuple2(
		'dark2',
		A3($mdgriffith$elm_ui$Element$rgb255, 110, 110, 110)),
		_Utils_Tuple2(
		'dark3',
		A3($mdgriffith$elm_ui$Element$rgb255, 178, 189, 189)),
		_Utils_Tuple2(
		'dark4',
		A3($mdgriffith$elm_ui$Element$rgb255, 217, 221, 227))
	]);
var $stil4m$elm_syntax$Elm$Syntax$Expression$FunctionOrValue = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun = F2(
	function (moduleName, name) {
		return A2($stil4m$elm_syntax$Elm$Syntax$Expression$FunctionOrValue, moduleName, name);
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$Integer = function (a) {
	return {$: 7, a: a};
};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$int = function (intVal) {
	return $stil4m$elm_syntax$Elm$Syntax$Expression$Integer(intVal);
};
var $author$project$FigmaPlugin$figmaColorToExpr = function (figmaColor) {
	var _v0 = A2(
		$elm_community$list_extra$List$Extra$find,
		function (_v1) {
			var color = _v1.b;
			return _Utils_eq(
				A3($mdgriffith$elm_ui$Element$rgb255, figmaColor.bi, figmaColor.ba, figmaColor.a6),
				color);
		},
		$author$project$FigmaPlugin$allColors);
	if (!_v0.$) {
		var _v2 = _v0.a;
		var name = _v2.a;
		return A2(
			$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
			_List_fromArray(
				['Colors']),
			name);
	} else {
		return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
			_List_fromArray(
				[
					A2(
					$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
					_List_fromArray(
						['Element']),
					'rgb255'),
					$the_sett$elm_syntax_dsl$Elm$CodeGen$int(figmaColor.bi),
					$the_sett$elm_syntax_dsl$Elm$CodeGen$int(figmaColor.ba),
					$the_sett$elm_syntax_dsl$Elm$CodeGen$int(figmaColor.a6)
				]));
	}
};
var $author$project$FigmaPlugin$backgroundColorExpr = function (value) {
	return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
		_List_fromArray(
			[
				A2(
				$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
				_List_fromArray(
					['Element', 'Background']),
				'color'),
				$author$project$FigmaPlugin$figmaColorToExpr(value)
			]));
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$Literal = function (a) {
	return {$: 11, a: a};
};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$string = function (literal) {
	return $stil4m$elm_syntax$Elm$Syntax$Expression$Literal(literal);
};
var $author$project$FigmaPlugin$backgroundImageExpr = $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
	_List_fromArray(
		[
			A2(
			$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
			_List_fromArray(
				['Element', 'Background']),
			'image'),
			$the_sett$elm_syntax_dsl$Elm$CodeGen$string('add image url')
		]));
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $author$project$FigmaPlugin$background = function (item) {
	var _v0 = A2(
		$elm$core$List$filterMap,
		function (fill) {
			if (!fill.$) {
				var normalFill = fill.a;
				return normalFill.r ? $elm$core$Maybe$Just(
					$author$project$FigmaPlugin$backgroundColorExpr(normalFill.aO)) : $elm$core$Maybe$Nothing;
			} else {
				var imageFill = fill.a;
				return imageFill.r ? $elm$core$Maybe$Just($author$project$FigmaPlugin$backgroundImageExpr) : $elm$core$Maybe$Nothing;
			}
		},
		item.aX);
	if (_v0.b) {
		var head = _v0.a;
		return _List_fromArray(
			[head]);
	} else {
		return _List_Nil;
	}
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$RecordExpr = function (a) {
	return {$: 18, a: a};
};
var $the_sett$elm_syntax_dsl$Util$nodifyAll = $elm$core$List$map($the_sett$elm_syntax_dsl$Util$nodify);
var $the_sett$elm_syntax_dsl$Elm$CodeGen$recordSetter = F2(
	function (field, expr) {
		return _Utils_Tuple2(
			$the_sett$elm_syntax_dsl$Util$nodify(field),
			$the_sett$elm_syntax_dsl$Util$nodify(expr));
	});
var $the_sett$elm_syntax_dsl$Elm$CodeGen$record = function (setters) {
	return $stil4m$elm_syntax$Elm$Syntax$Expression$RecordExpr(
		$the_sett$elm_syntax_dsl$Util$nodifyAll(
			A2(
				$elm$core$List$map,
				function (_v0) {
					var fieldName = _v0.a;
					var expr = _v0.b;
					return A2($the_sett$elm_syntax_dsl$Elm$CodeGen$recordSetter, fieldName, expr);
				},
				setters)));
};
var $author$project$FigmaPlugin$borderRoundedEachExpr = function (_v0) {
	var topLeft = _v0.iC;
	var topRight = _v0.iD;
	var bottomLeft = _v0.hk;
	var bottomRight = _v0.hl;
	return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
		_List_fromArray(
			[
				A2(
				$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
				_List_fromArray(
					['Element', 'Border']),
				'roundEach'),
				$the_sett$elm_syntax_dsl$Elm$CodeGen$record(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'topLeft',
						$the_sett$elm_syntax_dsl$Elm$CodeGen$int(topLeft)),
						_Utils_Tuple2(
						'topRight',
						$the_sett$elm_syntax_dsl$Elm$CodeGen$int(topRight)),
						_Utils_Tuple2(
						'bottomLeft',
						$the_sett$elm_syntax_dsl$Elm$CodeGen$int(bottomLeft)),
						_Utils_Tuple2(
						'bottomRight',
						$the_sett$elm_syntax_dsl$Elm$CodeGen$int(bottomRight))
					]))
			]));
};
var $author$project$FigmaPlugin$borderRoundedExpr = function (value) {
	return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
		_List_fromArray(
			[
				A2(
				$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
				_List_fromArray(
					['Element', 'Border']),
				'rounded'),
				$the_sett$elm_syntax_dsl$Elm$CodeGen$int(value)
			]));
};
var $author$project$FigmaPlugin$borderRadius = function (item) {
	return ((item.aN > 0) && (_Utils_eq(item.aN, item.bJ) && (_Utils_eq(item.aN, item.bX) && _Utils_eq(item.aN, item.bY)))) ? _List_fromArray(
		[
			$author$project$FigmaPlugin$borderRoundedExpr(item.aN)
		]) : (((item.aN > 0) || ((item.bJ > 0) || ((item.bX > 0) || (item.bY > 0)))) ? _List_fromArray(
		[
			$author$project$FigmaPlugin$borderRoundedEachExpr(
			{hk: item.aN, hl: item.bJ, iC: item.bX, iD: item.bY})
		]) : _List_Nil);
};
var $author$project$FigmaPlugin$borderColorExpr = function (value) {
	return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
		_List_fromArray(
			[
				A2(
				$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
				_List_fromArray(
					['Element', 'Border']),
				'color'),
				$author$project$FigmaPlugin$figmaColorToExpr(value)
			]));
};
var $author$project$FigmaPlugin$borderWidthExpr = function (value) {
	return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
		_List_fromArray(
			[
				A2(
				$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
				_List_fromArray(
					['Element', 'Border']),
				'width'),
				$the_sett$elm_syntax_dsl$Elm$CodeGen$int(value)
			]));
};
var $author$project$FigmaPlugin$borderWidthAndColor = function (item) {
	var _v0 = _Utils_Tuple2(item.a3 > 0, item.bj);
	if (_v0.a && _v0.b.b) {
		var _v1 = _v0.b;
		var head = _v1.a;
		return _List_fromArray(
			[
				$author$project$FigmaPlugin$borderWidthExpr(item.a3),
				$author$project$FigmaPlugin$borderColorExpr(head.aO)
			]);
	} else {
		return _List_Nil;
	}
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$ListExpr = function (a) {
	return {$: 19, a: a};
};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$list = function (exprs) {
	return $stil4m$elm_syntax$Elm$Syntax$Expression$ListExpr(
		$the_sett$elm_syntax_dsl$Util$nodifyAll(exprs));
};
var $author$project$FigmaPlugin$columnExpr = F2(
	function (attributes, children) {
		return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
			_List_fromArray(
				[
					A2(
					$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
					_List_fromArray(
						['Element']),
					'column'),
					$the_sett$elm_syntax_dsl$Elm$CodeGen$list(attributes),
					$the_sett$elm_syntax_dsl$Elm$CodeGen$list(children)
				]));
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$Floatable = function (a) {
	return {$: 9, a: a};
};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$float = function (floatVal) {
	return $stil4m$elm_syntax$Elm$Syntax$Expression$Floatable(floatVal);
};
var $mdgriffith$elm_ui$Element$rgba255 = F4(
	function (red, green, blue, a) {
		return A4($mdgriffith$elm_ui$Internal$Model$Rgba, red / 255, green / 255, blue / 255, a);
	});
var $author$project$FigmaPlugin$figmaColorWithAlphaToExpr = function (figmaColor) {
	var _v0 = A2(
		$elm_community$list_extra$List$Extra$find,
		function (_v1) {
			var color = _v1.b;
			return _Utils_eq(
				A4($mdgriffith$elm_ui$Element$rgba255, figmaColor.bi, figmaColor.ba, figmaColor.a6, figmaColor.ej),
				color);
		},
		$author$project$FigmaPlugin$allColors);
	if (!_v0.$) {
		var _v2 = _v0.a;
		var name = _v2.a;
		return A2(
			$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
			_List_fromArray(
				['Colors']),
			name);
	} else {
		return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
			_List_fromArray(
				[
					A2(
					$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
					_List_fromArray(
						['Element']),
					'rgba255'),
					$the_sett$elm_syntax_dsl$Elm$CodeGen$int(figmaColor.bi),
					$the_sett$elm_syntax_dsl$Elm$CodeGen$int(figmaColor.ba),
					$the_sett$elm_syntax_dsl$Elm$CodeGen$int(figmaColor.a6),
					$the_sett$elm_syntax_dsl$Elm$CodeGen$float(figmaColor.ej)
				]));
	}
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$TupledExpression = function (a) {
	return {$: 13, a: a};
};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$tuple = function (exprs) {
	return $stil4m$elm_syntax$Elm$Syntax$Expression$TupledExpression(
		$the_sett$elm_syntax_dsl$Util$nodifyAll(exprs));
};
var $author$project$FigmaPlugin$borderInnerShadowExpr = F4(
	function (_v0, blur, size, color) {
		var x = _v0.x;
		var y = _v0.y;
		return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
			_List_fromArray(
				[
					A2(
					$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
					_List_fromArray(
						['Element', 'Border']),
					'innerShadow'),
					$the_sett$elm_syntax_dsl$Elm$CodeGen$record(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'offset',
							$the_sett$elm_syntax_dsl$Elm$CodeGen$tuple(
								_List_fromArray(
									[
										$the_sett$elm_syntax_dsl$Elm$CodeGen$float(x),
										$the_sett$elm_syntax_dsl$Elm$CodeGen$float(y)
									]))),
							_Utils_Tuple2(
							'blur',
							$the_sett$elm_syntax_dsl$Elm$CodeGen$float(blur)),
							_Utils_Tuple2(
							'size',
							$the_sett$elm_syntax_dsl$Elm$CodeGen$float(size)),
							_Utils_Tuple2(
							'color',
							$author$project$FigmaPlugin$figmaColorWithAlphaToExpr(color))
						]))
				]));
	});
var $author$project$FigmaPlugin$borderShadowExpr = F4(
	function (_v0, blur, size, color) {
		var x = _v0.x;
		var y = _v0.y;
		return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
			_List_fromArray(
				[
					A2(
					$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
					_List_fromArray(
						['Element', 'Border']),
					'shadow'),
					$the_sett$elm_syntax_dsl$Elm$CodeGen$record(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'offset',
							$the_sett$elm_syntax_dsl$Elm$CodeGen$tuple(
								_List_fromArray(
									[
										$the_sett$elm_syntax_dsl$Elm$CodeGen$float(x),
										$the_sett$elm_syntax_dsl$Elm$CodeGen$float(y)
									]))),
							_Utils_Tuple2(
							'blur',
							$the_sett$elm_syntax_dsl$Elm$CodeGen$float(blur)),
							_Utils_Tuple2(
							'size',
							$the_sett$elm_syntax_dsl$Elm$CodeGen$float(size)),
							_Utils_Tuple2(
							'color',
							$author$project$FigmaPlugin$figmaColorWithAlphaToExpr(color))
						]))
				]));
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $author$project$FigmaPlugin$textExpr = function (text) {
	return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
		_List_fromArray(
			[
				A2(
				$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
				_List_fromArray(
					['Element']),
				'text'),
				$the_sett$elm_syntax_dsl$Elm$CodeGen$string(text)
			]));
};
var $author$project$FigmaPlugin$uiShadowExpr = F3(
	function (_v0, blur, opacity) {
		var x = _v0.x;
		var y = _v0.y;
		return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
			_List_fromArray(
				[
					A2(
					$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
					_List_fromArray(
						['Ui']),
					'shadow'),
					$the_sett$elm_syntax_dsl$Elm$CodeGen$record(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'offset',
							$the_sett$elm_syntax_dsl$Elm$CodeGen$tuple(
								_List_fromArray(
									[
										$the_sett$elm_syntax_dsl$Elm$CodeGen$float(x),
										$the_sett$elm_syntax_dsl$Elm$CodeGen$float(y)
									]))),
							_Utils_Tuple2(
							'blur',
							$the_sett$elm_syntax_dsl$Elm$CodeGen$float(blur)),
							_Utils_Tuple2(
							'opacity',
							$the_sett$elm_syntax_dsl$Elm$CodeGen$float(opacity))
						]))
				]));
	});
var $author$project$FigmaPlugin$effects = function (item) {
	return A2(
		$elm$core$List$concatMap,
		function (effect) {
			if (effect.r) {
				var _v0 = _Utils_Tuple2(effect.gC, effect.aO);
				_v0$3:
				while (true) {
					switch (_v0.a) {
						case 'DROP_SHADOW':
							if (!_v0.b.$) {
								var color = _v0.b.a;
								return ((effect.fe > 0) || ((color.bi > 0) || ((color.ba > 0) || (color.a6 > 0)))) ? _List_fromArray(
									[
										A4($author$project$FigmaPlugin$borderShadowExpr, effect.e0, effect.fa, effect.fe, color)
									]) : _List_fromArray(
									[
										A3($author$project$FigmaPlugin$uiShadowExpr, effect.e0, effect.fa, color.ej)
									]);
							} else {
								break _v0$3;
							}
						case 'INNER_SHADOW':
							if (!_v0.b.$) {
								var color = _v0.b.a;
								return _List_fromArray(
									[
										A4($author$project$FigmaPlugin$borderInnerShadowExpr, effect.e0, effect.fa, effect.fe, color)
									]);
							} else {
								break _v0$3;
							}
						case 'BACKGROUND_BLUR':
							return _List_fromArray(
								[
									$author$project$FigmaPlugin$textExpr('TODO: handle blur background')
								]);
						default:
							break _v0$3;
					}
				}
				return _List_Nil;
			} else {
				return _List_Nil;
			}
		},
		item.aR);
};
var $author$project$FigmaPlugin$elExpr = F2(
	function (attributes, children) {
		return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
			_List_fromArray(
				[
					A2(
					$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
					_List_fromArray(
						['Element']),
					'el'),
					$the_sett$elm_syntax_dsl$Elm$CodeGen$list(attributes),
					children
				]));
	});
var $ianmackenzie$elm_units$Pixels$inPixels = function (_v0) {
	var numPixels = _v0;
	return numPixels;
};
var $author$project$FigmaPlugin$heightPxExpr = function (px) {
	return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
		_List_fromArray(
			[
				A2(
				$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
				_List_fromArray(
					['Element']),
				'height'),
				$the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
				_List_fromArray(
					[
						A2(
						$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
						_List_fromArray(
							['Element']),
						'px'),
						$the_sett$elm_syntax_dsl$Elm$CodeGen$int(
						$ianmackenzie$elm_units$Pixels$inPixels(px))
					]))
			]));
};
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $author$project$FigmaPlugin$alignBottomExpr = A2(
	$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
	_List_fromArray(
		['Element']),
	'alignBottom');
var $author$project$FigmaPlugin$alignRightExpr = A2(
	$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
	_List_fromArray(
		['Element']),
	'alignRight');
var $author$project$FigmaPlugin$centerXExpr = A2(
	$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
	_List_fromArray(
		['Element']),
	'centerX');
var $author$project$FigmaPlugin$centerYExpr = A2(
	$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
	_List_fromArray(
		['Element']),
	'centerY');
var $author$project$FigmaPlugin$heightFillExpr = $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
	_List_fromArray(
		[
			A2(
			$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
			_List_fromArray(
				['Element']),
			'height'),
			A2(
			$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
			_List_fromArray(
				['Element']),
			'fill')
		]));
var $author$project$FigmaPlugin$widthFillExpr = $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
	_List_fromArray(
		[
			A2(
			$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
			_List_fromArray(
				['Element']),
			'width'),
			A2(
			$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
			_List_fromArray(
				['Element']),
			'fill')
		]));
var $author$project$FigmaPlugin$widthHeightAndAlignment = F3(
	function (allowFill, maybeParent, frameNode) {
		if (!maybeParent.$) {
			var parent = maybeParent.a;
			var innerY1 = $ianmackenzie$elm_units$Pixels$inPixels(parent.o.T) - parent.aF;
			var innerY0 = parent.al;
			var innerX1 = $ianmackenzie$elm_units$Pixels$inPixels(parent.o.P) - parent.aG;
			var innerX0 = parent.M;
			var innerWidth = ($ianmackenzie$elm_units$Pixels$inPixels(parent.o.P) - parent.M) - parent.aG;
			var innerHeight = ($ianmackenzie$elm_units$Pixels$inPixels(parent.o.T) - parent.al) - parent.aF;
			var innerCenterY = (innerY0 + innerY1) / 2;
			var innerCenterX = (innerX0 + innerX1) / 2;
			var childY1 = frameNode.y + $ianmackenzie$elm_units$Pixels$inPixels(frameNode.o.T);
			var childY0 = frameNode.y;
			var childX1 = frameNode.x + $ianmackenzie$elm_units$Pixels$inPixels(frameNode.o.P);
			var childX0 = frameNode.x;
			var childCenterY = (childY0 + childY1) / 2;
			var childCenterX = (childX0 + childX1) / 2;
			var approximatelyEqual = F2(
				function (a, b) {
					return $elm$core$Basics$abs(a - b) < 1;
				});
			return _Utils_ap(
				A2(
					approximatelyEqual,
					innerWidth,
					$ianmackenzie$elm_units$Pixels$inPixels(frameNode.o.P)) ? (allowFill ? _List_fromArray(
					[$author$project$FigmaPlugin$widthFillExpr]) : _List_Nil) : (A2(approximatelyEqual, innerCenterX, childCenterX) ? _List_fromArray(
					[$author$project$FigmaPlugin$centerXExpr]) : (A2(approximatelyEqual, childX1, innerX1) ? _List_fromArray(
					[$author$project$FigmaPlugin$alignRightExpr]) : _List_Nil)),
				A2(
					approximatelyEqual,
					innerHeight,
					$ianmackenzie$elm_units$Pixels$inPixels(frameNode.o.T)) ? (allowFill ? _List_fromArray(
					[$author$project$FigmaPlugin$heightFillExpr]) : _List_Nil) : (A2(approximatelyEqual, innerCenterY, childCenterY) ? _List_fromArray(
					[$author$project$FigmaPlugin$centerYExpr]) : (A2(approximatelyEqual, childY1, innerY1) ? _List_fromArray(
					[$author$project$FigmaPlugin$alignBottomExpr]) : _List_Nil)));
		} else {
			return _List_Nil;
		}
	});
var $author$project$FigmaPlugin$widthPxExpr = function (px) {
	return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
		_List_fromArray(
			[
				A2(
				$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
				_List_fromArray(
					['Element']),
				'width'),
				$the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
				_List_fromArray(
					[
						A2(
						$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
						_List_fromArray(
							['Element']),
						'px'),
						$the_sett$elm_syntax_dsl$Elm$CodeGen$int(
						$ianmackenzie$elm_units$Pixels$inPixels(px))
					]))
			]));
};
var $author$project$FigmaPlugin$ellipseNodeAttributes = F2(
	function (parent, item) {
		return _Utils_eq(item.o.P, item.o.T) ? _Utils_ap(
			$author$project$FigmaPlugin$borderWidthAndColor(item),
			_Utils_ap(
				$author$project$FigmaPlugin$background(item),
				_Utils_ap(
					$author$project$FigmaPlugin$effects(item),
					_Utils_ap(
						A3($author$project$FigmaPlugin$widthHeightAndAlignment, false, parent, item),
						_List_fromArray(
							[
								$author$project$FigmaPlugin$widthPxExpr(item.o.P),
								$author$project$FigmaPlugin$heightPxExpr(item.o.T),
								$author$project$FigmaPlugin$borderRoundedExpr(
								$ianmackenzie$elm_units$Pixels$inPixels(item.o.P))
							]))))) : _List_Nil;
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $author$project$FigmaPlugin$paddingEachExpr = function (_v0) {
	var left = _v0.hQ;
	var right = _v0.is;
	var top = _v0.iB;
	var bottom = _v0.hj;
	return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
		_List_fromArray(
			[
				A2(
				$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
				_List_fromArray(
					['Element']),
				'paddingEach'),
				$the_sett$elm_syntax_dsl$Elm$CodeGen$record(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'left',
						$the_sett$elm_syntax_dsl$Elm$CodeGen$int(left)),
						_Utils_Tuple2(
						'right',
						$the_sett$elm_syntax_dsl$Elm$CodeGen$int(right)),
						_Utils_Tuple2(
						'top',
						$the_sett$elm_syntax_dsl$Elm$CodeGen$int(top)),
						_Utils_Tuple2(
						'bottom',
						$the_sett$elm_syntax_dsl$Elm$CodeGen$int(bottom))
					]))
			]));
};
var $author$project$FigmaPlugin$paddingExpr = function (value) {
	return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
		_List_fromArray(
			[
				A2(
				$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
				_List_fromArray(
					['Element']),
				'padding'),
				$the_sett$elm_syntax_dsl$Elm$CodeGen$int(value)
			]));
};
var $author$project$FigmaPlugin$paddingXyExpr = F2(
	function (x, y) {
		return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
			_List_fromArray(
				[
					A2(
					$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
					_List_fromArray(
						['Element']),
					'paddingXY'),
					$the_sett$elm_syntax_dsl$Elm$CodeGen$int(x),
					$the_sett$elm_syntax_dsl$Elm$CodeGen$int(y)
				]));
	});
var $author$project$FigmaPlugin$padding = function (item) {
	return ((item.M > 0) && (_Utils_eq(item.M, item.aG) && (_Utils_eq(item.M, item.aF) && _Utils_eq(item.M, item.al)))) ? _List_fromArray(
		[
			$author$project$FigmaPlugin$paddingExpr(item.M)
		]) : ((((item.M > 0) || (item.al > 0)) && (_Utils_eq(item.M, item.aG) && _Utils_eq(item.al, item.aF))) ? _List_fromArray(
		[
			A2($author$project$FigmaPlugin$paddingXyExpr, item.M, item.al)
		]) : (((item.M > 0) || ((item.aG > 0) || ((item.aF > 0) || (item.al > 0)))) ? _List_fromArray(
		[
			$author$project$FigmaPlugin$paddingEachExpr(
			{hj: item.aF, hQ: item.M, is: item.aG, iB: item.al})
		]) : _List_Nil));
};
var $author$project$FigmaPlugin$frameNodeAttributes = F2(
	function (maybeParent, item) {
		return _Utils_ap(
			$author$project$FigmaPlugin$borderWidthAndColor(item),
			_Utils_ap(
				$author$project$FigmaPlugin$borderRadius(item),
				_Utils_ap(
					$author$project$FigmaPlugin$padding(item),
					_Utils_ap(
						$author$project$FigmaPlugin$background(item),
						_Utils_ap(
							$author$project$FigmaPlugin$effects(item),
							A3($author$project$FigmaPlugin$widthHeightAndAlignment, true, maybeParent, item))))));
	});
var $author$project$FigmaPlugin$getParentData = function (a) {
	return {aF: a.aF, M: a.M, aG: a.aG, al: a.al, o: a.o, x: a.x, y: a.y};
};
var $author$project$FigmaPlugin$getParentData_ = function (a) {
	return {aF: 0, M: 0, aG: 0, al: 0, o: a.o, x: a.x, y: a.y};
};
var $author$project$FigmaPlugin$groupNodeAttributes = F2(
	function (maybeParent, item) {
		return _Utils_ap(
			$author$project$FigmaPlugin$effects(item),
			A3($author$project$FigmaPlugin$widthHeightAndAlignment, true, maybeParent, item));
	});
var $author$project$FigmaPlugin$instanceNodeAttributes = function (item) {
	return _Utils_ap(
		$author$project$FigmaPlugin$borderWidthAndColor(item),
		_Utils_ap(
			$author$project$FigmaPlugin$borderRadius(item),
			_Utils_ap(
				$author$project$FigmaPlugin$padding(item),
				_Utils_ap(
					$author$project$FigmaPlugin$background(item),
					$author$project$FigmaPlugin$effects(item)))));
};
var $author$project$FigmaPlugin$isNodeVisible = function (node) {
	switch (node.$) {
		case 0:
			var item = node.a;
			return item.r;
		case 1:
			var item = node.a;
			return item.r;
		case 2:
			var item = node.a;
			return item.r;
		case 3:
			var item = node.a;
			return item.r;
		case 4:
			var item = node.a;
			return item.r;
		case 5:
			var item = node.a;
			return item.r;
		default:
			var item = node.a;
			return item.r;
	}
};
var $author$project$FigmaPlugin$rowExpr = F2(
	function (attributes, children) {
		return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
			_List_fromArray(
				[
					A2(
					$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
					_List_fromArray(
						['Element']),
					'row'),
					$the_sett$elm_syntax_dsl$Elm$CodeGen$list(attributes),
					$the_sett$elm_syntax_dsl$Elm$CodeGen$list(children)
				]));
	});
var $author$project$FigmaPlugin$spacingExpr = function (spacing) {
	return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
		_List_fromArray(
			[
				A2(
				$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
				_List_fromArray(
					['Element']),
				'spacing'),
				$the_sett$elm_syntax_dsl$Elm$CodeGen$int(spacing)
			]));
};
var $author$project$FigmaPlugin$defaultFontColor = A3($mdgriffith$elm_ui$Element$rgb, 0, 0, 0);
var $author$project$FigmaPlugin$defaultFontSize = 16;
var $author$project$FigmaPlugin$fontColorExpr = function (value) {
	return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
		_List_fromArray(
			[
				A2(
				$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
				_List_fromArray(
					['Element', 'Font']),
				'color'),
				$author$project$FigmaPlugin$figmaColorToExpr(value)
			]));
};
var $author$project$FigmaPlugin$fontSizeExpr = function (value) {
	return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
		_List_fromArray(
			[
				A2(
				$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
				_List_fromArray(
					['Element', 'Font']),
				'size'),
				$the_sett$elm_syntax_dsl$Elm$CodeGen$int(value)
			]));
};
var $mdgriffith$elm_ui$Element$toRgb = function (_v0) {
	var r = _v0.a;
	var g = _v0.b;
	var b = _v0.c;
	var a = _v0.d;
	return {ej: a, a6: b, ba: g, bi: r};
};
var $author$project$FigmaPlugin$textNodeAttributes = F2(
	function (isMultiline, item) {
		return _Utils_ap(
			$author$project$FigmaPlugin$borderWidthAndColor(item),
			_Utils_ap(
				$author$project$FigmaPlugin$effects(item),
				_Utils_ap(
					function () {
						var _v0 = item.aX;
						if (!_v0.$) {
							var fills = _v0.a;
							var _v1 = A2(
								$elm$core$List$filter,
								function ($) {
									return $.r;
								},
								fills);
							if (_v1.b) {
								var head = _v1.a;
								var _v2 = $mdgriffith$elm_ui$Element$toRgb($author$project$FigmaPlugin$defaultFontColor);
								var red = _v2.bi;
								var green = _v2.ba;
								var blue = _v2.a6;
								return (_Utils_eq(
									head.aO.bi,
									$elm$core$Basics$round(255 * red)) && (_Utils_eq(
									head.aO.ba,
									$elm$core$Basics$round(255 * green)) && _Utils_eq(
									head.aO.a6,
									$elm$core$Basics$round(255 * blue)))) ? _List_Nil : _List_fromArray(
									[
										$author$project$FigmaPlugin$fontColorExpr(head.aO)
									]);
							} else {
								return _List_Nil;
							}
						} else {
							return _List_Nil;
						}
					}(),
					_Utils_ap(
						function () {
							var _v3 = item.fP;
							if (!_v3.$) {
								var fontSize = _v3.a;
								return _Utils_eq(fontSize, $author$project$FigmaPlugin$defaultFontSize) ? _List_Nil : _List_fromArray(
									[
										$author$project$FigmaPlugin$fontSizeExpr(fontSize)
									]);
							} else {
								return _List_Nil;
							}
						}(),
						_Utils_ap(
							function () {
								var _v4 = item.gG;
								if (!_v4.$) {
									var fontName = _v4.a;
									var _v5 = fontName.g5;
									switch (_v5) {
										case 0:
											return _List_fromArray(
												[
													A2(
													$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
													_List_fromArray(
														['Element', 'Font']),
													'hairline')
												]);
										case 1:
											return _List_Nil;
										case 2:
											return _List_fromArray(
												[
													A2(
													$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
													_List_fromArray(
														['Element', 'Font']),
													'medium')
												]);
										case 3:
											return _List_fromArray(
												[
													A2(
													$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
													_List_fromArray(
														['Element', 'Font']),
													'semiBold')
												]);
										case 4:
											return _List_fromArray(
												[
													A2(
													$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
													_List_fromArray(
														['Element', 'Font']),
													'bold')
												]);
										case 5:
											return _List_fromArray(
												[
													A2(
													$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
													_List_fromArray(
														['Element', 'Font']),
													'extraBold')
												]);
										default:
											return _List_fromArray(
												[
													A2(
													$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
													_List_fromArray(
														['Element', 'Font']),
													'heavy')
												]);
									}
								} else {
									return _List_Nil;
								}
							}(),
							_Utils_ap(
								function () {
									var _v6 = item.gL;
									switch (_v6) {
										case 0:
											return _List_Nil;
										case 1:
											return isMultiline ? _List_fromArray(
												[
													A2(
													$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
													_List_fromArray(
														['Element', 'Font']),
													'center')
												]) : _List_fromArray(
												[$author$project$FigmaPlugin$centerXExpr]);
										case 2:
											return isMultiline ? _List_fromArray(
												[
													A2(
													$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
													_List_fromArray(
														['Element', 'Font']),
													'alignRight')
												]) : _List_fromArray(
												[$author$project$FigmaPlugin$alignRightExpr]);
										default:
											return _List_Nil;
									}
								}(),
								function () {
									var _v7 = item.gR;
									if (!_v7.$) {
										return _List_Nil;
									} else {
										var px = _v7.a;
										var _v8 = _Utils_Tuple2(item.fP, isMultiline);
										if ((!_v8.a.$) && _v8.b) {
											var fontSize = _v8.a.a;
											return _List_fromArray(
												[
													$author$project$FigmaPlugin$spacingExpr(px - fontSize)
												]);
										} else {
											return _List_Nil;
										}
									}
								}()))))));
	});
var $elm$core$String$words = _String_words;
var $author$project$FigmaPlugin$frameNodeExpr = F2(
	function (getAttributes, item) {
		var parentData = $elm$core$Maybe$Just(
			$author$project$FigmaPlugin$getParentData(item));
		var _v5 = _Utils_Tuple2(
			getAttributes(item),
			A2(
				$elm$core$List$filterMap,
				$author$project$FigmaPlugin$nodeToExpr(parentData),
				A2($elm$core$List$filter, $author$project$FigmaPlugin$isNodeVisible, item.bL)));
		if (_v5.b.b) {
			if (_v5.b.b.b) {
				var attributes = _v5.a;
				var _v7 = _v5.b;
				var first = _v7.a;
				var _v8 = _v7.b;
				var second = _v8.a;
				var rest = _v8.b;
				return $elm$core$Maybe$Just(
					A2(
						function () {
							var _v9 = item.eS;
							switch (_v9) {
								case 0:
									return $author$project$FigmaPlugin$rowExpr;
								case 1:
									return $author$project$FigmaPlugin$columnExpr;
								default:
									return $author$project$FigmaPlugin$columnExpr;
							}
						}(),
						_Utils_ap(
							(!item.dC) ? _List_Nil : _List_fromArray(
								[
									$author$project$FigmaPlugin$spacingExpr(item.dC)
								]),
							attributes),
						A2(
							$elm$core$List$cons,
							first,
							A2($elm$core$List$cons, second, rest))));
			} else {
				if (!_v5.a.b) {
					var _v6 = _v5.b;
					var head = _v6.a;
					return $elm$core$Maybe$Just(head);
				} else {
					var attributes = _v5.a;
					var _v10 = _v5.b;
					var head = _v10.a;
					return $elm$core$Maybe$Just(
						A2($author$project$FigmaPlugin$elExpr, attributes, head));
				}
			}
		} else {
			if (!_v5.a.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var attributes = _v5.a;
				return $elm$core$Maybe$Just(
					A2(
						$author$project$FigmaPlugin$elExpr,
						attributes,
						A2(
							$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
							_List_fromArray(
								['Element']),
							'none')));
			}
		}
	});
var $author$project$FigmaPlugin$nodeToExpr = F2(
	function (parent, node) {
		nodeToExpr:
		while (true) {
			switch (node.$) {
				case 0:
					var item = node.a;
					var _v1 = $elm$core$List$length(
						$elm$core$String$words(
							A3($elm$core$String$replace, '\n', ' ', item.ec)));
					switch (_v1) {
						case 0:
							return $elm$core$Maybe$Nothing;
						case 1:
							var _v2 = A2($author$project$FigmaPlugin$textNodeAttributes, false, item);
							if (!_v2.b) {
								return $elm$core$Maybe$Just(
									$author$project$FigmaPlugin$textExpr(
										$author$project$FigmaPlugin$escapeText(item.ec)));
							} else {
								var attributes = _v2;
								return $elm$core$Maybe$Just(
									$the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
										_List_fromArray(
											[
												A2(
												$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
												_List_fromArray(
													['Element']),
												'el'),
												$the_sett$elm_syntax_dsl$Elm$CodeGen$list(attributes),
												$author$project$FigmaPlugin$textExpr(
												$author$project$FigmaPlugin$escapeText(item.ec))
											])));
							}
						default:
							return $elm$core$Maybe$Just(
								$the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
									_List_fromArray(
										[
											A2(
											$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
											_List_fromArray(
												['Ui']),
											'paragraph'),
											$the_sett$elm_syntax_dsl$Elm$CodeGen$list(
											A2($author$project$FigmaPlugin$textNodeAttributes, true, item)),
											$the_sett$elm_syntax_dsl$Elm$CodeGen$string(
											$author$project$FigmaPlugin$escapeText(item.ec))
										])));
					}
				case 1:
					var item = node.a;
					return $elm$core$Maybe$Just(
						$the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
							_List_fromArray(
								[
									A2(
									$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
									_List_fromArray(
										['Element']),
									'el'),
									$the_sett$elm_syntax_dsl$Elm$CodeGen$list(
									A2(
										$elm$core$List$cons,
										$author$project$FigmaPlugin$widthFillExpr,
										_Utils_ap(
											$author$project$FigmaPlugin$borderRadius(item),
											_Utils_ap(
												$author$project$FigmaPlugin$borderWidthAndColor(item),
												_Utils_ap(
													$author$project$FigmaPlugin$background(item),
													$author$project$FigmaPlugin$effects(item)))))),
									A2(
									$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
									_List_fromArray(
										['Element']),
									'none')
								])));
				case 2:
					var item = node.a;
					return A2(
						$author$project$FigmaPlugin$frameNodeExpr,
						$author$project$FigmaPlugin$frameNodeAttributes(parent),
						item);
				case 3:
					var item = node.a;
					var _v3 = _Utils_Tuple2(
						A2($author$project$FigmaPlugin$groupNodeAttributes, parent, item),
						item.bL);
					_v3$2:
					while (true) {
						if (!_v3.a.b) {
							if (_v3.b.b) {
								if (!_v3.b.b.b) {
									var _v4 = _v3.b;
									var head = _v4.a;
									var $temp$parent = $elm$core$Maybe$Just(
										$author$project$FigmaPlugin$getParentData_(item)),
										$temp$node = head;
									parent = $temp$parent;
									node = $temp$node;
									continue nodeToExpr;
								} else {
									break _v3$2;
								}
							} else {
								return $elm$core$Maybe$Nothing;
							}
						} else {
							break _v3$2;
						}
					}
					return $elm$core$Maybe$Just(
						A2(
							$author$project$FigmaPlugin$columnExpr,
							A2($author$project$FigmaPlugin$groupNodeAttributes, parent, item),
							A2(
								$elm$core$List$filterMap,
								$author$project$FigmaPlugin$nodeToExpr(
									$elm$core$Maybe$Just(
										$author$project$FigmaPlugin$getParentData_(item))),
								A2($elm$core$List$filter, $author$project$FigmaPlugin$isNodeVisible, item.bL))));
				case 4:
					var item = node.a;
					return $elm$core$Maybe$Just(
						$the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
							_List_fromArray(
								[
									A2(
									$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
									_List_fromArray(
										['Element']),
									'el'),
									$the_sett$elm_syntax_dsl$Elm$CodeGen$list(
									A2($author$project$FigmaPlugin$ellipseNodeAttributes, parent, item)),
									A2(
									$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
									_List_fromArray(
										['Element']),
									'none')
								])));
				case 5:
					return $elm$core$Maybe$Just(
						$author$project$FigmaPlugin$textExpr('TODO: handle vectors'));
				default:
					var item = node.a;
					return A2($author$project$FigmaPlugin$frameNodeExpr, $author$project$FigmaPlugin$instanceNodeAttributes, item);
			}
		}
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $the_sett$elm_pretty_printer$Internals$NLine = F3(
	function (a, b, c) {
		return {$: 2, a: a, b: b, c: c};
	});
var $the_sett$elm_pretty_printer$Internals$NNil = {$: 0};
var $the_sett$elm_pretty_printer$Internals$NText = F3(
	function (a, b, c) {
		return {$: 1, a: a, b: b, c: c};
	});
var $elm$core$String$length = _String_length;
var $the_sett$elm_pretty_printer$Internals$fits = F2(
	function (w, normal) {
		fits:
		while (true) {
			if (w < 0) {
				return false;
			} else {
				switch (normal.$) {
					case 0:
						return true;
					case 1:
						var text = normal.a;
						var innerNormal = normal.b;
						var $temp$w = w - $elm$core$String$length(text),
							$temp$normal = innerNormal(0);
						w = $temp$w;
						normal = $temp$normal;
						continue fits;
					default:
						return true;
				}
			}
		}
	});
var $the_sett$elm_pretty_printer$Internals$better = F4(
	function (w, k, doc, doc2Fn) {
		return A2($the_sett$elm_pretty_printer$Internals$fits, w - k, doc) ? doc : doc2Fn(0);
	});
var $the_sett$elm_pretty_printer$Internals$best = F3(
	function (width, startCol, x) {
		var be = F3(
			function (w, k, docs) {
				be:
				while (true) {
					if (!docs.b) {
						return $the_sett$elm_pretty_printer$Internals$NNil;
					} else {
						switch (docs.a.b.$) {
							case 0:
								var _v1 = docs.a;
								var i = _v1.a;
								var _v2 = _v1.b;
								var ds = docs.b;
								var $temp$w = w,
									$temp$k = k,
									$temp$docs = ds;
								w = $temp$w;
								k = $temp$k;
								docs = $temp$docs;
								continue be;
							case 1:
								var _v3 = docs.a;
								var i = _v3.a;
								var _v4 = _v3.b;
								var doc = _v4.a;
								var doc2 = _v4.b;
								var ds = docs.b;
								var $temp$w = w,
									$temp$k = k,
									$temp$docs = A2(
									$elm$core$List$cons,
									_Utils_Tuple2(
										i,
										doc(0)),
									A2(
										$elm$core$List$cons,
										_Utils_Tuple2(
											i,
											doc2(0)),
										ds));
								w = $temp$w;
								k = $temp$k;
								docs = $temp$docs;
								continue be;
							case 2:
								var _v5 = docs.a;
								var i = _v5.a;
								var _v6 = _v5.b;
								var j = _v6.a;
								var doc = _v6.b;
								var ds = docs.b;
								var $temp$w = w,
									$temp$k = k,
									$temp$docs = A2(
									$elm$core$List$cons,
									_Utils_Tuple2(
										i + j,
										doc(0)),
									ds);
								w = $temp$w;
								k = $temp$k;
								docs = $temp$docs;
								continue be;
							case 3:
								var _v7 = docs.a;
								var i = _v7.a;
								var _v8 = _v7.b;
								var text = _v8.a;
								var maybeTag = _v8.b;
								var ds = docs.b;
								return A3(
									$the_sett$elm_pretty_printer$Internals$NText,
									text,
									function (_v9) {
										return A3(
											be,
											w,
											k + $elm$core$String$length(text),
											ds);
									},
									maybeTag);
							case 4:
								var _v10 = docs.a;
								var i = _v10.a;
								var _v11 = _v10.b;
								var vsep = _v11.b;
								var ds = docs.b;
								return A3(
									$the_sett$elm_pretty_printer$Internals$NLine,
									i,
									vsep,
									function (_v12) {
										return A3(
											be,
											w,
											i + $elm$core$String$length(vsep),
											ds);
									});
							case 5:
								var _v13 = docs.a;
								var i = _v13.a;
								var _v14 = _v13.b;
								var doc = _v14.a;
								var doc2 = _v14.b;
								var ds = docs.b;
								return A4(
									$the_sett$elm_pretty_printer$Internals$better,
									w,
									k,
									A3(
										be,
										w,
										k,
										A2(
											$elm$core$List$cons,
											_Utils_Tuple2(i, doc),
											ds)),
									function (_v15) {
										return A3(
											be,
											w,
											k,
											A2(
												$elm$core$List$cons,
												_Utils_Tuple2(i, doc2),
												ds));
									});
							case 6:
								var _v16 = docs.a;
								var i = _v16.a;
								var fn = _v16.b.a;
								var ds = docs.b;
								var $temp$w = w,
									$temp$k = k,
									$temp$docs = A2(
									$elm$core$List$cons,
									_Utils_Tuple2(
										i,
										fn(i)),
									ds);
								w = $temp$w;
								k = $temp$k;
								docs = $temp$docs;
								continue be;
							default:
								var _v17 = docs.a;
								var i = _v17.a;
								var fn = _v17.b.a;
								var ds = docs.b;
								var $temp$w = w,
									$temp$k = k,
									$temp$docs = A2(
									$elm$core$List$cons,
									_Utils_Tuple2(
										i,
										fn(k)),
									ds);
								w = $temp$w;
								k = $temp$k;
								docs = $temp$docs;
								continue be;
						}
					}
				}
			});
		return A3(
			be,
			width,
			startCol,
			_List_fromArray(
				[
					_Utils_Tuple2(0, x)
				]));
	});
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $the_sett$elm_pretty_printer$Internals$copy = F2(
	function (i, s) {
		return (!i) ? '' : _Utils_ap(
			s,
			A2($the_sett$elm_pretty_printer$Internals$copy, i - 1, s));
	});
var $the_sett$elm_pretty_printer$Internals$layout = function (normal) {
	var layoutInner = F2(
		function (normal2, acc) {
			layoutInner:
			while (true) {
				switch (normal2.$) {
					case 0:
						return acc;
					case 1:
						var text = normal2.a;
						var innerNormal = normal2.b;
						var maybeTag = normal2.c;
						var $temp$normal2 = innerNormal(0),
							$temp$acc = A2($elm$core$List$cons, text, acc);
						normal2 = $temp$normal2;
						acc = $temp$acc;
						continue layoutInner;
					default:
						var i = normal2.a;
						var sep = normal2.b;
						var innerNormal = normal2.c;
						var norm = innerNormal(0);
						if (norm.$ === 2) {
							var $temp$normal2 = innerNormal(0),
								$temp$acc = A2($elm$core$List$cons, '\n' + sep, acc);
							normal2 = $temp$normal2;
							acc = $temp$acc;
							continue layoutInner;
						} else {
							var $temp$normal2 = innerNormal(0),
								$temp$acc = A2(
								$elm$core$List$cons,
								'\n' + (A2($the_sett$elm_pretty_printer$Internals$copy, i, ' ') + sep),
								acc);
							normal2 = $temp$normal2;
							acc = $temp$acc;
							continue layoutInner;
						}
				}
			}
		});
	return $elm$core$String$concat(
		$elm$core$List$reverse(
			A2(layoutInner, normal, _List_Nil)));
};
var $the_sett$elm_pretty_printer$Pretty$pretty = F2(
	function (w, doc) {
		return $the_sett$elm_pretty_printer$Internals$layout(
			A3($the_sett$elm_pretty_printer$Internals$best, w, 0, doc));
	});
var $the_sett$elm_pretty_printer$Internals$Concatenate = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $the_sett$elm_pretty_printer$Pretty$append = F2(
	function (doc1, doc2) {
		return A2(
			$the_sett$elm_pretty_printer$Internals$Concatenate,
			function (_v0) {
				return doc1;
			},
			function (_v1) {
				return doc2;
			});
	});
var $elm_community$basics_extra$Basics$Extra$flip = F3(
	function (f, b, a) {
		return A2(f, a, b);
	});
var $the_sett$elm_pretty_printer$Pretty$a = $elm_community$basics_extra$Basics$Extra$flip($the_sett$elm_pretty_printer$Pretty$append);
var $stil4m$elm_syntax$Elm$Syntax$Node$value = function (_v0) {
	var v = _v0.b;
	return v;
};
var $the_sett$elm_syntax_dsl$Util$denode = $stil4m$elm_syntax$Elm$Syntax$Node$value;
var $the_sett$elm_syntax_dsl$Elm$Pretty$adjustExpressionParentheses = F2(
	function (context, expression) {
		var shouldRemove = function (expr) {
			var _v3 = _Utils_Tuple3(context.bd, context.bc, expr);
			_v3$1:
			while (true) {
				if (_v3.a) {
					return true;
				} else {
					switch (_v3.c.$) {
						case 1:
							if (_v3.b) {
								break _v3$1;
							} else {
								return (context.kg < 11) ? true : false;
							}
						case 3:
							if (_v3.b) {
								break _v3$1;
							} else {
								var _v4 = _v3.c;
								return true;
							}
						case 7:
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 8:
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 9:
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 10:
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 11:
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 12:
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 13:
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 18:
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 19:
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 20:
							if (_v3.b) {
								break _v3$1;
							} else {
								var _v5 = _v3.c;
								return true;
							}
						case 21:
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 22:
							if (_v3.b) {
								break _v3$1;
							} else {
								var _v6 = _v3.c;
								return true;
							}
						default:
							if (_v3.b) {
								break _v3$1;
							} else {
								return false;
							}
					}
				}
			}
			return true;
		};
		var removeParens = function (expr) {
			if (expr.$ === 14) {
				var innerExpr = expr.a;
				return shouldRemove(
					$the_sett$elm_syntax_dsl$Util$denode(innerExpr)) ? removeParens(
					$the_sett$elm_syntax_dsl$Util$denode(innerExpr)) : expr;
			} else {
				return expr;
			}
		};
		var addParens = function (expr) {
			var _v1 = _Utils_Tuple3(context.bd, context.bc, expr);
			_v1$4:
			while (true) {
				if ((!_v1.a) && (!_v1.b)) {
					switch (_v1.c.$) {
						case 15:
							return $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression(
								$the_sett$elm_syntax_dsl$Util$nodify(expr));
						case 16:
							return $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression(
								$the_sett$elm_syntax_dsl$Util$nodify(expr));
						case 17:
							return $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression(
								$the_sett$elm_syntax_dsl$Util$nodify(expr));
						case 4:
							var _v2 = _v1.c;
							return $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression(
								$the_sett$elm_syntax_dsl$Util$nodify(expr));
						default:
							break _v1$4;
					}
				} else {
					break _v1$4;
				}
			}
			return expr;
		};
		return addParens(
			removeParens(expression));
	});
var $the_sett$elm_pretty_printer$Internals$Column = function (a) {
	return {$: 7, a: a};
};
var $the_sett$elm_pretty_printer$Pretty$column = $the_sett$elm_pretty_printer$Internals$Column;
var $the_sett$elm_pretty_printer$Internals$Nest = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $the_sett$elm_pretty_printer$Pretty$nest = F2(
	function (depth, doc) {
		return A2(
			$the_sett$elm_pretty_printer$Internals$Nest,
			depth,
			function (_v0) {
				return doc;
			});
	});
var $the_sett$elm_pretty_printer$Internals$Nesting = function (a) {
	return {$: 6, a: a};
};
var $the_sett$elm_pretty_printer$Pretty$nesting = $the_sett$elm_pretty_printer$Internals$Nesting;
var $the_sett$elm_pretty_printer$Pretty$align = function (doc) {
	return $the_sett$elm_pretty_printer$Pretty$column(
		function (currentColumn) {
			return $the_sett$elm_pretty_printer$Pretty$nesting(
				function (indentLvl) {
					return A2($the_sett$elm_pretty_printer$Pretty$nest, currentColumn - indentLvl, doc);
				});
		});
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $Chadtech$elm_bool_extra$Bool$Extra$any = $elm$core$List$any($elm$core$Basics$identity);
var $elm$core$Basics$modBy = _Basics_modBy;
var $the_sett$elm_syntax_dsl$Elm$Pretty$decrementIndent = F2(
	function (currentIndent, spaces) {
		var modded = A2($elm$core$Basics$modBy, 4, currentIndent - spaces);
		return (!modded) ? 4 : modded;
	});
var $the_sett$elm_syntax_dsl$Util$denodeAll = $elm$core$List$map($the_sett$elm_syntax_dsl$Util$denode);
var $the_sett$elm_syntax_dsl$Util$denodeMaybe = $elm$core$Maybe$map($the_sett$elm_syntax_dsl$Util$denode);
var $the_sett$elm_pretty_printer$Internals$Text = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $the_sett$elm_pretty_printer$Pretty$string = function (val) {
	return A2($the_sett$elm_pretty_printer$Internals$Text, val, $elm$core$Maybe$Nothing);
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$dot = $the_sett$elm_pretty_printer$Pretty$string('.');
var $the_sett$elm_pretty_printer$Internals$Empty = {$: 0};
var $the_sett$elm_pretty_printer$Pretty$empty = $the_sett$elm_pretty_printer$Internals$Empty;
var $the_sett$elm_pretty_printer$Pretty$join = F2(
	function (sep, docs) {
		join:
		while (true) {
			if (!docs.b) {
				return $the_sett$elm_pretty_printer$Pretty$empty;
			} else {
				if (!docs.a.$) {
					var _v1 = docs.a;
					var ds = docs.b;
					var $temp$sep = sep,
						$temp$docs = ds;
					sep = $temp$sep;
					docs = $temp$docs;
					continue join;
				} else {
					var d = docs.a;
					var ds = docs.b;
					var step = F2(
						function (x, rest) {
							if (!x.$) {
								return rest;
							} else {
								var doc = x;
								return A2(
									$the_sett$elm_pretty_printer$Pretty$append,
									sep,
									A2($the_sett$elm_pretty_printer$Pretty$append, doc, rest));
							}
						});
					var spersed = A3($elm$core$List$foldr, step, $the_sett$elm_pretty_printer$Pretty$empty, ds);
					return A2($the_sett$elm_pretty_printer$Pretty$append, d, spersed);
				}
			}
		}
	});
var $the_sett$elm_pretty_printer$Internals$Line = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $the_sett$elm_pretty_printer$Pretty$line = A2($the_sett$elm_pretty_printer$Internals$Line, ' ', '');
var $the_sett$elm_syntax_dsl$Elm$Pretty$doubleLines = $the_sett$elm_pretty_printer$Pretty$join(
	A2($the_sett$elm_pretty_printer$Pretty$a, $the_sett$elm_pretty_printer$Pretty$line, $the_sett$elm_pretty_printer$Pretty$line));
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$escapeChar = function (val) {
	switch (val) {
		case '\\':
			return '\\\\';
		case '\'':
			return '\\\'';
		case '\t':
			return '\\t';
		case '\n':
			return '\\n';
		default:
			var c = val;
			return $elm$core$String$fromChar(c);
	}
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $the_sett$elm_pretty_printer$Pretty$hang = F2(
	function (spaces, doc) {
		return $the_sett$elm_pretty_printer$Pretty$align(
			A2($the_sett$elm_pretty_printer$Pretty$nest, spaces, doc));
	});
var $the_sett$elm_pretty_printer$Pretty$indent = F2(
	function (spaces, doc) {
		return A2(
			$the_sett$elm_pretty_printer$Pretty$hang,
			spaces,
			A2(
				$the_sett$elm_pretty_printer$Pretty$append,
				$the_sett$elm_pretty_printer$Pretty$string(
					A2($the_sett$elm_pretty_printer$Internals$copy, spaces, ' ')),
				doc));
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$KeywordTag = 0;
var $the_sett$elm_pretty_printer$Pretty$taggedString = F2(
	function (val, tag) {
		return A2(
			$the_sett$elm_pretty_printer$Internals$Text,
			val,
			$elm$core$Maybe$Just(tag));
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$toToken = F2(
	function (t, str) {
		return A2($the_sett$elm_pretty_printer$Pretty$taggedString, str, t);
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$keyword = $the_sett$elm_syntax_dsl$Elm$Pretty$toToken(0);
var $the_sett$elm_pretty_printer$Pretty$lines = $the_sett$elm_pretty_printer$Pretty$join($the_sett$elm_pretty_printer$Pretty$line);
var $the_sett$elm_syntax_dsl$Elm$Pretty$LiteralTag = 6;
var $the_sett$elm_syntax_dsl$Elm$Pretty$literal = $the_sett$elm_syntax_dsl$Elm$Pretty$toToken(6);
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$NumberTag = 7;
var $the_sett$elm_syntax_dsl$Elm$Pretty$number = $the_sett$elm_syntax_dsl$Elm$Pretty$toToken(7);
var $the_sett$elm_syntax_dsl$Elm$Pretty$OperatorTag = 2;
var $the_sett$elm_syntax_dsl$Elm$Pretty$operator = $the_sett$elm_syntax_dsl$Elm$Pretty$toToken(2);
var $the_sett$elm_pretty_printer$Internals$Union = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var $the_sett$elm_pretty_printer$Internals$flatten = function (doc) {
	flatten:
	while (true) {
		switch (doc.$) {
			case 1:
				var doc1 = doc.a;
				var doc2 = doc.b;
				return A2(
					$the_sett$elm_pretty_printer$Internals$Concatenate,
					function (_v1) {
						return $the_sett$elm_pretty_printer$Internals$flatten(
							doc1(0));
					},
					function (_v2) {
						return $the_sett$elm_pretty_printer$Internals$flatten(
							doc2(0));
					});
			case 2:
				var i = doc.a;
				var doc1 = doc.b;
				return A2(
					$the_sett$elm_pretty_printer$Internals$Nest,
					i,
					function (_v3) {
						return $the_sett$elm_pretty_printer$Internals$flatten(
							doc1(0));
					});
			case 5:
				var doc1 = doc.a;
				var doc2 = doc.b;
				var $temp$doc = doc1;
				doc = $temp$doc;
				continue flatten;
			case 4:
				var hsep = doc.a;
				return A2($the_sett$elm_pretty_printer$Internals$Text, hsep, $elm$core$Maybe$Nothing);
			case 6:
				var fn = doc.a;
				var $temp$doc = fn(0);
				doc = $temp$doc;
				continue flatten;
			case 7:
				var fn = doc.a;
				var $temp$doc = fn(0);
				doc = $temp$doc;
				continue flatten;
			default:
				var x = doc;
				return x;
		}
	}
};
var $the_sett$elm_pretty_printer$Pretty$group = function (doc) {
	return A2(
		$the_sett$elm_pretty_printer$Internals$Union,
		$the_sett$elm_pretty_printer$Internals$flatten(doc),
		doc);
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup = F2(
	function (flag, doc) {
		return flag ? doc : $the_sett$elm_pretty_printer$Pretty$group(doc);
	});
var $the_sett$elm_pretty_printer$Pretty$char = function (c) {
	return A2(
		$the_sett$elm_pretty_printer$Internals$Text,
		$elm$core$String$fromChar(c),
		$elm$core$Maybe$Nothing);
};
var $the_sett$elm_pretty_printer$Pretty$surround = F3(
	function (left, right, doc) {
		return A2(
			$the_sett$elm_pretty_printer$Pretty$append,
			A2($the_sett$elm_pretty_printer$Pretty$append, left, doc),
			right);
	});
var $the_sett$elm_pretty_printer$Pretty$parens = function (doc) {
	return A3(
		$the_sett$elm_pretty_printer$Pretty$surround,
		$the_sett$elm_pretty_printer$Pretty$char('('),
		$the_sett$elm_pretty_printer$Pretty$char(')'),
		doc);
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$precedence = function (symbol) {
	switch (symbol) {
		case '>>':
			return 9;
		case '<<':
			return 9;
		case '^':
			return 8;
		case '*':
			return 7;
		case '/':
			return 7;
		case '//':
			return 7;
		case '%':
			return 7;
		case 'rem':
			return 7;
		case '+':
			return 6;
		case '-':
			return 6;
		case '++':
			return 5;
		case '::':
			return 5;
		case '==':
			return 4;
		case '/=':
			return 4;
		case '<':
			return 4;
		case '>':
			return 4;
		case '<=':
			return 4;
		case '>=':
			return 4;
		case '&&':
			return 3;
		case '||':
			return 2;
		case '|>':
			return 0;
		case '<|':
			return 0;
		default:
			return 0;
	}
};
var $stil4m$elm_syntax$Elm$Syntax$Pattern$ParenthesizedPattern = function (a) {
	return {$: 14, a: a};
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$adjustPatternParentheses = F2(
	function (isTop, pattern) {
		var shouldRemove = function (pat) {
			var _v5 = _Utils_Tuple2(isTop, pat);
			_v5$2:
			while (true) {
				switch (_v5.b.$) {
					case 12:
						if (!_v5.a) {
							var _v6 = _v5.b;
							return false;
						} else {
							break _v5$2;
						}
					case 13:
						var _v7 = _v5.b;
						return false;
					default:
						break _v5$2;
				}
			}
			return isTop;
		};
		var removeParens = function (pat) {
			if (pat.$ === 14) {
				var innerPat = pat.a;
				return shouldRemove(
					$the_sett$elm_syntax_dsl$Util$denode(innerPat)) ? removeParens(
					$the_sett$elm_syntax_dsl$Util$denode(innerPat)) : pat;
			} else {
				return pat;
			}
		};
		var addParens = function (pat) {
			var _v1 = _Utils_Tuple2(isTop, pat);
			_v1$2:
			while (true) {
				if (!_v1.a) {
					switch (_v1.b.$) {
						case 12:
							if (_v1.b.b.b) {
								var _v2 = _v1.b;
								var _v3 = _v2.b;
								return $stil4m$elm_syntax$Elm$Syntax$Pattern$ParenthesizedPattern(
									$the_sett$elm_syntax_dsl$Util$nodify(pat));
							} else {
								break _v1$2;
							}
						case 13:
							var _v4 = _v1.b;
							return $stil4m$elm_syntax$Elm$Syntax$Pattern$ParenthesizedPattern(
								$the_sett$elm_syntax_dsl$Util$nodify(pat));
						default:
							break _v1$2;
					}
				} else {
					break _v1$2;
				}
			}
			return pat;
		};
		return addParens(
			removeParens(pattern));
	});
var $the_sett$elm_pretty_printer$Pretty$braces = function (doc) {
	return A3(
		$the_sett$elm_pretty_printer$Pretty$surround,
		$the_sett$elm_pretty_printer$Pretty$char('{'),
		$the_sett$elm_pretty_printer$Pretty$char('}'),
		doc);
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$TypeTag = 3;
var $the_sett$elm_syntax_dsl$Elm$Pretty$type_ = $the_sett$elm_syntax_dsl$Elm$Pretty$toToken(3);
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyModuleNameDot = function (name) {
	if (!name.b) {
		return $the_sett$elm_pretty_printer$Pretty$empty;
	} else {
		return A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_syntax_dsl$Elm$Pretty$dot,
			A2(
				$the_sett$elm_pretty_printer$Pretty$join,
				$the_sett$elm_syntax_dsl$Elm$Pretty$dot,
				A2($elm$core$List$map, $the_sett$elm_syntax_dsl$Elm$Pretty$type_, name)));
	}
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$quotes = function (doc) {
	return A3(
		$the_sett$elm_pretty_printer$Pretty$surround,
		$the_sett$elm_syntax_dsl$Elm$Pretty$literal('\"'),
		$the_sett$elm_syntax_dsl$Elm$Pretty$literal('\"'),
		doc);
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$singleQuotes = function (doc) {
	return A3(
		$the_sett$elm_pretty_printer$Pretty$surround,
		$the_sett$elm_syntax_dsl$Elm$Pretty$literal('\''),
		$the_sett$elm_syntax_dsl$Elm$Pretty$literal('\''),
		doc);
};
var $the_sett$elm_pretty_printer$Pretty$space = $the_sett$elm_pretty_printer$Pretty$char(' ');
var $the_sett$elm_syntax_dsl$Elm$Pretty$StatementTag = 4;
var $the_sett$elm_syntax_dsl$Elm$Pretty$statement = $the_sett$elm_syntax_dsl$Elm$Pretty$toToken(4);
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)),
			string);
	});
var $elm$core$String$fromList = _String_fromList;
var $rtfeldman$elm_hex$Hex$unsafeToDigit = function (num) {
	unsafeToDigit:
	while (true) {
		switch (num) {
			case 0:
				return '0';
			case 1:
				return '1';
			case 2:
				return '2';
			case 3:
				return '3';
			case 4:
				return '4';
			case 5:
				return '5';
			case 6:
				return '6';
			case 7:
				return '7';
			case 8:
				return '8';
			case 9:
				return '9';
			case 10:
				return 'a';
			case 11:
				return 'b';
			case 12:
				return 'c';
			case 13:
				return 'd';
			case 14:
				return 'e';
			case 15:
				return 'f';
			default:
				var $temp$num = num;
				num = $temp$num;
				continue unsafeToDigit;
		}
	}
};
var $rtfeldman$elm_hex$Hex$unsafePositiveToDigits = F2(
	function (digits, num) {
		unsafePositiveToDigits:
		while (true) {
			if (num < 16) {
				return A2(
					$elm$core$List$cons,
					$rtfeldman$elm_hex$Hex$unsafeToDigit(num),
					digits);
			} else {
				var $temp$digits = A2(
					$elm$core$List$cons,
					$rtfeldman$elm_hex$Hex$unsafeToDigit(
						A2($elm$core$Basics$modBy, 16, num)),
					digits),
					$temp$num = (num / 16) | 0;
				digits = $temp$digits;
				num = $temp$num;
				continue unsafePositiveToDigits;
			}
		}
	});
var $rtfeldman$elm_hex$Hex$toString = function (num) {
	return $elm$core$String$fromList(
		(num < 0) ? A2(
			$elm$core$List$cons,
			'-',
			A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, -num)) : A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, num));
};
var $elm$core$String$toUpper = _String_toUpper;
var $the_sett$elm_syntax_dsl$Elm$Pretty$toHexString = function (val) {
	var padWithZeros = function (str) {
		var length = $elm$core$String$length(str);
		return (length < 2) ? A3($elm$core$String$padLeft, 2, '0', str) : (((length > 2) && (length < 4)) ? A3($elm$core$String$padLeft, 4, '0', str) : (((length > 4) && (length < 8)) ? A3($elm$core$String$padLeft, 8, '0', str) : str));
	};
	return '0x' + padWithZeros(
		$elm$core$String$toUpper(
			$rtfeldman$elm_hex$Hex$toString(val)));
};
var $the_sett$elm_pretty_printer$Pretty$words = $the_sett$elm_pretty_printer$Pretty$join($the_sett$elm_pretty_printer$Pretty$space);
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyPatternInner = F2(
	function (isTop, pattern) {
		var _v0 = A2($the_sett$elm_syntax_dsl$Elm$Pretty$adjustPatternParentheses, isTop, pattern);
		switch (_v0.$) {
			case 0:
				return $the_sett$elm_syntax_dsl$Elm$Pretty$statement('_');
			case 1:
				return $the_sett$elm_syntax_dsl$Elm$Pretty$statement('()');
			case 2:
				var val = _v0.a;
				return $the_sett$elm_syntax_dsl$Elm$Pretty$singleQuotes(
					$the_sett$elm_syntax_dsl$Elm$Pretty$literal(
						$the_sett$elm_syntax_dsl$Elm$Pretty$escapeChar(val)));
			case 3:
				var val = _v0.a;
				return $the_sett$elm_syntax_dsl$Elm$Pretty$quotes(
					$the_sett$elm_syntax_dsl$Elm$Pretty$literal(val));
			case 4:
				var val = _v0.a;
				return $the_sett$elm_syntax_dsl$Elm$Pretty$number(
					$elm$core$String$fromInt(val));
			case 5:
				var val = _v0.a;
				return $the_sett$elm_syntax_dsl$Elm$Pretty$number(
					$the_sett$elm_syntax_dsl$Elm$Pretty$toHexString(val));
			case 6:
				var val = _v0.a;
				return $the_sett$elm_syntax_dsl$Elm$Pretty$number(
					$elm$core$String$fromFloat(val));
			case 7:
				var vals = _v0.a;
				return $the_sett$elm_pretty_printer$Pretty$parens(
					A2(
						$the_sett$elm_pretty_printer$Pretty$a,
						$the_sett$elm_pretty_printer$Pretty$space,
						A2(
							$the_sett$elm_pretty_printer$Pretty$a,
							A2(
								$the_sett$elm_pretty_printer$Pretty$join,
								$the_sett$elm_pretty_printer$Pretty$string(', '),
								A2(
									$elm$core$List$map,
									$the_sett$elm_syntax_dsl$Elm$Pretty$prettyPatternInner(true),
									$the_sett$elm_syntax_dsl$Util$denodeAll(vals))),
							$the_sett$elm_pretty_printer$Pretty$space)));
			case 8:
				var fields = _v0.a;
				return $the_sett$elm_pretty_printer$Pretty$braces(
					A3(
						$the_sett$elm_pretty_printer$Pretty$surround,
						$the_sett$elm_pretty_printer$Pretty$space,
						$the_sett$elm_pretty_printer$Pretty$space,
						A2(
							$the_sett$elm_pretty_printer$Pretty$join,
							$the_sett$elm_pretty_printer$Pretty$string(', '),
							A2(
								$elm$core$List$map,
								$the_sett$elm_syntax_dsl$Elm$Pretty$statement,
								$the_sett$elm_syntax_dsl$Util$denodeAll(fields)))));
			case 9:
				var hdPat = _v0.a;
				var tlPat = _v0.b;
				return $the_sett$elm_pretty_printer$Pretty$words(
					_List_fromArray(
						[
							A2(
							$the_sett$elm_syntax_dsl$Elm$Pretty$prettyPatternInner,
							false,
							$the_sett$elm_syntax_dsl$Util$denode(hdPat)),
							$the_sett$elm_syntax_dsl$Elm$Pretty$operator('::'),
							A2(
							$the_sett$elm_syntax_dsl$Elm$Pretty$prettyPatternInner,
							false,
							$the_sett$elm_syntax_dsl$Util$denode(tlPat))
						]));
			case 10:
				var listPats = _v0.a;
				if (!listPats.b) {
					return $the_sett$elm_pretty_printer$Pretty$string('[]');
				} else {
					var open = A2(
						$the_sett$elm_pretty_printer$Pretty$a,
						$the_sett$elm_pretty_printer$Pretty$space,
						$the_sett$elm_pretty_printer$Pretty$string('['));
					var close = A2(
						$the_sett$elm_pretty_printer$Pretty$a,
						$the_sett$elm_pretty_printer$Pretty$string(']'),
						$the_sett$elm_pretty_printer$Pretty$space);
					return A3(
						$the_sett$elm_pretty_printer$Pretty$surround,
						open,
						close,
						A2(
							$the_sett$elm_pretty_printer$Pretty$join,
							$the_sett$elm_pretty_printer$Pretty$string(', '),
							A2(
								$elm$core$List$map,
								$the_sett$elm_syntax_dsl$Elm$Pretty$prettyPatternInner(false),
								$the_sett$elm_syntax_dsl$Util$denodeAll(listPats))));
				}
			case 11:
				var _var = _v0.a;
				return $the_sett$elm_syntax_dsl$Elm$Pretty$statement(_var);
			case 12:
				var qnRef = _v0.a;
				var listPats = _v0.b;
				return $the_sett$elm_pretty_printer$Pretty$words(
					A2(
						$elm$core$List$cons,
						A2(
							$the_sett$elm_pretty_printer$Pretty$a,
							$the_sett$elm_syntax_dsl$Elm$Pretty$type_(qnRef.fZ),
							$the_sett$elm_syntax_dsl$Elm$Pretty$prettyModuleNameDot(qnRef.bz)),
						A2(
							$elm$core$List$map,
							$the_sett$elm_syntax_dsl$Elm$Pretty$prettyPatternInner(false),
							$the_sett$elm_syntax_dsl$Util$denodeAll(listPats))));
			case 13:
				var pat = _v0.a;
				var name = _v0.b;
				return $the_sett$elm_pretty_printer$Pretty$words(
					_List_fromArray(
						[
							A2(
							$the_sett$elm_syntax_dsl$Elm$Pretty$prettyPatternInner,
							false,
							$the_sett$elm_syntax_dsl$Util$denode(pat)),
							$the_sett$elm_syntax_dsl$Elm$Pretty$keyword('as'),
							$the_sett$elm_syntax_dsl$Elm$Pretty$statement(
							$the_sett$elm_syntax_dsl$Util$denode(name))
						]));
			default:
				var pat = _v0.a;
				return $the_sett$elm_pretty_printer$Pretty$parens(
					A2(
						$the_sett$elm_syntax_dsl$Elm$Pretty$prettyPatternInner,
						true,
						$the_sett$elm_syntax_dsl$Util$denode(pat)));
		}
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyArgs = function (args) {
	return $the_sett$elm_pretty_printer$Pretty$words(
		A2(
			$elm$core$List$map,
			$the_sett$elm_syntax_dsl$Elm$Pretty$prettyPatternInner(false),
			args));
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$CommentTag = 1;
var $the_sett$elm_syntax_dsl$Elm$Pretty$comment = $the_sett$elm_syntax_dsl$Elm$Pretty$toToken(1);
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyDocumentation = function (docs) {
	return $the_sett$elm_syntax_dsl$Elm$Pretty$comment(docs);
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyFunctionOrValue = F2(
	function (modl, val) {
		var token = function () {
			var _v0 = $elm$core$String$uncons(val);
			if (!_v0.$) {
				var _v1 = _v0.a;
				var c = _v1.a;
				return $elm$core$Char$isUpper(c) ? $the_sett$elm_syntax_dsl$Elm$Pretty$type_(val) : $the_sett$elm_syntax_dsl$Elm$Pretty$statement(val);
			} else {
				return $the_sett$elm_syntax_dsl$Elm$Pretty$statement(val);
			}
		}();
		return _Utils_Tuple2(
			A2(
				$the_sett$elm_pretty_printer$Pretty$a,
				token,
				$the_sett$elm_syntax_dsl$Elm$Pretty$prettyModuleNameDot(modl)),
			false);
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$escape = function (val) {
	return A3(
		$elm$core$String$replace,
		'\t',
		'\\t',
		A3(
			$elm$core$String$replace,
			'\n',
			'\\n',
			A3(
				$elm$core$String$replace,
				'\"',
				'\\\"',
				A3($elm$core$String$replace, '\\', '\\\\', val))));
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyLiteral = function (val) {
	return $the_sett$elm_syntax_dsl$Elm$Pretty$quotes(
		$the_sett$elm_syntax_dsl$Elm$Pretty$literal(
			$the_sett$elm_syntax_dsl$Elm$Pretty$escape(val)));
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyMaybe = F2(
	function (prettyFn, maybeVal) {
		return A2(
			$elm$core$Maybe$withDefault,
			$the_sett$elm_pretty_printer$Pretty$empty,
			A2($elm$core$Maybe$map, prettyFn, maybeVal));
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyPattern = function (pattern) {
	return A2($the_sett$elm_syntax_dsl$Elm$Pretty$prettyPatternInner, true, pattern);
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$isNakedCompound = function (typeAnn) {
	switch (typeAnn.$) {
		case 1:
			if (!typeAnn.b.b) {
				return false;
			} else {
				var args = typeAnn.b;
				return true;
			}
		case 6:
			return true;
		default:
			return false;
	}
};
var $elm$core$Tuple$mapBoth = F3(
	function (funcA, funcB, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			funcA(x),
			funcB(y));
	});
var $the_sett$elm_pretty_printer$Pretty$separators = function (sep) {
	return $the_sett$elm_pretty_printer$Pretty$join(
		A2($the_sett$elm_pretty_printer$Internals$Line, sep, sep));
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyFieldTypeAnn = function (_v8) {
	var name = _v8.a;
	var ann = _v8.b;
	return $the_sett$elm_pretty_printer$Pretty$group(
		A2(
			$the_sett$elm_pretty_printer$Pretty$nest,
			4,
			$the_sett$elm_pretty_printer$Pretty$lines(
				_List_fromArray(
					[
						$the_sett$elm_pretty_printer$Pretty$words(
						_List_fromArray(
							[
								$the_sett$elm_syntax_dsl$Elm$Pretty$statement(name),
								$the_sett$elm_pretty_printer$Pretty$string(':')
							])),
						$the_sett$elm_syntax_dsl$Elm$Pretty$prettyTypeAnnotation(ann)
					]))));
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyFunctionTypeAnnotation = F2(
	function (left, right) {
		var expandLeft = function (ann) {
			if (ann.$ === 6) {
				return $the_sett$elm_syntax_dsl$Elm$Pretty$prettyTypeAnnotationParens(ann);
			} else {
				return $the_sett$elm_syntax_dsl$Elm$Pretty$prettyTypeAnnotation(ann);
			}
		};
		var innerFnTypeAnn = F2(
			function (innerLeft, innerRight) {
				var rightSide = expandRight(
					$the_sett$elm_syntax_dsl$Util$denode(innerRight));
				if (rightSide.b) {
					var hd = rightSide.a;
					var tl = rightSide.b;
					return A2(
						$elm$core$List$cons,
						expandLeft(
							$the_sett$elm_syntax_dsl$Util$denode(innerLeft)),
						A2(
							$elm$core$List$cons,
							$the_sett$elm_pretty_printer$Pretty$words(
								_List_fromArray(
									[
										$the_sett$elm_pretty_printer$Pretty$string('->'),
										hd
									])),
							tl));
				} else {
					return _List_Nil;
				}
			});
		var expandRight = function (ann) {
			if (ann.$ === 6) {
				var innerLeft = ann.a;
				var innerRight = ann.b;
				return A2(innerFnTypeAnn, innerLeft, innerRight);
			} else {
				return _List_fromArray(
					[
						$the_sett$elm_syntax_dsl$Elm$Pretty$prettyTypeAnnotation(ann)
					]);
			}
		};
		return $the_sett$elm_pretty_printer$Pretty$group(
			$the_sett$elm_pretty_printer$Pretty$lines(
				A2(innerFnTypeAnn, left, right)));
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyGenericRecord = F2(
	function (paramName, fields) {
		var open = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$line,
			$the_sett$elm_pretty_printer$Pretty$words(
				_List_fromArray(
					[
						$the_sett$elm_pretty_printer$Pretty$string('{'),
						$the_sett$elm_syntax_dsl$Elm$Pretty$statement(paramName)
					])));
		var close = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$string('}'),
			$the_sett$elm_pretty_printer$Pretty$line);
		var addBarToFirst = function (exprs) {
			if (!exprs.b) {
				return _List_Nil;
			} else {
				var hd = exprs.a;
				var tl = exprs.b;
				return A2(
					$elm$core$List$cons,
					A2(
						$the_sett$elm_pretty_printer$Pretty$a,
						hd,
						$the_sett$elm_pretty_printer$Pretty$string('| ')),
					tl);
			}
		};
		if (!fields.b) {
			return $the_sett$elm_pretty_printer$Pretty$string('{}');
		} else {
			return $the_sett$elm_pretty_printer$Pretty$group(
				A3(
					$the_sett$elm_pretty_printer$Pretty$surround,
					$the_sett$elm_pretty_printer$Pretty$empty,
					close,
					A2(
						$the_sett$elm_pretty_printer$Pretty$nest,
						4,
						A2(
							$the_sett$elm_pretty_printer$Pretty$a,
							A2(
								$the_sett$elm_pretty_printer$Pretty$separators,
								', ',
								addBarToFirst(
									A2(
										$elm$core$List$map,
										$the_sett$elm_syntax_dsl$Elm$Pretty$prettyFieldTypeAnn,
										A2(
											$elm$core$List$map,
											A2($elm$core$Tuple$mapBoth, $the_sett$elm_syntax_dsl$Util$denode, $the_sett$elm_syntax_dsl$Util$denode),
											fields)))),
							open))));
		}
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyRecord = function (fields) {
	var open = A2(
		$the_sett$elm_pretty_printer$Pretty$a,
		$the_sett$elm_pretty_printer$Pretty$space,
		$the_sett$elm_pretty_printer$Pretty$string('{'));
	var close = A2(
		$the_sett$elm_pretty_printer$Pretty$a,
		$the_sett$elm_pretty_printer$Pretty$string('}'),
		$the_sett$elm_pretty_printer$Pretty$line);
	if (!fields.b) {
		return $the_sett$elm_pretty_printer$Pretty$string('{}');
	} else {
		return $the_sett$elm_pretty_printer$Pretty$group(
			A3(
				$the_sett$elm_pretty_printer$Pretty$surround,
				open,
				close,
				A2(
					$the_sett$elm_pretty_printer$Pretty$separators,
					', ',
					A2(
						$elm$core$List$map,
						$the_sett$elm_syntax_dsl$Elm$Pretty$prettyFieldTypeAnn,
						A2(
							$elm$core$List$map,
							A2($elm$core$Tuple$mapBoth, $the_sett$elm_syntax_dsl$Util$denode, $the_sett$elm_syntax_dsl$Util$denode),
							fields)))));
	}
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyTupled = function (anns) {
	return $the_sett$elm_pretty_printer$Pretty$parens(
		A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$space,
			A2(
				$the_sett$elm_pretty_printer$Pretty$a,
				A2(
					$the_sett$elm_pretty_printer$Pretty$join,
					$the_sett$elm_pretty_printer$Pretty$string(', '),
					A2(
						$elm$core$List$map,
						$the_sett$elm_syntax_dsl$Elm$Pretty$prettyTypeAnnotation,
						$the_sett$elm_syntax_dsl$Util$denodeAll(anns))),
				$the_sett$elm_pretty_printer$Pretty$space)));
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyTypeAnnotation = function (typeAnn) {
	switch (typeAnn.$) {
		case 0:
			var val = typeAnn.a;
			return $the_sett$elm_syntax_dsl$Elm$Pretty$statement(val);
		case 1:
			var fqName = typeAnn.a;
			var anns = typeAnn.b;
			return A2($the_sett$elm_syntax_dsl$Elm$Pretty$prettyTyped, fqName, anns);
		case 2:
			return $the_sett$elm_syntax_dsl$Elm$Pretty$statement('()');
		case 3:
			var anns = typeAnn.a;
			return $the_sett$elm_syntax_dsl$Elm$Pretty$prettyTupled(anns);
		case 4:
			var recordDef = typeAnn.a;
			return $the_sett$elm_syntax_dsl$Elm$Pretty$prettyRecord(
				$the_sett$elm_syntax_dsl$Util$denodeAll(recordDef));
		case 5:
			var paramName = typeAnn.a;
			var recordDef = typeAnn.b;
			return A2(
				$the_sett$elm_syntax_dsl$Elm$Pretty$prettyGenericRecord,
				$the_sett$elm_syntax_dsl$Util$denode(paramName),
				$the_sett$elm_syntax_dsl$Util$denodeAll(
					$the_sett$elm_syntax_dsl$Util$denode(recordDef)));
		default:
			var fromAnn = typeAnn.a;
			var toAnn = typeAnn.b;
			return A2($the_sett$elm_syntax_dsl$Elm$Pretty$prettyFunctionTypeAnnotation, fromAnn, toAnn);
	}
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyTypeAnnotationParens = function (typeAnn) {
	return $the_sett$elm_syntax_dsl$Elm$Pretty$isNakedCompound(typeAnn) ? $the_sett$elm_pretty_printer$Pretty$parens(
		$the_sett$elm_syntax_dsl$Elm$Pretty$prettyTypeAnnotation(typeAnn)) : $the_sett$elm_syntax_dsl$Elm$Pretty$prettyTypeAnnotation(typeAnn);
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyTyped = F2(
	function (fqName, anns) {
		var argsDoc = $the_sett$elm_pretty_printer$Pretty$words(
			A2(
				$elm$core$List$map,
				$the_sett$elm_syntax_dsl$Elm$Pretty$prettyTypeAnnotationParens,
				$the_sett$elm_syntax_dsl$Util$denodeAll(anns)));
		var _v0 = $the_sett$elm_syntax_dsl$Util$denode(fqName);
		var moduleName = _v0.a;
		var typeName = _v0.b;
		var typeDoc = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_syntax_dsl$Elm$Pretty$type_(typeName),
			$the_sett$elm_syntax_dsl$Elm$Pretty$prettyModuleNameDot(moduleName));
		return $the_sett$elm_pretty_printer$Pretty$words(
			_List_fromArray(
				[typeDoc, argsDoc]));
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$SignatureTag = 5;
var $the_sett$elm_syntax_dsl$Elm$Pretty$signature = $the_sett$elm_syntax_dsl$Elm$Pretty$toToken(5);
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettySignature = function (sig) {
	return $the_sett$elm_pretty_printer$Pretty$group(
		A2(
			$the_sett$elm_pretty_printer$Pretty$nest,
			4,
			$the_sett$elm_pretty_printer$Pretty$lines(
				_List_fromArray(
					[
						$the_sett$elm_pretty_printer$Pretty$words(
						_List_fromArray(
							[
								$the_sett$elm_syntax_dsl$Elm$Pretty$signature(
								$the_sett$elm_syntax_dsl$Util$denode(sig.fZ)),
								$the_sett$elm_pretty_printer$Pretty$string(':')
							])),
						$the_sett$elm_syntax_dsl$Elm$Pretty$prettyTypeAnnotation(
						$the_sett$elm_syntax_dsl$Util$denode(sig.kZ))
					]))));
};
var $the_sett$elm_pretty_printer$Pretty$tightline = A2($the_sett$elm_pretty_printer$Internals$Line, '', '');
var $the_sett$elm_syntax_dsl$Elm$Pretty$topContext = {bc: false, bd: true, kg: 11};
var $elm$core$List$unzip = function (pairs) {
	var step = F2(
		function (_v0, _v1) {
			var x = _v0.a;
			var y = _v0.b;
			var xs = _v1.a;
			var ys = _v1.b;
			return _Utils_Tuple2(
				A2($elm$core$List$cons, x, xs),
				A2($elm$core$List$cons, y, ys));
		});
	return A3(
		$elm$core$List$foldr,
		step,
		_Utils_Tuple2(_List_Nil, _List_Nil),
		pairs);
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyApplication = F2(
	function (indent, exprs) {
		var _v30 = A2(
			$elm$core$Tuple$mapSecond,
			$Chadtech$elm_bool_extra$Bool$Extra$any,
			$elm$core$List$unzip(
				A2(
					$elm$core$List$map,
					A2(
						$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
						{bc: false, bd: false, kg: 11},
						4),
					$the_sett$elm_syntax_dsl$Util$denodeAll(exprs))));
		var prettyExpressions = _v30.a;
		var alwaysBreak = _v30.b;
		return _Utils_Tuple2(
			A2(
				$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
				alwaysBreak,
				$the_sett$elm_pretty_printer$Pretty$align(
					A2(
						$the_sett$elm_pretty_printer$Pretty$nest,
						indent,
						$the_sett$elm_pretty_printer$Pretty$lines(prettyExpressions)))),
			alwaysBreak);
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyCaseBlock = F2(
	function (indent, caseBlock) {
		var prettyCase = function (_v29) {
			var pattern = _v29.a;
			var expr = _v29.b;
			return A2(
				$the_sett$elm_pretty_printer$Pretty$indent,
				indent,
				A2(
					$the_sett$elm_pretty_printer$Pretty$a,
					A2(
						$the_sett$elm_pretty_printer$Pretty$indent,
						4,
						A3(
							$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
							$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
							4,
							$the_sett$elm_syntax_dsl$Util$denode(expr)).a),
					A2(
						$the_sett$elm_pretty_printer$Pretty$a,
						$the_sett$elm_pretty_printer$Pretty$line,
						A2(
							$the_sett$elm_pretty_printer$Pretty$a,
							$the_sett$elm_pretty_printer$Pretty$string(' ->'),
							$the_sett$elm_syntax_dsl$Elm$Pretty$prettyPattern(
								$the_sett$elm_syntax_dsl$Util$denode(pattern))))));
		};
		var patternsPart = $the_sett$elm_syntax_dsl$Elm$Pretty$doubleLines(
			A2($elm$core$List$map, prettyCase, caseBlock.jd));
		var casePart = function () {
			var _v28 = A3(
				$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
				$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
				4,
				$the_sett$elm_syntax_dsl$Util$denode(caseBlock.ca));
			var caseExpression = _v28.a;
			var alwaysBreak = _v28.b;
			return A2(
				$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
				alwaysBreak,
				$the_sett$elm_pretty_printer$Pretty$lines(
					_List_fromArray(
						[
							A2(
							$the_sett$elm_pretty_printer$Pretty$nest,
							indent,
							A2(
								$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
								alwaysBreak,
								$the_sett$elm_pretty_printer$Pretty$lines(
									_List_fromArray(
										[
											$the_sett$elm_syntax_dsl$Elm$Pretty$keyword('case'),
											caseExpression
										])))),
							$the_sett$elm_syntax_dsl$Elm$Pretty$keyword('of')
						])));
		}();
		return _Utils_Tuple2(
			$the_sett$elm_pretty_printer$Pretty$align(
				$the_sett$elm_pretty_printer$Pretty$lines(
					_List_fromArray(
						[casePart, patternsPart]))),
			true);
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpression = function (expression) {
	return A3($the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner, $the_sett$elm_syntax_dsl$Elm$Pretty$topContext, 4, expression).a;
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner = F3(
	function (context, indent, expression) {
		var _v26 = A2($the_sett$elm_syntax_dsl$Elm$Pretty$adjustExpressionParentheses, context, expression);
		switch (_v26.$) {
			case 0:
				return _Utils_Tuple2(
					$the_sett$elm_syntax_dsl$Elm$Pretty$statement('()'),
					false);
			case 1:
				var exprs = _v26.a;
				return A2($the_sett$elm_syntax_dsl$Elm$Pretty$prettyApplication, indent, exprs);
			case 2:
				var symbol = _v26.a;
				var dir = _v26.b;
				var exprl = _v26.c;
				var exprr = _v26.d;
				return A5($the_sett$elm_syntax_dsl$Elm$Pretty$prettyOperatorApplication, indent, symbol, dir, exprl, exprr);
			case 3:
				var modl = _v26.a;
				var val = _v26.b;
				return A2($the_sett$elm_syntax_dsl$Elm$Pretty$prettyFunctionOrValue, modl, val);
			case 4:
				var exprBool = _v26.a;
				var exprTrue = _v26.b;
				var exprFalse = _v26.c;
				return A4($the_sett$elm_syntax_dsl$Elm$Pretty$prettyIfBlock, indent, exprBool, exprTrue, exprFalse);
			case 5:
				var symbol = _v26.a;
				return _Utils_Tuple2(
					$the_sett$elm_pretty_printer$Pretty$parens(
						$the_sett$elm_syntax_dsl$Elm$Pretty$statement(symbol)),
					false);
			case 6:
				var symbol = _v26.a;
				return _Utils_Tuple2(
					$the_sett$elm_syntax_dsl$Elm$Pretty$operator(symbol),
					false);
			case 7:
				var val = _v26.a;
				return _Utils_Tuple2(
					$the_sett$elm_syntax_dsl$Elm$Pretty$number(
						$elm$core$String$fromInt(val)),
					false);
			case 8:
				var val = _v26.a;
				return _Utils_Tuple2(
					$the_sett$elm_syntax_dsl$Elm$Pretty$number(
						$the_sett$elm_syntax_dsl$Elm$Pretty$toHexString(val)),
					false);
			case 9:
				var val = _v26.a;
				return _Utils_Tuple2(
					$the_sett$elm_syntax_dsl$Elm$Pretty$number(
						$elm$core$String$fromFloat(val)),
					false);
			case 10:
				var expr = _v26.a;
				var _v27 = A3(
					$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
					$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
					4,
					$the_sett$elm_syntax_dsl$Util$denode(expr));
				var prettyExpr = _v27.a;
				var alwaysBreak = _v27.b;
				return _Utils_Tuple2(
					A2(
						$the_sett$elm_pretty_printer$Pretty$a,
						prettyExpr,
						$the_sett$elm_syntax_dsl$Elm$Pretty$statement('-')),
					alwaysBreak);
			case 11:
				var val = _v26.a;
				return _Utils_Tuple2(
					$the_sett$elm_syntax_dsl$Elm$Pretty$prettyLiteral(val),
					false);
			case 12:
				var val = _v26.a;
				return _Utils_Tuple2(
					$the_sett$elm_syntax_dsl$Elm$Pretty$singleQuotes(
						$the_sett$elm_syntax_dsl$Elm$Pretty$literal(
							$the_sett$elm_syntax_dsl$Elm$Pretty$escapeChar(val))),
					false);
			case 13:
				var exprs = _v26.a;
				return A2($the_sett$elm_syntax_dsl$Elm$Pretty$prettyTupledExpression, indent, exprs);
			case 14:
				var expr = _v26.a;
				return A2($the_sett$elm_syntax_dsl$Elm$Pretty$prettyParenthesizedExpression, indent, expr);
			case 15:
				var letBlock = _v26.a;
				return A2($the_sett$elm_syntax_dsl$Elm$Pretty$prettyLetBlock, indent, letBlock);
			case 16:
				var caseBlock = _v26.a;
				return A2($the_sett$elm_syntax_dsl$Elm$Pretty$prettyCaseBlock, indent, caseBlock);
			case 17:
				var lambda = _v26.a;
				return A2($the_sett$elm_syntax_dsl$Elm$Pretty$prettyLambdaExpression, indent, lambda);
			case 18:
				var setters = _v26.a;
				return $the_sett$elm_syntax_dsl$Elm$Pretty$prettyRecordExpr(setters);
			case 19:
				var exprs = _v26.a;
				return A2($the_sett$elm_syntax_dsl$Elm$Pretty$prettyList, indent, exprs);
			case 20:
				var expr = _v26.a;
				var field = _v26.b;
				return A2($the_sett$elm_syntax_dsl$Elm$Pretty$prettyRecordAccess, expr, field);
			case 21:
				var field = _v26.a;
				return _Utils_Tuple2(
					$the_sett$elm_syntax_dsl$Elm$Pretty$statement(field),
					false);
			case 22:
				var _var = _v26.a;
				var setters = _v26.b;
				return A3($the_sett$elm_syntax_dsl$Elm$Pretty$prettyRecordUpdateExpression, indent, _var, setters);
			default:
				var val = _v26.a;
				return _Utils_Tuple2(
					$the_sett$elm_syntax_dsl$Elm$Pretty$statement('glsl'),
					true);
		}
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyFun = function (fn) {
	return $the_sett$elm_pretty_printer$Pretty$lines(
		_List_fromArray(
			[
				A2(
				$the_sett$elm_syntax_dsl$Elm$Pretty$prettyMaybe,
				$the_sett$elm_syntax_dsl$Elm$Pretty$prettyDocumentation,
				$the_sett$elm_syntax_dsl$Util$denodeMaybe(fn.jt)),
				A2(
				$the_sett$elm_syntax_dsl$Elm$Pretty$prettyMaybe,
				$the_sett$elm_syntax_dsl$Elm$Pretty$prettySignature,
				$the_sett$elm_syntax_dsl$Util$denodeMaybe(fn.ky)),
				$the_sett$elm_syntax_dsl$Elm$Pretty$prettyFunctionImplementation(
				$the_sett$elm_syntax_dsl$Util$denode(fn.jp))
			]));
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyFunctionImplementation = function (impl) {
	return A2(
		$the_sett$elm_pretty_printer$Pretty$nest,
		4,
		A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpression(
				$the_sett$elm_syntax_dsl$Util$denode(impl.ca)),
			A2(
				$the_sett$elm_pretty_printer$Pretty$a,
				$the_sett$elm_pretty_printer$Pretty$line,
				$the_sett$elm_pretty_printer$Pretty$words(
					_List_fromArray(
						[
							$the_sett$elm_syntax_dsl$Elm$Pretty$signature(
							$the_sett$elm_syntax_dsl$Util$denode(impl.fZ)),
							$the_sett$elm_syntax_dsl$Elm$Pretty$prettyArgs(
							$the_sett$elm_syntax_dsl$Util$denodeAll(impl.hh)),
							$the_sett$elm_pretty_printer$Pretty$string('=')
						])))));
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyIfBlock = F4(
	function (indent, exprBool, exprTrue, exprFalse) {
		var innerIfBlock = F3(
			function (innerExprBool, innerExprTrue, innerExprFalse) {
				var truePart = A2(
					$the_sett$elm_pretty_printer$Pretty$indent,
					indent,
					A3(
						$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
						$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
						4,
						$the_sett$elm_syntax_dsl$Util$denode(innerExprTrue)).a);
				var ifPart = function () {
					var _v25 = A3(
						$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
						$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
						4,
						$the_sett$elm_syntax_dsl$Util$denode(innerExprBool));
					var prettyBoolExpr = _v25.a;
					var alwaysBreak = _v25.b;
					return A2(
						$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
						alwaysBreak,
						$the_sett$elm_pretty_printer$Pretty$lines(
							_List_fromArray(
								[
									A2(
									$the_sett$elm_pretty_printer$Pretty$nest,
									indent,
									A2(
										$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
										alwaysBreak,
										$the_sett$elm_pretty_printer$Pretty$lines(
											_List_fromArray(
												[
													$the_sett$elm_syntax_dsl$Elm$Pretty$keyword('if'),
													A3(
													$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
													$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
													4,
													$the_sett$elm_syntax_dsl$Util$denode(innerExprBool)).a
												])))),
									$the_sett$elm_syntax_dsl$Elm$Pretty$keyword('then')
								])));
				}();
				var falsePart = function () {
					var _v24 = $the_sett$elm_syntax_dsl$Util$denode(innerExprFalse);
					if (_v24.$ === 4) {
						var nestedExprBool = _v24.a;
						var nestedExprTrue = _v24.b;
						var nestedExprFalse = _v24.c;
						return A3(innerIfBlock, nestedExprBool, nestedExprTrue, nestedExprFalse);
					} else {
						return _List_fromArray(
							[
								A2(
								$the_sett$elm_pretty_printer$Pretty$indent,
								indent,
								A3(
									$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
									$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
									4,
									$the_sett$elm_syntax_dsl$Util$denode(innerExprFalse)).a)
							]);
					}
				}();
				var elsePart = A2(
					$the_sett$elm_pretty_printer$Pretty$a,
					$the_sett$elm_syntax_dsl$Elm$Pretty$keyword('else'),
					$the_sett$elm_pretty_printer$Pretty$line);
				var context = $the_sett$elm_syntax_dsl$Elm$Pretty$topContext;
				if (!falsePart.b) {
					return _List_Nil;
				} else {
					if (!falsePart.b.b) {
						var falseExpr = falsePart.a;
						return _List_fromArray(
							[ifPart, truePart, elsePart, falseExpr]);
					} else {
						var hd = falsePart.a;
						var tl = falsePart.b;
						return A2(
							$elm$core$List$append,
							_List_fromArray(
								[
									ifPart,
									truePart,
									$the_sett$elm_pretty_printer$Pretty$words(
									_List_fromArray(
										[elsePart, hd]))
								]),
							tl);
					}
				}
			});
		var prettyExpressions = A3(innerIfBlock, exprBool, exprTrue, exprFalse);
		return _Utils_Tuple2(
			$the_sett$elm_pretty_printer$Pretty$align(
				$the_sett$elm_pretty_printer$Pretty$lines(prettyExpressions)),
			true);
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyLambdaExpression = F2(
	function (indent, lambda) {
		var _v22 = A3(
			$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
			$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
			4,
			$the_sett$elm_syntax_dsl$Util$denode(lambda.ca));
		var prettyExpr = _v22.a;
		var alwaysBreak = _v22.b;
		return _Utils_Tuple2(
			A2(
				$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
				alwaysBreak,
				$the_sett$elm_pretty_printer$Pretty$align(
					A2(
						$the_sett$elm_pretty_printer$Pretty$nest,
						indent,
						$the_sett$elm_pretty_printer$Pretty$lines(
							_List_fromArray(
								[
									A2(
									$the_sett$elm_pretty_printer$Pretty$a,
									$the_sett$elm_pretty_printer$Pretty$string(' ->'),
									A2(
										$the_sett$elm_pretty_printer$Pretty$a,
										$the_sett$elm_pretty_printer$Pretty$words(
											A2(
												$elm$core$List$map,
												$the_sett$elm_syntax_dsl$Elm$Pretty$prettyPatternInner(false),
												$the_sett$elm_syntax_dsl$Util$denodeAll(lambda.af))),
										$the_sett$elm_pretty_printer$Pretty$string('\\'))),
									prettyExpr
								]))))),
			alwaysBreak);
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyLetBlock = F2(
	function (indent, letBlock) {
		return _Utils_Tuple2(
			$the_sett$elm_pretty_printer$Pretty$align(
				$the_sett$elm_pretty_printer$Pretty$lines(
					_List_fromArray(
						[
							$the_sett$elm_syntax_dsl$Elm$Pretty$keyword('let'),
							A2(
							$the_sett$elm_pretty_printer$Pretty$indent,
							indent,
							$the_sett$elm_syntax_dsl$Elm$Pretty$doubleLines(
								A2(
									$elm$core$List$map,
									$the_sett$elm_syntax_dsl$Elm$Pretty$prettyLetDeclaration(indent),
									$the_sett$elm_syntax_dsl$Util$denodeAll(letBlock.jq)))),
							$the_sett$elm_syntax_dsl$Elm$Pretty$keyword('in'),
							A3(
							$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
							$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
							4,
							$the_sett$elm_syntax_dsl$Util$denode(letBlock.ca)).a
						]))),
			true);
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyLetDeclaration = F2(
	function (indent, letDecl) {
		if (!letDecl.$) {
			var fn = letDecl.a;
			return $the_sett$elm_syntax_dsl$Elm$Pretty$prettyFun(fn);
		} else {
			var pattern = letDecl.a;
			var expr = letDecl.b;
			return A2(
				$the_sett$elm_pretty_printer$Pretty$a,
				A2(
					$the_sett$elm_pretty_printer$Pretty$indent,
					indent,
					A3(
						$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
						$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
						4,
						$the_sett$elm_syntax_dsl$Util$denode(expr)).a),
				A2(
					$the_sett$elm_pretty_printer$Pretty$a,
					$the_sett$elm_pretty_printer$Pretty$line,
					$the_sett$elm_pretty_printer$Pretty$words(
						_List_fromArray(
							[
								A2(
								$the_sett$elm_syntax_dsl$Elm$Pretty$prettyPatternInner,
								false,
								$the_sett$elm_syntax_dsl$Util$denode(pattern)),
								$the_sett$elm_pretty_printer$Pretty$string('=')
							]))));
		}
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyList = F2(
	function (indent, exprs) {
		var open = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$space,
			$the_sett$elm_pretty_printer$Pretty$string('['));
		var close = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$string(']'),
			$the_sett$elm_pretty_printer$Pretty$line);
		if (!exprs.b) {
			return _Utils_Tuple2(
				$the_sett$elm_pretty_printer$Pretty$string('[]'),
				false);
		} else {
			var _v20 = A2(
				$elm$core$Tuple$mapSecond,
				$Chadtech$elm_bool_extra$Bool$Extra$any,
				$elm$core$List$unzip(
					A2(
						$elm$core$List$map,
						A2(
							$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
							$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
							A2($the_sett$elm_syntax_dsl$Elm$Pretty$decrementIndent, indent, 2)),
						$the_sett$elm_syntax_dsl$Util$denodeAll(exprs))));
			var prettyExpressions = _v20.a;
			var alwaysBreak = _v20.b;
			return _Utils_Tuple2(
				A2(
					$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
					alwaysBreak,
					$the_sett$elm_pretty_printer$Pretty$align(
						A3(
							$the_sett$elm_pretty_printer$Pretty$surround,
							open,
							close,
							A2($the_sett$elm_pretty_printer$Pretty$separators, ', ', prettyExpressions)))),
				alwaysBreak);
		}
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyOperatorApplication = F5(
	function (indent, symbol, dir, exprl, exprr) {
		return (symbol === '<|') ? A5($the_sett$elm_syntax_dsl$Elm$Pretty$prettyOperatorApplicationLeft, indent, symbol, dir, exprl, exprr) : A5($the_sett$elm_syntax_dsl$Elm$Pretty$prettyOperatorApplicationRight, indent, symbol, dir, exprl, exprr);
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyOperatorApplicationLeft = F5(
	function (indent, symbol, _v16, exprl, exprr) {
		var context = {
			bc: true,
			bd: false,
			kg: $the_sett$elm_syntax_dsl$Elm$Pretty$precedence(symbol)
		};
		var _v17 = A3(
			$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
			context,
			4,
			$the_sett$elm_syntax_dsl$Util$denode(exprr));
		var prettyExpressionRight = _v17.a;
		var alwaysBreakRight = _v17.b;
		var _v18 = A3(
			$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
			context,
			4,
			$the_sett$elm_syntax_dsl$Util$denode(exprl));
		var prettyExpressionLeft = _v18.a;
		var alwaysBreakLeft = _v18.b;
		var alwaysBreak = alwaysBreakLeft || alwaysBreakRight;
		return _Utils_Tuple2(
			A2(
				$the_sett$elm_pretty_printer$Pretty$nest,
				4,
				A2(
					$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
					alwaysBreak,
					$the_sett$elm_pretty_printer$Pretty$lines(
						_List_fromArray(
							[
								$the_sett$elm_pretty_printer$Pretty$words(
								_List_fromArray(
									[
										prettyExpressionLeft,
										$the_sett$elm_syntax_dsl$Elm$Pretty$operator(symbol)
									])),
								prettyExpressionRight
							])))),
			alwaysBreak);
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyOperatorApplicationRight = F5(
	function (indent, symbol, _v11, exprl, exprr) {
		var expandExpr = F3(
			function (innerIndent, context, expr) {
				if (expr.$ === 2) {
					var sym = expr.a;
					var left = expr.c;
					var right = expr.d;
					return A4(innerOpApply, false, sym, left, right);
				} else {
					return _List_fromArray(
						[
							A3($the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner, context, innerIndent, expr)
						]);
				}
			});
		var innerOpApply = F4(
			function (isTop, sym, left, right) {
				var innerIndent = A2(
					$the_sett$elm_syntax_dsl$Elm$Pretty$decrementIndent,
					4,
					$elm$core$String$length(symbol) + 1);
				var leftIndent = isTop ? indent : innerIndent;
				var context = {
					bc: '<|' === sym,
					bd: false,
					kg: $the_sett$elm_syntax_dsl$Elm$Pretty$precedence(sym)
				};
				var rightSide = A3(
					expandExpr,
					innerIndent,
					context,
					$the_sett$elm_syntax_dsl$Util$denode(right));
				if (rightSide.b) {
					var _v14 = rightSide.a;
					var hdExpr = _v14.a;
					var hdBreak = _v14.b;
					var tl = rightSide.b;
					return A2(
						$elm$core$List$append,
						A3(
							expandExpr,
							leftIndent,
							context,
							$the_sett$elm_syntax_dsl$Util$denode(left)),
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								A2(
									$the_sett$elm_pretty_printer$Pretty$a,
									hdExpr,
									A2(
										$the_sett$elm_pretty_printer$Pretty$a,
										$the_sett$elm_pretty_printer$Pretty$space,
										$the_sett$elm_syntax_dsl$Elm$Pretty$operator(sym))),
								hdBreak),
							tl));
				} else {
					return _List_Nil;
				}
			});
		var _v12 = A2(
			$elm$core$Tuple$mapSecond,
			$Chadtech$elm_bool_extra$Bool$Extra$any,
			$elm$core$List$unzip(
				A4(innerOpApply, true, symbol, exprl, exprr)));
		var prettyExpressions = _v12.a;
		var alwaysBreak = _v12.b;
		return _Utils_Tuple2(
			A2(
				$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
				alwaysBreak,
				$the_sett$elm_pretty_printer$Pretty$align(
					A2(
						$the_sett$elm_pretty_printer$Pretty$join,
						A2($the_sett$elm_pretty_printer$Pretty$nest, indent, $the_sett$elm_pretty_printer$Pretty$line),
						prettyExpressions))),
			alwaysBreak);
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyParenthesizedExpression = F2(
	function (indent, expr) {
		var open = $the_sett$elm_pretty_printer$Pretty$string('(');
		var close = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$string(')'),
			$the_sett$elm_pretty_printer$Pretty$tightline);
		var _v10 = A3(
			$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
			$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
			A2($the_sett$elm_syntax_dsl$Elm$Pretty$decrementIndent, indent, 1),
			$the_sett$elm_syntax_dsl$Util$denode(expr));
		var prettyExpr = _v10.a;
		var alwaysBreak = _v10.b;
		return _Utils_Tuple2(
			A2(
				$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
				alwaysBreak,
				$the_sett$elm_pretty_printer$Pretty$align(
					A3(
						$the_sett$elm_pretty_printer$Pretty$surround,
						open,
						close,
						A2($the_sett$elm_pretty_printer$Pretty$nest, 1, prettyExpr)))),
			alwaysBreak);
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyRecordAccess = F2(
	function (expr, field) {
		var _v9 = A3(
			$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
			$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
			4,
			$the_sett$elm_syntax_dsl$Util$denode(expr));
		var prettyExpr = _v9.a;
		var alwaysBreak = _v9.b;
		return _Utils_Tuple2(
			A2(
				$the_sett$elm_pretty_printer$Pretty$a,
				$the_sett$elm_syntax_dsl$Elm$Pretty$statement(
					$the_sett$elm_syntax_dsl$Util$denode(field)),
				A2($the_sett$elm_pretty_printer$Pretty$a, $the_sett$elm_syntax_dsl$Elm$Pretty$dot, prettyExpr)),
			alwaysBreak);
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyRecordExpr = function (setters) {
	var open = A2(
		$the_sett$elm_pretty_printer$Pretty$a,
		$the_sett$elm_pretty_printer$Pretty$space,
		$the_sett$elm_pretty_printer$Pretty$string('{'));
	var close = A2(
		$the_sett$elm_pretty_printer$Pretty$a,
		$the_sett$elm_pretty_printer$Pretty$string('}'),
		$the_sett$elm_pretty_printer$Pretty$line);
	if (!setters.b) {
		return _Utils_Tuple2(
			$the_sett$elm_pretty_printer$Pretty$string('{}'),
			false);
	} else {
		var _v8 = A2(
			$elm$core$Tuple$mapSecond,
			$Chadtech$elm_bool_extra$Bool$Extra$any,
			$elm$core$List$unzip(
				A2(
					$elm$core$List$map,
					$the_sett$elm_syntax_dsl$Elm$Pretty$prettySetter,
					$the_sett$elm_syntax_dsl$Util$denodeAll(setters))));
		var prettyExpressions = _v8.a;
		var alwaysBreak = _v8.b;
		return _Utils_Tuple2(
			A2(
				$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
				alwaysBreak,
				$the_sett$elm_pretty_printer$Pretty$align(
					A3(
						$the_sett$elm_pretty_printer$Pretty$surround,
						open,
						close,
						A2($the_sett$elm_pretty_printer$Pretty$separators, ', ', prettyExpressions)))),
			alwaysBreak);
	}
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyRecordUpdateExpression = F3(
	function (indent, _var, setters) {
		var open = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$line,
			$the_sett$elm_pretty_printer$Pretty$words(
				_List_fromArray(
					[
						$the_sett$elm_pretty_printer$Pretty$string('{'),
						$the_sett$elm_syntax_dsl$Elm$Pretty$statement(
						$the_sett$elm_syntax_dsl$Util$denode(_var))
					])));
		var close = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$string('}'),
			$the_sett$elm_pretty_printer$Pretty$line);
		var addBarToFirst = function (exprs) {
			if (!exprs.b) {
				return _List_Nil;
			} else {
				var hd = exprs.a;
				var tl = exprs.b;
				return A2(
					$elm$core$List$cons,
					A2(
						$the_sett$elm_pretty_printer$Pretty$a,
						hd,
						$the_sett$elm_pretty_printer$Pretty$string('| ')),
					tl);
			}
		};
		if (!setters.b) {
			return _Utils_Tuple2(
				$the_sett$elm_pretty_printer$Pretty$string('{}'),
				false);
		} else {
			var _v5 = A2(
				$elm$core$Tuple$mapSecond,
				$Chadtech$elm_bool_extra$Bool$Extra$any,
				$elm$core$List$unzip(
					A2(
						$elm$core$List$map,
						$the_sett$elm_syntax_dsl$Elm$Pretty$prettySetter,
						$the_sett$elm_syntax_dsl$Util$denodeAll(setters))));
			var prettyExpressions = _v5.a;
			var alwaysBreak = _v5.b;
			return _Utils_Tuple2(
				A2(
					$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
					alwaysBreak,
					$the_sett$elm_pretty_printer$Pretty$align(
						A3(
							$the_sett$elm_pretty_printer$Pretty$surround,
							$the_sett$elm_pretty_printer$Pretty$empty,
							close,
							A2(
								$the_sett$elm_pretty_printer$Pretty$nest,
								indent,
								A2(
									$the_sett$elm_pretty_printer$Pretty$a,
									A2(
										$the_sett$elm_pretty_printer$Pretty$separators,
										', ',
										addBarToFirst(prettyExpressions)),
									open))))),
				alwaysBreak);
		}
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettySetter = function (_v2) {
	var fld = _v2.a;
	var val = _v2.b;
	var _v3 = A3(
		$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
		$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
		4,
		$the_sett$elm_syntax_dsl$Util$denode(val));
	var prettyExpr = _v3.a;
	var alwaysBreak = _v3.b;
	return _Utils_Tuple2(
		A2(
			$the_sett$elm_pretty_printer$Pretty$nest,
			4,
			A2(
				$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
				alwaysBreak,
				$the_sett$elm_pretty_printer$Pretty$lines(
					_List_fromArray(
						[
							$the_sett$elm_pretty_printer$Pretty$words(
							_List_fromArray(
								[
									$the_sett$elm_syntax_dsl$Elm$Pretty$statement(
									$the_sett$elm_syntax_dsl$Util$denode(fld)),
									$the_sett$elm_pretty_printer$Pretty$string('=')
								])),
							prettyExpr
						])))),
		alwaysBreak);
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyTupledExpression = F2(
	function (indent, exprs) {
		var open = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$space,
			$the_sett$elm_pretty_printer$Pretty$string('('));
		var close = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$string(')'),
			$the_sett$elm_pretty_printer$Pretty$line);
		if (!exprs.b) {
			return _Utils_Tuple2(
				$the_sett$elm_pretty_printer$Pretty$string('()'),
				false);
		} else {
			var _v1 = A2(
				$elm$core$Tuple$mapSecond,
				$Chadtech$elm_bool_extra$Bool$Extra$any,
				$elm$core$List$unzip(
					A2(
						$elm$core$List$map,
						A2(
							$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
							$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
							A2($the_sett$elm_syntax_dsl$Elm$Pretty$decrementIndent, indent, 2)),
						$the_sett$elm_syntax_dsl$Util$denodeAll(exprs))));
			var prettyExpressions = _v1.a;
			var alwaysBreak = _v1.b;
			return _Utils_Tuple2(
				A2(
					$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
					alwaysBreak,
					$the_sett$elm_pretty_printer$Pretty$align(
						A3(
							$the_sett$elm_pretty_printer$Pretty$surround,
							open,
							close,
							A2($the_sett$elm_pretty_printer$Pretty$separators, ', ', prettyExpressions)))),
				alwaysBreak);
		}
	});
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $elm$core$Platform$worker = _Platform_worker;
var $author$project$FigmaPlugin$main = $elm$core$Platform$worker(
	{
		jN: function (json) {
			return _Utils_Tuple2(
				{},
				$author$project$FigmaPlugin$figmaOutput(
					$author$project$FigmaPlugin$escapeText(
						function () {
							var _v0 = A2($miniBill$elm_codec$Codec$decodeValue, $author$project$FigmaPlugin$nodeCodec, json);
							if (!_v0.$) {
								var item = _v0.a;
								return A2(
									$the_sett$elm_pretty_printer$Pretty$pretty,
									100,
									$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpression(
										A2(
											$elm$core$Maybe$withDefault,
											$the_sett$elm_syntax_dsl$Elm$CodeGen$string('Nothing to generate'),
											A2($author$project$FigmaPlugin$nodeToExpr, $elm$core$Maybe$Nothing, item))));
							} else {
								var error = _v0.a;
								return $elm$json$Json$Decode$errorToString(error);
							}
						}())));
		},
		kI: function (_v1) {
			return $elm$core$Platform$Sub$none;
		},
		k$: F2(
			function (_v2, _v3) {
				return _Utils_Tuple2(
					{},
					$elm$core$Platform$Cmd$none);
			})
	});
_Platform_export({'FigmaPlugin':{'init':$author$project$FigmaPlugin$main($elm$json$Json$Decode$value)(0)}});}(this));if (figma.editorType === 'figma')
{
    const item = figma.currentPage.selection[0];
    if (item)
    {
        let attributes = [];
        console.log(item);

        const app = Elm.FigmaPlugin.init({ flags : item });

        app.ports.figmaOutput.subscribe((text) => {
            figma.showUI(__html__.replace("copy-content", text));
            figma.ui.onmessage = msg => {
                //figma.closePlugin();
            };
        });
    }
    else
    {
        figma.closePlugin();
    }
}
