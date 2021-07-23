require('dotenv').config();

const discord = require('discord.js');
const { writeFileSync } = require('fs');
const x = require('./credits');

const client = new discord.Client({ intents: [] });

client.on('ready', async() => {
  console.log('Logged in as: ' + client.user.username);

  const set = new Set();
  Object.values(x.userData).forEach((value) => {
    set.add(value.discord);
  });

  console.log(set);

  const map = {};

  await Promise.all([...set].map(async (value) => {
    const user = await client.users.fetch(value);
    const url = await user.avatarURL({ size: 1024 });
    map[value] = url;
  }));

  writeFileSync('pfpdata.ts', `// eslint-disable-next-line import/no-anonymous-default-export
export default ${JSON.stringify(map, null, 2)}`)

  client.destroy();
});

client.login(process.env.DISCORD_TOKEN)

// '/users/{user.id}'