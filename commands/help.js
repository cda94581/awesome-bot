const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'List & Usage of all commands',
	aliases: [ 'commands' ],
	usage: '[command name]',
	execute (message, args) {
		let data = [];
		const {	commands } = message.client;
		if (args.length) {
			const name = args[0].toLowerCase();
			const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
			if (!command) return message.channel.send({ content: 'That\'s not a valid command' });
			data[0] = '';
			if (command.aliases) data[0] += `**Aliases**: ${command.aliases.join(', ')}\n`;
			if (command.description) data[0] += `**Description**: ${command.description}\n`;
			if (command.usage) data[0] += `**Usage:** ${prefix}${command.name} ${command.usage}`;
			return message.channel.send({ embeds: [ new Discord.MessageEmbed().setColor('#0077ff').setTitle(command.name).setDescription(data[0]) ]});
		}
		data[0] = 'Here\'s a list of all my commands:\n`';
		data[0] += commands.map(command => command.name).join('`\n`');
		data[0] += `\`\n\nYou can send \`${prefix}help [command name]\` to get information on a specific command`;
		for (i = 0; i < data.length; i++) {
			if (data[i].length > 2000) {
				let tempData = data[i];
				data[i] = tempData.slice(0, 2000);
				data.push(tempData.slice(2000, tempData.length));
			}
			message.channel.send({ embeds: [ new Discord.MessageEmbed().setColor('#0077ff').setTitle('Awesome Bot Help').setDescription(data[i]) ]});
		}
	}
}