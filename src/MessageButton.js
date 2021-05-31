"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ButtonComponent_1 = require("./ButtonComponent");
const fetch = require("node-fetch");
const discord_js_1 = require("discord.js");
const fs = require("fs");
const { default: ButtonComponent } = require("./ButtonComponent");
class MessageButton {
    constructor(client, saveCache = false, saveTo = '') {
        this.client = client;
        if (saveCache == true && saveTo == '') {
            throw Error(`If saveCache is true, saveTo cannot be empty!`);
        }
        this.saveCache = saveCache;
        this.saveTo = saveTo;
        this.cache = new discord_js_1.Collection();
        if (saveCache) {
            if (!fs.existsSync(saveTo))
                return;
            let file = JSON.parse(fs.readFileSync(saveTo, 'utf8'));
            for (let b in file) {
                let btn = this.getButtonFromJSON(file[b]);
                btn.messageBtn = this;
                this.cache.set(b, btn);
            }
        }
    }
    getButtonFromJSON(b) {
        return new ButtonComponent_1.default(b.emoji, b.name, b.style, b.customId, b.link, b.disabled, eval(`(${b.callback})`));
    }
    call(channelId = '', message, components, embed) {
        return __awaiter(this, void 0, void 0, function* () {
            let formattedComponents = components.map(a => {
                a.messageBtn = this;
                if (a.style != 'danger' &&
                    a.style != 'link' &&
                    a.style != 'success' &&
                    a.style != 'primary' &&
                    a.style != 'secondary')
                    throw Error('This style (' + a.style + ') it\'s not a correct style option!');
                let s = 1;
                if (a.style === 'primary')
                    s = 1;
                if (a.style === 'secondary')
                    s = 2;
                if (a.style === 'success')
                    s = 3;
                if (a.style === 'danger')
                    s = 4;
                if (a.style === 'link')
                    s = 5;
                if (a.style == 'link' && a.customId) {
                    throw Error('Link Buttons can\'t have ids!');
                }
                ;
                let arr = {
                    type: 2,
                    label: a.name,
                    style: s,
                    custom_id: a.customId
                };
                if (a.style == 'link')
                    arr['url'] = a.link;
                if (a.emoji)
                    arr['emoji'] = a.emoji;
                if (a.style != 'link') {
                    this.cache.set(a.customId, a);
                    if (this.saveCache) {
                        if (!fs.existsSync(this.saveTo))
                            fs.writeFileSync(this.saveTo, '{}');
                        let f = JSON.parse(fs.readFileSync(this.saveTo, 'utf8'));
                        if (f[a.customId]) {
                            if (f[a.customId].callback.length < a.callback.toString().length || f[a.customId].callback.length > a.callback.toString().length) {
                                f[a.customId] = a.toJSON();
                            }
                        }
                        else {
                            f[a.customId] = a.toJSON();
                        }
                        fs.writeFileSync(this.saveTo, JSON.stringify(f, null, 4));
                    }
                }
                return arr;
            });
            let bodyJSON = {
            };
	    if(message != '') bodyJSON['content'] = message;
            if(components.length != 0) bodyJSON['components'] =  [
                {
                    type: 1,
                    components: formattedComponents
                }
            ];
            if(embed) bodyJSON['embed'] = embed.toJSON();
            let res = yield fetch(`https://discord.com/api/v9/channels/${channelId}/messages`, {
                method: 'POST',
                headers: {
                    'authorization': 'Bot ' + this.client.token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(bodyJSON)
            });
            let resp = yield res.json();
            if(resp.message) {

                if(resp.message.includes('rate limited')) {
                    let wait = require('util').promisify(setTimeout);
                    yield wait((resp.retry_after + 0.100) * 1000);
                    yield fetch(`https://discord.com/api/v9/channels/${channelId}/messages`, {
                        method: 'POST',
                        headers: {
                            'authorization': 'Bot ' + this.client.token,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(bodyJSON)
                    });
                }

            }
        });
    }

    /**
     * 
     * @param {String} customId 
     * @returns {ButtonComponent}
     */
    getButtonByCustomId(customId) {
        let btn = this.cache.get(customId);
        return btn;
    }
    editMessage(channelId, messageId, content, buttons, embed) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = {};
            if (content)
                body['content'] = content;
            let formattedComponents = buttons.map(a => {
                a.messageBtn = this;
                if (a.style != 'danger' &&
                    a.style != 'link' &&
                    a.style != 'success' &&
                    a.style != 'primary' &&
                    a.style != 'secondary')
                    throw Error('This style (' + a.style + ') it\'s not a correct style option!');
                let s = 1;
                if (a.style === 'primary')
                    s = 1;
                if (a.style === 'secondary')
                    s = 2;
                if (a.style === 'success')
                    s = 3;
                if (a.style === 'danger')
                    s = 4;
                if (a.style === 'link')
                    s = 5;
                if (a.style == 'link' && a.customId) {
                    throw Error('Link Buttons can\'t have ids!');
                }
                let arr = {
                    type: 2,
                    label: a.name,
                    style: s,
                    custom_id: a.customId,
                    disabled: a.disabled
                };
                if (a.style == 'link')
                    arr['url'] = a.link;
                if (a.emoji)
                    arr['emoji'] = a.emoji;
                if (a.style != 'link') {
                    this.cache.set(a.customId, a);
                    if (this.saveCache) {
                        if (!fs.existsSync(this.saveTo))
                            fs.writeFileSync(this.saveTo, '{}');
                        let f = JSON.parse(fs.readFileSync(this.saveTo, 'utf8'));
                        if (f[a.customId]) {
                            if (f[a.customId].callback.length < a.callback.toString().length || f[a.customId].callback.length > a.callback.toString().length) {
                                f[a.customId] = a.toJSON();
                            }
                        }
                        else {
                            f[a.customId] = a.toJSON();
                        }
                        fs.writeFileSync(this.saveTo, JSON.stringify(f, null, 4));
                    }
                }
                return arr;
            });
            if (buttons.length != 0) {
                body['components'] = [
                    {
                        type: 1,
                        components: formattedComponents
                    }
                ];
            }
            if(embed) body['embed'] = embed.toJSON();
            fetch(`https://discord.com/api/v9/channels/${channelId}/messages/${messageId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bot ' + this.client.token
                },
                body: JSON.stringify(body)
            });
        });
    }
    deleteMessage(channelId, messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            fetch(`https://discord.com/api/v9/channels/${channelId}/messages/${messageId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bot ' + this.client.token
                }
            });
        });
    }
    interactionResponse(interaction) {
        let member = interaction.member;
        if (!member)
            return;
        let user = member.user;
        if (!user)
            return;
        if (interaction.data) {
            let btn = interaction.data;
            this.client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 6,
                    data: {
                        flags: null,
                    },
                },
            });
            let button = this.getButtonByCustomId(btn['custom_id']);
            if (!button)
                return;
            if (button.link)
                return;
            button.listen(interaction);
        }
    }

    /**
     * @returns {ButtonComponent[]}
     */
    getButtons(interaction) {

        let data = interaction.data;
        if(data) {
            let message = data.message;
            if(message) {

                let components = message.components;
                if(components) {

                    let buttonsInteraction = components[0].components;
                    let buttons = buttonsInteraction.map(a => {
                        return this.getButtonByCustomId(a.custom_id);
                    });
                    return buttons;

                }
                
            }
        }

    }
}
exports.default = MessageButton;
