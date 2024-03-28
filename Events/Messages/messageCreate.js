const messagesMoi = ['Que onda chapulín','¿Otra semana de chocolate?','Estudiele','Ahí va el pase de lista 👊','No lo quieras todo masticado chapulin','Ponganse a estudiar','¿Donde esta Abraham?','Nombre chapulin...','Lo que diga Lalito','Como ves markitos?','¿Un implante NFC?','Ahi les va... anotenle','Mira, mira como ves a este...', '¿A ver, en que nos quedamos?','Estas verde chapulin...']
const frasesParaLenning = ['Ya pongale Lenning','Ya ya lenning ya fue mucho', 'Ya vayase lenning', 'Lenning hiciste el semestre pasado de chocolate']
const namingMoi = ['moi','moy','moink','boing','moynk','moing','chapulin']

const idLenning = '1126565685280124948';

function mensajeAleatorio(messages = []){
    const random = Math.floor(Math.random() * messages.length);
    return messages[random]
}
function existsNameMoi(message = '', messagesMoi = []){
    return messagesMoi.some(m => message.toLowerCase().includes(m))
}

function mensajeALenning(message){
    const mensajeRandom = mensajeAleatorio(frasesParaLenning);
    const posibilidad = Math.random();

    if(posibilidad >= 0.1 && posibilidad < 0.2){
        message.reply({content: mensajeRandom});
    }
}


module.exports = {
    name:"messageCreate",
    async execute(message, client){

        let prefix = '+'
        if( existsNameMoi(message.content,namingMoi) && !message.author.bot){
            
            if(message.author.id === idLenning){
                mensajeALenning(message);
            }

            if(message)
                message.reply({content: `${mensajeAleatorio(messagesMoi)}`})
        
            
        };

        if(!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const commandName = args.shift().toLowerCase()

        const command = client.pcommands.get(commandName) || client.pcommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
        if(!command) return;

        try {
            command.execute(message,args)
        } catch (error) {
            message.reply({content: "Ocurrio un error chapulin"})
            console.log(error)
        }
    }
}