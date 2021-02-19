/*
All Copyright ©️ GO'S To : NIRO
OUR YOUTUBE CHANNEL : https://youtube.com/channel/UC7QtAaqlUhBmMojJISSLJkg
*/

const express = require('express');
const app = express();

app.listen(() => console.log('💕💕💕💕'));

app.use('/ping', (req, res) => {
	res.send(new Date());
});

const Discord = require('discord.js');
const NIRO = new Discord.Client();

const prefix = process.env.PREFIX;
const developers = process.env.DEVS;

NIRO.login(process.env.NTOKEN);

NIRO.on('ready', () => {
	console.log(`${NIRO.user.username} Im Ready!`);
});

NIRO.on('message', msg => {
	if (msg.content.startsWith(prefix + 'help')) {
		msg.author.send(`**\`\`\`Bot Commands\`\`\`
    🔥 ${prefix}bc
    🔥 ${prefix}setg
    🔥 ${prefix}sets
    🔥 ${prefix}setava
    🔥 ${prefix}setname
    🔥 ${prefix}leave**`);
		msg.react('🌚');
	}
});

const adminprefix = prefix;

NIRO.on('message', async message => {
	var argresult = message.content
		.split(` `)
		.slice(1)
		.join(' ');
	if (!developers.includes(message.author.id)) return;

	if (message.content.startsWith(adminprefix + 'setg')) {
		NIRO.user.setGame(argresult);
		message.channel.send(`**✅   ${argresult}**`);
	} else if (message.content === adminprefix + 'leave') {
		message.guild.leave();
		console.error('طردوني و لاد الكلب 🤣🤣');
	} else if (message.content.startsWith(adminprefix + 'sets')) {
		NIRO.user.setGame(argresult, 'https://www.twitch.tv/NIRO');
		message.channel.send(`**✅**`);
	}
	if (message.content.startsWith(adminprefix + 'setname')) {
		NIRO.user.setUsername(argresult).then;
		message.channel.send(`Changing The Name To ..**${argresult}** `);
	} else if (message.content.startsWith(adminprefix + 'setava')) {
		NIRO.user.setAvatar(argresult);
		message.channel.send(`Changing The Avatar To :**${argresult}** `);
	}
});

NIRO.on('message', async message => {
	var command = message.content.split(' ')[0];
	command = command.slice(prefix.length);
	if (!message.channel.guild) return;
	var args = message.content
		.split(' ')
		.slice(1)
		.join(' ');
	if (command == 'bc') {
		if (!message.member.hasPermission('ADMINISTRATOR')) {
			return message.react('❌');
		}
		if (!args) {
			return message.reply(
				'**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست 📃**'
			);
		}
		message.channel
			.send(`
      اضغط ✅ لارسال بامبيد
      اضغط ❌ لارسال بدون امبيد
      للالغاء ✨
      `
			)
			.then(async m => {
    await  m.react("✅")
        m.react("❌")
        m.react("✨")

				let yesFilter = (reaction, user) =>
					reaction.emoji.name == '✅' && user.id == message.author.id;
				let noFiler = (reaction, user) =>
					reaction.emoji.name == '❌' && user.id == message.author.id;
	let nnnnnnn = (reaction, user) =>
					reaction.emoji.name == '✨' && user.id == message.author.id;

				let yes = m.createReactionCollector(yesFilter);
				let no = m.createReactionCollector(noFiler);
				let nb = m.createReactionCollector(nnnnnnn);

				yes.on('collect', v => {
					m.delete();
					message.channel
						.send(
							`:ballot_box_with_check: | Done ... The Broadcast Message Has Been Sent For ${
								message.guild.memberCount
							} Members`
						)
						.then(msg => msg.delete(5000));
					message.guild.members.forEach(member => {
	let bc = new Discord.RichEmbed()
							.setColor('RANDOM')
							.setThumbnail(message.author.avatarURL)
							.setTitle('**Broadcast ✨**')
					
							.addField('**Server 🌀**', message.guild.name)
							.addField('**Sender 👨🏻‍💻**', message.author.username)
							.addField('**Message 📃**', args);

						member.sendEmbed(bc);

					});
				});


        nb.on('collect', ddd => {
          m.delete()
          message.delete()
          message.channel.send("تم الالغاء بنحاج")
        })


				no.on('collect', v => {
          					message.guild.members.forEach(mem => {

                    
			mem.send(`${args}`)
    m.delete()
      message.delete()
message.reply(`☑️ | Done The Broadcast Message Has Been Sent For ${
								message.guild.memberCount}
                Members
                 `)
                    })
				});
			});
	}أا
});
