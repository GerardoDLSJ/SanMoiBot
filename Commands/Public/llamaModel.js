const {SlashCommandBuilder, Embed, ChatInputCommandInteraction}  = require('discord.js');

// const {LLM} = require('llama-node');

// const LLamaCpp = require('../../node_modules/llama-node/dist/llm/llama-cpp.cjs');



async function llamando(){

    const llama = new LLM(LLamaCpp.LLamaCpp);

    let respuesta = '';
    console.log('Hola')

    await llama.load({
        modelPath: './models/airoboros-13b-gpt4.ggmlv3.q4_0.bin',
        enableLogging: false,
        nCtx: 1024,
        seed: 0,
        f16Kv: false,
        logitsAll: false,
        vocabOnly: false,
        useMlock: false,
        embedding: false,
        useMmap: true,
         
    })
    let pregunta = 'Buenos dias profe moi';
    let prompt = `
    ${pregunta}`
    const options = {
        nGpuLayers: 4, 
        nThreads: 3,
        nTokPredict: 2048,
        topK: 40,
        topP: 0.1,
        temp: 0.5,
        repeatPenalty: 1,
        prompt,
    }
    await llama.createCompletion(options, (response) => {
        respuesta += response.token;    
    }).then(res => console.log(res));

    console.log(respuesta)
    return 'se ejecuto esta cosa'
}

module.exports = {

    data: new SlashCommandBuilder()
    .setName('moiresponde')
    .setDescription('Preguntale algo relacionado a la clase a Moi')
    .addStringOption(option => option.setName('pregunta')
    .setDescription('Escribe la pregunta que quieres que Moi responda')
    .setRequired(true)
    .setMaxLength(250)
    ),
   /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction){
        console.log('hola 1')
        const {options} = interaction
        const pregunta = options.getString('pregunta')
        try {
            // const response = await llamando();
            // console.log(response)
            interaction.reply({content: `Algo salio mal chapulin ${interaction.user.username}`})
        } catch (error) {
            console.log(error)
            interaction.reply({content:'Algo salio mal chapulin'})
        }
    }
}