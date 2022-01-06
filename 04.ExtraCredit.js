/* * * * * * * * * * * * * * * * * * * * * *
 *      PALEO JS PT 4: EXTRA CREDIT        *
 * * * * * * * * * * * * * * * * * * * * * */

// Looking for more useful JavaScript methods to implement? These are
// harder than the ones that came before, but I know you can do it.



/**  SPLICE  **/
// Modifies an array by removing a number of elements and
// inserting any number of new ones.

// Example Usage:
// var arr = [6, 7, 8, 9];
// arr.splice(2, 1, 14, 16);  --> returns [8] and arr is now [6, 7, 14, 16, 9]

var splice = function(array, start, count) {

  // if count is not defined set to array.length - start
  count = count !== undefined ? count : array.length - start;

  var spliced = slice(array, start, start + count);

  // create copy to iterate over after array length is changed
  var copy = slice(array, 0);

  // define input length and make sure it is positive otherwise set to 0
  var inputLength = arguments.length - 3;
  inputLength = inputLength > 0 ? inputLength : 0;

  // change array length to be the new length;
  array.length = array.length - count + inputLength;

  if (start > 0) {
    // iterate over array starting at start and modify with new values
    for (var i = start; i < array.length; i++) {
      if (i < start + inputLength) {
        // if i is less than the sum of the start variable and the length of the new arguments array
        // then add new arguments
        array[i] = slice(arguments, 3)[i - start];
      } else {
        // otherwise just add the last arguments from the copy array
        array[i] = copy[i - inputLength + count];
      }
    }
  } else {
    for (var j = copy.length + start; j < array.length; j++) {
      array[j] = slice(arguments, 3)[j - inputLength];
    }
  }

  // return original spliced part of array
  return spliced;
};


/**  SPLIT  **/
// The opposite of `join`, returns an array by breaking up a string
// using a separator. The separators are not included in the array.

// Example Usage:
// "hello world".split(" ");    --> returns ["hello", "world"]

var split = function(string, separator) {
  // define array
  var array = [];

  if (separator === undefined) {
    push(array, string);
  } else if (separator === '') {
    for (var i = 0; i < string.length; i++) {
      push(array, string[i]);
    }
  } else {
    var startIndex = 0;
    // iterate through string to look for separator
    for (var i = 0; i < string.length; i++) {
      // if string starts matching separator
      if (string[i] === separator[0]) {
        // then check to see if the string contains the separator
        if (slice(string, i, i + separator.length) === separator) {
          // if so, then push into array when start index and i are not equal
          if (startIndex !== i) {
            push(array, slice(string, startIndex, i));
          }
          // set start index to new position
          startIndex = i + separator.length;
        }
      }
    }

    // add the last of the string if any remain
    if (startIndex !== string.length) {
      push(array, slice(string, startIndex))
    }
  }

  return array;
};


/**  MATH.SQRT  **/
// How *do* you find the square root of a number if you don't have `Math`?

// Example Usage:
// Math.sqrt(4);    --> returns 2

var sqrt = function(number) {
  if (number < 0) {
    return NaN;
  } else if (number === 0 || number === 1) {
    return number;
  } else {
    const root = (number, start, end) => {
      // define guess
      var guess = (start + end) / 2;

      // set tolerance
      var tolerance = 2 * pow(10, -16);

      // guess at number is the guess to the power of 2
      // guess high and low to capture the differences in tolerance
      var numGuessLow = pow(guess - tolerance, 2);
      var numGuessHigh = pow(guess + tolerance, 2);

      // if number is within tolerance return number guess
      if (numGuessLow <= number && numGuessHigh >= number) {
        return guess;
      } else if ((numGuessLow + numGuessHigh) / 2 < number) {
        return root(number, guess + 1, end);
      } else if ((numGuessLow + numGuessHigh) / 2 > number ) {
        return root(number, start, guess - 1);
      }
    };
    var ans = root(number, 0, number);

    // if answer only has a trailing end remainder past 13 decimal places
    // round the answer to the nearest 15 decimal places
    if (ans * pow(10, 10) % 1 < 0.001) {
      ans = (ans - ((ans * pow(10, 15)) % 1) / pow(10, 15));
    }
    return ans;
  }
};


/**  DATE.PARSE  **/
// A little function that takes a date string in a variety of formats and
// returns the number of milliseconds since midnight UTC January 1, 1970.
// Note that while the native version sometimes defaults to your local
// time zone, the paleo version is should always default to UTC.

// Example Usage:
// Date.parse("December 12, 1990");    --> returns 660960000000

var parse = function(date) {
  // sec -> ms
  var sec2ms = 1000;
  // min -> sec
  var min2sec = 60;
  // hour -> min
  var hr2min = 60;
  // day -> hour
  var day2hr = 24;
  // year -> day
  var year2day = 365;

  var leapdays;

  var monthDays = [
    {month: 'Jan', days: 31,},
    {month: 'Feb', days: 28,},
    {month: 'Mar', days: 31,},
    {month: 'Apr', days: 30,},
    {month: 'May', days: 31,},
    {month: 'Jun', days: 30,},
    {month: 'Jul', days: 31,},
    {month: 'Aug', days: 31,},
    {month: 'Sep', days: 30,},
    {month: 'Oct', days: 31,},
    {month: 'Nov', days: 30,},
    {month: 'Dec', days: 31},
  ];

  // calculation helper functions
  const calculateYear = (year) => {
    leapdays = (year - '1972') / 4;
    // round down leap days
    leapdays = leapdays - (leapdays % 1);
    return (((year - '1971') + 1) * year2day + leapdays) * day2hr * hr2min * min2sec * sec2ms;
  };
  const calculateMonth = (month) => {
    if (month === undefined) {
      return 0;
    }

    var daysToMonth = 0;

    if (typeof (month - 1) === 'number') {
      // convert to number but don't count whole month since array is 0-indexed
      month = month - 1;

      for (let i = 0; i < month; i++) {
        daysToMonth += monthDays[i].days;
      }
    } else {
      // only take the first 3 letters of month
      month = slice(month, 3);

      for (let i = 0; i < monthDays.length; i++) {
        if (monthDays[i].month !== month) {
          daysToMonth += monthDays[i].days;
        }
      }
    }

    return (daysToMonth) * day2hr * hr2min * min2sec * sec2ms;
  };
  const calculateDay = (day) => {
    if (day === undefined) { return 0; }
    return (day) * day2hr * hr2min * min2sec * sec2ms;
  };
  const calculateTime = (time) => {
    if (time === undefined) { return 0; }
    // format for ISO time is YYYY-MM-DDTHH:mm:ss.sssZ

    // remove any minus and plus from time
    time = split(split(time, '-')[0], '+')[0];

    time = split(time, ':');

    // start time as 0
    var timeInMs = 0;

    var hour = time[0];
    var minute = time[1];
    var second = time[2];
    if (!!second && second[second.length - 1] === 'Z') {
      second = slice(time[2], 0, -1);
    }

    // add time to timeInMs
    if (!!hour) { timeInMs += hour * hr2min * min2sec * sec2ms; }
    if (!!minute) { timeInMs += minute * min2sec * sec2ms; }
    if (!!second) { timeInMs += second * sec2ms; }

    return timeInMs;
  }

  var includeTime = split(date, 'T');

  var timeDuration = 0;

  var splitByDash = split(includeTime[0], '-');
  // console.log(splitByDash);

  return calculateYear(splitByDash[0]) + calculateMonth(splitByDash[1]) + calculateDay(splitByDash[2]) + calculateTime(includeTime[1]);
};
