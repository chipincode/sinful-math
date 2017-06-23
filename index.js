;(function (global) {
  'use strict';

  var liberate = Function.prototype.bind.bind(Function.prototype.call),
      reduce   = liberate(Array.prototype.reduce);

  // Computes the multiplier necessary to make x >= 1,
  // effectively eliminating miscalculations caused by
  // finite precision.

  function multiplier(x) {
    var converted = x.toFixed && x < 1e-6 ? x.toFixed(15).replace(/(\..*?)(0+)$/, "$1") : x.toString()
    var parts     = converted.split('.');

    if (parts.length < 2) {
      return 1;
    }

    return Math.pow(10, parts[1].length);
  }

  // Given a variable number of arguments, returns the maximum
  // multiplier that must be used to normalize an operation involving
  // all of them.

  function correctionFactor() {
    return reduce(arguments, function (prev, next) {
      next = multiplier(next);

      return prev > next ? prev : next;
    }, -Infinity);
  }

  // Returns the "corrected" integer value of a
  // floating point multiplication operation

  function correctedValue(val, corrFactor) {
    return (val * corrFactor).toFixed(0) - 0;
  }

  // If an array is passed as the first argument to the
  // mathematical operation functions, reduce the array
  // using the passed in mathematical function

  function reduceArray(arr, func) {
    return arr.reduce(function (previousValue, currentValue, index, array) {
      return func(previousValue, currentValue);
    });
  }

  // Math Operations

  var sinfulMath = {
    add: function () {
      if (Array.isArray(arguments[0])) {
        return reduceArray(arguments[0], sinfulMath.add);
      }

      var corrFactor = correctionFactor.apply(null, arguments);

      function cback(accum, curr, currI, O) {
        return accum + correctedValue(curr, corrFactor);
      }

      return reduce(arguments, cback, 0) / corrFactor;
    },

    sub: function () {
      if (Array.isArray(arguments[0])) {
        return reduceArray(arguments[0], sinfulMath.sub);
      }

      var corrFactor = correctionFactor.apply(null, arguments),
          first      = arguments[0];

      function cback(accum, curr, currI, O) {
        return accum - correctedValue(curr, corrFactor);
      }

      delete arguments[0];

      return reduce(arguments, cback, correctedValue(first, corrFactor)) / corrFactor;
    },

    mul: function () {
      if (Array.isArray(arguments[0])) {
        return reduceArray(arguments[0], sinfulMath.mul);
      }

      function cback(accum, curr, currI, O) {
        var corrFactor = correctionFactor(accum, curr);

        return correctedValue(accum, corrFactor) * correctedValue(curr, corrFactor) / (corrFactor * corrFactor);
      }

      return reduce(arguments, cback, 1);
    },

    div: function () {
      if (Array.isArray(arguments[0])) {
        return reduceArray(arguments[0], sinfulMath.div);
      }

      function cback(accum, curr, currI, O) {
        var corrFactor = correctionFactor(accum, curr);

        return correctedValue(accum, corrFactor) / correctedValue(curr, corrFactor);
      }

      return reduce(arguments, cback);
    }
  };

  sinfulMath['subtract'] = sinfulMath['sub'];
  sinfulMath['multiply'] = sinfulMath['mul'];
  sinfulMath['divide']   = sinfulMath['div'];

  // Node/CommonJS
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = sinfulMath;
  }
  // AMD
  else if (typeof define === 'function' && define.amd) {
    define(function () {
      return sinfulMath;
    });
  }
  // Browser
  else {
    global['sinfulMath'] = sinfulMath;
  }
})(this);
