module.exports.run = async (bot, message, args) => {
  
    const canvas = Canvas.createCanvas(700, 250);

    let mName = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;


	const ctx = canvas.getContext('2d');

    const applyText = (canvas, text) => {

        const ctx = canvas.getContext('2d');
    
        let fontSize = 70;
    
    
    
        do {
    
            ctx.font = `${fontSize -= 10}px sans-serif`;
    
        } while (ctx.measureText(text).width > canvas.width - 300);
    
    
    
        return ctx.font;
    
    };


	// const background = await Canvas.loadImage('./wallpaper.jpg');

	// ctx.drawImage(background, 0, 0, canvas.width, canvas.height);



	// ctx.strokeStyle = '#74037b';

	// ctx.strokeRect(0, 0, canvas.width, canvas.height);



	// ctx.font = '28px sans-serif';

	// ctx.fillStyle = '#ffffff';

	// ctx.fillText('Canvas is amazing...', canvas.width / 2.5, canvas.height / 3.5);



	ctx.font = applyText(canvas, `${mName.displayName}!`);

	ctx.fillStyle = '#ffffff';

	ctx.fillText(`${mName.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);



	ctx.beginPath();

	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);

	ctx.closePath();

	ctx.clip();



	const { body: buffer } = await snekfetch.get(mName.user.displayAvatarURL);

	const avatar = await Canvas.loadImage(buffer);

	ctx.drawImage(avatar, 25, 25, 200, 200);



	const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');



	message.channel.send(attachment);

}

module.exports.help = {
    name: "test",
    hName: "test",
    Description: "test",
	usage: "test!",
	permission: "developer.testing"
}
