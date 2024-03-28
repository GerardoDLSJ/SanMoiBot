module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        console.log(`El ${client.user.username} esta online!`);
        console.log(client.channels);
        
        
        // client.sendMessage('1135970145823621190',"¡Ya llegue...! ¿Que paso chapulines? 👊");
    }
}