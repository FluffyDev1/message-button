import { MessageButton } from "./MessageButton";
import { EmojiBtn } from './EmojiBtn';
import { StyleOption } from './StyleOption';

export class ButtonComponent {

    public messageBtn: MessageButton;
    public emoji: EmojiBtn;
    public name: String;
    public style: StyleOption;
    public customId: String;
    public link: String;
    public callback: Function;
    public disabled: Boolean;
    constructor(emoji: EmojiBtn, name: String, style: StyleOption, customId: String, link: String, disabled: Boolean, listen: Function);

    toJSON(): any;
    listen(interaction: any);

}