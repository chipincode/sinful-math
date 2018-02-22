var sinfulMath = require('../index');
var add        = sinfulMath.add;
var subtract   = sinfulMath.sub;
var multiply   = sinfulMath.mul;
var divide     = sinfulMath.div;

var assert = require('assert');

describe("sinful-math", function () {
  describe("addition", function () {
    it("should add a series of arguments", function () {
      assert.equal(add(6.0985, -0.035, -0.08), 5.9835);
    });

    it("should add small numbers", function () {
      assert.equal(add(1e-7, 1e-7), 2e-7);
      assert.equal(add(1e-6, 1e-7), 0.0000011);
      assert.equal(add(1.123456789012345e10, 1e-7), 11234567890.1234501);
    });

    it("should add the values in an array", function () {
      assert.equal(add([6.0985, -0.035, -0.08]), 5.9835);
    });

    it("should return same number when only one number is passed", function () {
      assert.equal(add(6.0985), 6.0985);
    });

    it("should return NaN when a non-number is passed as an argument", function () {
      assert(isNaN(add(6.0985, "x")));
    });
  });

  describe("subtraction", function () {
    it("should subtract a series of arguments", function () {
      assert.equal(subtract(6.0985, -0.035, -0.08), 6.2135);
    });

    it("should subtract the values in an array", function () {
      assert.equal(subtract([6.0985, -0.035, -0.08]), 6.2135);
    });

    it("should return same number when only one number is passed", function () {
      assert.equal(subtract(6.0985), 6.0985);
    });

    it("should return NaN when a non-number is passed as an argument", function () {
      assert(isNaN(subtract(6.0985, "x")));
    });
  });

  describe("multiplication", function () {
    it("should multiply a series of arguments", function () {
      assert.equal(multiply(6.0985, -0.035, -0.08), 0.0170758);
    });

    it("should multiply the values in an array", function () {
      assert.equal(multiply([6.0985, -0.035, -0.08]), 0.0170758);
    });

    it("should return same number when only one number is passed", function () {
      assert.equal(multiply(6.0985), 6.0985);
    });

    it("should return NaN when a non-number is passed as an argument", function () {
      assert(isNaN(multiply(6.0985, "x")));
    });
  });

  describe("division", function () {
    it("should divide a series of arguments", function () {
      assert.equal(divide(0.3, 0.1), 3);
    });

    it("should divide the values in an array", function () {
      assert.equal(divide([0.3, 0.1]), 3);
    });

    it("should return same number when only one number is passed", function () {
      assert.equal(divide(0.1), 0.1);
    });

    it("should return NaN when a non-number is passed as an argument", function () {
      assert(isNaN(divide(0.3, "x")));
    });

    it("should divide big number by a divisor with large precision", function () {
      assert.equal(divide(25, 0.000034567890123456789012345), 723214.5181760951)
    })
  });
});
