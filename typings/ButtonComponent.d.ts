import MessageButton from "../src/MessageButton";
import { EmojiBtn, StyleOption } from '../src/ButtonComponent';

export class ButtonComponent {

    public messageBtn: MessageButton;
    public emoji: EmojiBtn;
    public name: String;
    public style: StyleOption;
    public customId: String;
    public link: String;
    public callback: Function;
    public disabled: Boolean;
    constructor(emoji: EmojiBtn, name: String, style: StyleOption, customId: String, link: String, disabled: Boolean = false, listen: Function);

    toJSON(): any;
    listen(interaction: any);

}