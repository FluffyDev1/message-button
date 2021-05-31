require('dotenv').config();
const discord = require('discord.js');
const { MessageButton, EmojiBtn, ButtonComponent } = require('message-button');

const client = new discord.Client();
const buttons = new MessageButton(client);

client.on('ready', () => console.log('Logged in as', client.user.tag));

client.on('message', (message) => {
    if(message.author.bot) return;
    
    if(message.content == 'test') {

        buttons.call(
            message.channel.id,
            'Testing message-button!',
            [
                new ButtonComponent(
                    new EmojiBtn(
                        '💋',
                        null,
                        false
                    ), // emoji | null for no emoji
                    'Test Button', // text
                    'primary', // style
                    'test_message_button', // custom id
                    null, // link
                    false, // disabled = true, enabled = false
                    /**
                     * 
                     * @param {MessageButton} messageButton 
                     * @param {any} interaction 
                     */
                    function(messageButton, interaction) { //callback
                        let user = messageButton.client.users.cache.get(interaction.member.user.id);
                        user.send('Hello from message-button!');
                    }
                ),
                
                /* Link Button */
                new ButtonComponent(
                    null, // emoji | null for no emoji
                    'Link to Discord.com', // text
                    'secondary', // style
                    null, // custom id | null for link
                    "https://discord.com", // link
                    false, // disabled = true, enabled false
                    function(){} // callback
                )
            ], // buttons
            null // embed
        )

    } else if(message.content == 'edit') {

        buttons.call(message.channel.id,
            'Test Edit Feature',
            [
                new ButtonComponent(
                    null, // emoji | null for no emoji
                    'Click to Edit', // text
                    'danger', // style
                    'edit_btn', // custom id
                    null, // link
                    false, // disabled = true, enabled = false
                    /**
                     * 
                     * @param {MessageButton} messageButton 
                     * @param {any} interaction 
                     */
                    function(messageButton, interaction) { //callback
                        let btn = buttons.getButtonByCustomId(interaction.data.custom_id);
                        btn.disabled = true;
                        btn.name = 'Tested Edit';
                        buttons.editMessage(
                            interaction.message.channel_id,
                            interaction.message.id,
                            'Tested!',
                            [btn],
                            null // embed
                        )
                    }
                )
            ], // buttons
            null // embed
        );

    }
})

client.ws.on('INTERACTION_CREATE', (interaction) => buttons.interactionResponse(interaction));

client.login(process.env.token);
