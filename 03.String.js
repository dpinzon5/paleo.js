/* * * * * * * * * * * * * * * * * * * * * *
 *     PALEO JS PT 3: STRING METHODS       *
 * * * * * * * * * * * * * * * * * * * * * */

// Primitive values get methods too! Like the Array methods, these
// are called on the string itself, for example: `"abc".slice(1, 2)`.
// For your paleo versions, the string will be the first argument.



/**  OBJECT.KEYS  **/
// But first a little warmup before the actual String methods!
// This function takes an object and returns an array of it's keys.

// Example Usage:
// var obj = {a: 1, b: 2, c: 3};
// Object.keys(obj);    --> returns ['a', 'b', 'c']

var keys = function(object) {
  var keysArray = [];

  for (var k in object) {
    push(keysArray, k);
  }

  return keysArray;
};


/**  SLICE  **/
// This useful method works on strings and arrays. It copies a sub-section
// based on a start index (inclusive) and an end index (non-inclusive).

// Note that there are a lot of creative ways `slice` handles its parameters!
// Both are optional, and you can even use negative indexes. Check out MDN
// (developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
// if you are unfamiliar with how it should work.

// Example Usage:
// var str = "hello world";
// str.slice(0, 5);     --> returns "hello"
// [1, 2, 3].slice(1);  --> returns [2, 3]

var slice = function(stringOrArray, start, end) {
  // if there is no start defined then just return input
  if (start === undefined) { return stringOrArray; }

  // define variable for copying sliced input into
  var sliced;

  // if end is not defined or greater than the input length set to equal length of input
  end = (!end || end > stringOrArray.length) ? stringOrArray.length : end;

  // if start or end are negative then set to count from back
  start = start >= 0 ? start : stringOrArray.length + start;
  end = end >= 0 ? end : stringOrArray.length + end;

  // define and copy based on data type (string or array)
  if (typeof stringOrArray === 'string') {
    sliced = '';

    for (var i = start; i < end; i++) {
      sliced += stringOrArray[i];
    }
  } else {
    sliced = [];

    for (var i = start; i < end; i++) {
      push(sliced, stringOrArray[i]);
    }
  }


  return sliced;
};


/**  TRIM  **/
// A handy little method for processing text. Returns the input string
// with all white space removed from the beginning and the end.

// Example Usage:
// var str = "\n hi there     ";
// str.trim();    --> returns "hi there"

var trim = function(string) {

  // cut space from start
  for (var i = 0; i < string.length; i++) {
    if (
      string[i] !== ' ' &&
      string[i] !== '\n' &&
      string[i] !== '\r' &&
      string[i] !== '\t' &&
      string[i] !== '\v' &&
      string[i] !== '\f'
      ) {
      string = slice(string, i);
      break;
    }
  }

  // cut space from end
  for (var j = string.length - 1; j > 0; j--) {
    if (
      string[j] !== ' ' &&
      string[j] !== '\n' &&
      string[j] !== '\r' &&
      string[j] !== '\t' &&
      string[j] !== '\v'
    ) {
      string = slice(string, 0, j + 1);
      break;
    }
  }

  return string;
};


/**  REPLACE  **/
// Searches for a target sub-string and replaces it.
// Note that only the first instance is replaced.

// Example Usage:
// "axc".replace("x", "b");    --> returns "abc"

var replace = function(string, target, replacement) {
  // handle case where target is empty string
  if (target === '') {
    return replacement + string;
  }

  var copy = '';
  var index;

  // iterate through input string to look for target word
  for (var i = 0; i < string.length; i++) {
    // if string starts matching target word
    if (string[i] === target[0]) {
      // then iterate through target word and string together see if they match
      for (var j = 0; j < target.length; j++) {
        // if target and input string don't match break out of for loop
        if (string[i + j] !== target[j]) {
          break;
        } else {
          // if target string does match in the last letter then set index to i
          if (j === target.length - 1) {
            index = i;
          }
        }
      }
      // if index is defined, then break out of input string iteration
      if (index !== undefined) {
        break;
      }
    }
  }

  // add first part of word unless index = 0
  copy = index === 0 ? '' : slice(string, 0, index);
  // add replacement
  copy += replacement;
  // add rest of word
  copy += slice(string, index + target.length);

  return copy;
};
