module.exports = {
    name: 'guildCreate',
    once: true,
    async execute(guild){
        guild.channels.cache.forEach(element => {
            console.log(element.name)
        });
        let channel = guild.channels.cache.find(
            (ch) => ch.name.toLowerCase() === 'chat-general',
          );
        
        if (!channel) return console.log('Where should I post?');
            
        console.log(channel)

        channel.send('¡Ya llegue...! ¿Que paso chapulines? 👊');
    }
}