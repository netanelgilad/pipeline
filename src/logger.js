module.exports = {
  debug() {
    console.log.apply(console, Array.prototype.slice.apply(arguments));
  }
};