const template = document.createElement("template");
template.innerHTML = `
<div>
    <header class="header">
        <h1><slot name="title">Title</slot></h1>
        <div class="close">✖</div>
    </header>
    <div class="message">
        <svg class="SVGicon" width="35" height="45" viewBox="0 0 100 100"></svg>
        <slot name="content"></slot>
    </div>
    <div class="choice">
    </div>
</div>
`;
const css = new CSSStyleSheet();
css.replaceSync(`
:host {
    font-family: system-ui;
    font-weight: 500;
    display: block;
    width: fit-content;
    margin: 24px;
    border: 1px solid #fce;
    box-shadow: rgba(0,0,0,0.4) 0px 0px 20px 0px;
    background: #fff;
}
button,input,select,textarea{
    font-family:inherit;
}
.header {
    position: relative;
}
.header .close {
    position: absolute;
    top: 0;
    right: 0;
    background: #fff;
    color: #555;
    font-size: 16px;
    width: 24px;
    height: 24px;
    text-align: center;
    transition: 0.3s;
}
.close:hover{
    background: #f00;
}
.header h1 {
    font-size: 12px;
    font-weight: normal;
    margin: 0 2px;
}
.message {
    padding: 25px;
    font-size: 12px;
}
.message svg{
    vertical-align: middle;
    margin-right:0.5em;
}
.choice{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: #f0f0f0;
    white-space: nowrap;
}
.choice .buttons {
    text-align: right;
}
.choice .buttons button{
    width: 60px;
    padding: 0.2em 0.8em;
    margin: 0.5em;
    box-sizing: content-box;
    background: #e1e1e1;
    border:none;
    outline:none;
    box-shadow: 0px 0px 0px 1px #777;
}
.choice .buttons button:focus{
    box-shadow: #07d 0px 0px 0px 2px;
}
.choice .buttons button:hover{
    background: #def;
    box-shadow: #07d 0px 0px 0px 1px;
}
`);
const MessageBoxIcon = {
    Question:`<circle cx="50" cy="50" r="45" fill="#06c" stroke="#000" stroke-width="3"/><text x="50" y="50" font-size="80" text-anchor="middle" dominant-baseline="central" fill="#fff" stroke="#000" stroke-width="3">?</text>`,
    Hand:`<circle cx="50" cy="50" r="45" fill="#f00" stroke="#000" stroke-width="3"/><text x="50" y="50" font-size="70" text-anchor="middle" dominant-baseline="central" fill="#fff">✖</text>`,
    Asterisk:`<circle cx="50" cy="50" r="45" fill="#06c" stroke="#000" stroke-width="3"/><text x="50" y="50" font-size="70" text-anchor="middle" dominant-baseline="central" fill="#fff">i</text>`,
    Warning:`<path d="M50 0 L0 100 L100 100 Z" fill="#ff0" stroke="#880" stroke-width="3"/><text x="50" y="50" font-size="70" text-anchor="middle" dominant-baseline="central" fill="#000">!</text>`
};
const MessageBoxButtons = {
    OK:["OK"],
    OKCancel:["OK", "キャンセル"],
    AbortRetryIgnore:["中止(A)", "再試行(R)", "無視(I)"],
    YesNoCancel:["はい(Y)", "いいえ(N)", "キャンセル"],
    YesNo:["はい(Y)", "いいえ(N)"],
    RetryCancel:["再試行(R)", "キャンセル"],
};
customElements.define("dotnet-message",class extends HTMLElement{
	constructor(){
		super();
		this.attachShadow({mode:"open"}).appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector(".SVGicon").innerHTML = MessageBoxIcon[this.dataset.messageboxicon];
        for(let i=0;i<MessageBoxButtons[this.dataset.messageboxbuttons].length;i++){
            const div = document.createElement("div");
            div.className="buttons";
            const button = document.createElement("button");
            button.textContent = MessageBoxButtons[this.dataset.messageboxbuttons][i];
            div.appendChild(button);
            this.shadowRoot.querySelector(".choice").appendChild(div);
        }
		this.shadowRoot.adoptedStyleSheets = [css];
	};
});