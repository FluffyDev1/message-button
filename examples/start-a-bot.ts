require('dotenv').config();
import * as discord from 'discord.js';
import { MessageButton, EmojiBtn, ButtonComponent } from 'message-button';

const client = new discord.Client();
const buttons = new MessageButton(client);

client.on('ready', () => console.log('Logged in as', client.user.tag));

client.on('message', (message) => {
    if(message.author.bot) return;
    
    if(message.content == 'test') {

        buttons.call(
            message.channel.id,
            'Testing message-button!',
            new ButtonComponent(
                new EmojiBtn(
                    '💋',
                    null,
                    false
                ),
                'Test Button',
                'primary',
                'test_message_button',
                null,
                false,
                /**
                 * 
                 * @param {MessageButton} messageButton 
                 * @param {any} interaction 
                 */
                function(messageButton, interaction) {
                    let user = messageButton.client.users.cache.get(interaction.member.user.id);
                    user.send('Hello from message-button!');
                }
            )
        )

    }
})

client.ws.on(('INTERACTION_CREATE' as discord.WSEventType), (interaction) => buttons.interactionResponse(interaction));

client.login(process.env.token);