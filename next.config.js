module.exports = {
  reactStrictMode: true,
  async redirects() {
    return (await require('fs-extra').readFile(__dirname + '/_redirects'))
      .toString()
      .replace(/\r/g, '')
      .split('\n')
      .filter(Boolean)
      .map(x => x.split(/ +/))
      .map(([source, destination]) => ({ source, destination, permanent: false }));
  },
  images: {
    domains: ['cdn.discordapp.com', 'morggan.ga', 'bkly.tk', 'media.discordapp.net', 'lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
};