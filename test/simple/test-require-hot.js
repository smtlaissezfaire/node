require("../common");

var assert = require("assert"),
    fs     = require("fs");

// should update code
var filePath     = __dirname + "/../fixtures/require-hot.js",
    requirePath  = __dirname + "/../fixtures/require-hot";

fs.writeFile(filePath, "exports.foo = 'foo';", function() {
  assert.equal("foo", require.hot(requirePath).foo);

  fs.writeFile(filePath, "exports.foo = 'bar';", function() {
    assert.equal("bar", require.hot(requirePath).foo);

    // cleanup the test file
    fs.unlink(filePath);
  });
});

// should be able to require a native module
assert.equal(require("fs").writeFile, require.hot("fs").writeFile);