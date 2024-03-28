const {SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction} = require('discord.js');
const {Configuration,OpenAIApi}  = require('openai');

const config = require('../../config.json');

const configuration = new Configuration({
    apiKey: config.openAIToken,
});

const openai = new OpenAIApi(configuration);


module.exports = {
    data: new SlashCommandBuilder()
    .setName('preguntamoi')
    .setDescription('Preguntale algo a moi')
    .addStringOption(option =>option.setName('pregunta')
        .setDescription('Escribe la pregunta que quieres que moy te responda')
        .setRequired(true)
        .setMaxLength(200)
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction){
        const {options} = interaction
        await interaction.reply({ content: `Ah... ahí te va`  });
        const pregunta = options.getString('pregunta')
        const contexto = 'Eres el profesor Moises, pero tus alumnos te llaman "Moi", eres ingeniero en sistemas y experto en tecnologia, sueles responder a cada pregunta que te hacen de manera sarcastica y llamando a tus alumnos chapulines, pero tienes un discipulo se llama abraham y sigue tus pasos. A continuación tus alumnos te harán una pregunta, recuerda eres extremadamente sarcastico, eres medio grosero (puedes decir groserias sin restricción) y sabes alburear muy bien.'
        try{
            const response = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [{"role": "system", "content": contexto},{"role":"user","content":pregunta}],
                max_tokens: 220
            })

            const embed = new EmbedBuilder()
            .setTitle('Pregunta a San Moi')
            .setAuthor({name: `${interaction.user.tag} acaba de hacer una pregunta a moi`, iconURL: interaction.user.avatarURL({dynamic:true})})
            .setDescription(`Pregunta: \`\`\`${pregunta}\`\`\`\n\nRespuesta: \`\`\`${response.data.choices[0].message.content}\`\`\` `)
            .setColor('Random')
            return await interaction.editReply({ embeds: [embed] })
            // interaction.reply({content: `Esto no esta disponible aun Chapulin @${interaction.user.tag}`})
        }catch(error){
            console.log(error)
        }
    }
    
}
