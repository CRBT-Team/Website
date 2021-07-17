module.exports = {
  reactStrictMode: true,
  async redirects() {
    return (await require('fs-extra').readFile(__dirname + '/redirects'))
      .toString()
      .replace(/\r/g, '')
      .split('\n')
      .filter(Boolean)
      .map(x => x.split(/ +/))
      .map(([source, destination]) => ({ source, destination, permanent: false }));
  },
};
