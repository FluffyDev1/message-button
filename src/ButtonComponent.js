"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmojiBtn = void 0;
class ButtonComponent {
    constructor(emoji, name, style, customId, link, disabled = false, listen) {
        this.emoji = emoji;
        this.name = name;
        this.style = style;
        this.customId = customId;
        this.callback = listen;
        this.link = link;
        this.disabled = disabled;
    }
    toJSON() {
        return {
            emoji: this.emoji,
            name: this.name,
            style: this.style,
            customId: this.customId,
            link: this.link,
            disabled: this.disabled,
            callback: this.callback.toString()
        };
    }
    listen(interaction) {
        let callb = this.callback;
        callb(this.messageBtn, interaction);
    }
}
exports.default = ButtonComponent;
class EmojiBtn {
    constructor(name, id, animated) {
        return { name, id, animated };
    }
}
exports.EmojiBtn = EmojiBtn;
