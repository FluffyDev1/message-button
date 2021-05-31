import { Client, Collection, MessageEmbed } from "discord.js";
import { ButtonComponent } from ".";

export class MessageButton {

    public client: Client;
    public cache: Collection<String, ButtonComponent>;
    private saveCache: Boolean;
    private saveTo: String;
    constructor(client: Client, saveCache: Boolean, saveTo: String);

    public getButtonFromJSON(b: any);
    public call(channelId, message: String, buttons: ButtonComponent[], embed: MessageEmbed);
    public getButtonByCustomId(customId: String): ButtonComponent;
    public editMessage(channelId: String, messageId: String, content: String, buttons: ButtonComponent[], embed: MessageEmbed);
    public deleteMessage(channelId: String, messageId: String);
    public getButtons(interaction: any): ButtonComponent[];

}