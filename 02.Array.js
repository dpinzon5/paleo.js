/* * * * * * * * * * * * * * * * * * * * * *
 *      PALEO JS PT 2: ARRAY METHODS       *
 * * * * * * * * * * * * * * * * * * * * * */

// Part of what makes arrays so powerful are the many useful methods
// attached to them. They make it easy to take a set of data and `sort`
// or `filter` it. Note that normally these functions are called directly
// on an array, i.e. `[1, 2, 3].pop()`, but since we are doing this
// manually, we'll have to input the array as the first argument.



/**  POP  **/
// This removes the last element from an array and returns it.
// Since this is your first array method, I'll do it for you.

// Example Usage:
// var array = [6, 7, 8];
// array.pop();    --> returns 8, and array now equals [6, 7]

var pop = function(array) {
  var last = array[array.length - 1];

  if (array.length > 0) {
    array.length--;
  }

  return last;
};


/**  PUSH  **/
// Just the opposite of `pop`, this adds new values to the end of an
// array, and returns the new length. Normally it can accept any number
// of values, but let's keep things simple for now and just do one.

// Example Usage:
// var array = [6, 7, 8];
// array.push(9);    --> returns 4, and array now equals [6, 7, 8, 9]

var push = function(array, value) {
  array[array.length] = value;
  return array.length;
};


/**  SHIFT  **/
// Removes the first element from an array and returns it.
// Beware! This won't be as simple as `pop`.

// Example Usage:
// var array = [6, 7, 8];
// array.shift();    --> returns 6, and array now equals [7, 8]

var shift = function(array) {
  if (array.length === 0) { return undefined; }

  var shifted = array[0];

  for (var i = 1; i < array.length; i++) {
    array[i - 1] = array[i];
  }

  array.length -= 1;

  return shifted;
};


/**  UNSHIFT  **/
// You may sense a pattern. This one adds any number of values to the
// start of an array. I let you off easy with push, but this time
// you'll need to use `arguments` and handle them all.

// Example Usage:
// var array = [6, 7, 8];
// array.unshift(3, 4, 5);    --> returns 6, and array now equals [3, 4, 5, 6, 7, 8]

var unshift = function(array) {
  // move elements back starting at the back
  for (var i = array.length - 1; i >= 0; i--) {
    array[i + arguments.length - 1] = array[i];
  }
  // fill in front with arguments
  for (var j = 1; j < arguments.length; j++) {
    array[j - 1] = arguments[j]
  }

  return array.length;
};


/**  JOIN  **/
// Combines an array of sub-strings using a separator string inbetween
// each. If no separator is provided, it should default to a comma.

// Example Usage:
// ["hello", "world"].join(" ");    --> returns "hello world"

var join = function(array, separator) {
  // set separator to be comma if it is undefined
  separator = !separator ? ',' : separator;

  if (array.length === 0) { return ''; }

  var result = array[0];

  for (var i = 1; i < array.length; i++) {
    result += separator;
    result += array[i];
  }

  return result;
};


/**  REVERSE  **/
// Reverses an array in place as well as returning the mutated array.
// To demonstrate reusing your functions, I've solved `reverse` in a
// bit of a odd way using your `push`... you got that working, right?

// Example Usage:
// var array = [3, 4, 5]
// array.reverse()    --> returns [5, 4, 3] and array now equals [5, 4, 3]

var reverse = function(array) {
  var reversed = [];

  for (var i = array.length - 1; i >= 0; i--) {
    push(reversed, array[i]);
  }

  for (var j = 0; j < array.length; j++) {
    array[j] = reversed[j];
  }

  return array;
};


/**  CONCAT  **/
// This "concatenates" any number of sub-arrays into a new larger array.
// You may find previous functions useful here too!

// [1, 2].concat([3, 4], 5, [6])    --> returns [1, 2, 3, 4, 5, 6]

var concat = function() {
  // the first argument is going to be the input array
  // a copy must be made so the old array is not altered
  var newArray = [];
  // make a copy of input array
  for (var n = 0; n < arguments[0].length; n++) {
    push(newArray, arguments[0][n]);
  }

  for (var i = 1; i < arguments.length; i++) {
    // if argument is an array iterate through it
    if (arguments[i].length !== undefined && typeof arguments[i] !== 'string') {
      for (var j = 0; j < arguments[i].length; j++) {
        push(newArray, arguments[i][j]);
      }
    } else {
      // otherwise, just push argument into array
      push(newArray, arguments[i]);
    }
  }

  return newArray;
};
