// fetch("commentInput-box.html")
//     .then(stream => stream.text())
//     .then(text => define(text));

const template = document.createElement("template");
template.innerHTML =
    `<link rel="stylesheet" href="commentInput-box.css"/>
<div class="container">
    <div class="commentInput-container">
        <div><img src="./images/avatars/image-juliusomo.png" alt="Profile" /></div>
        <div><textarea id="comment-text" cols="55" rows="5" placeholder="Add a comment..."></textarea></div>
        <div><button id="send-btn"> Send </button></div>
    </div>
</div>
`

export class CommentInput extends HTMLElement {
    constructor(class1, class2 = "") {
        super();

        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.commentInput = this.shadowRoot.querySelector("commentInput-container");
        this.textarea = this.shadowRoot.querySelector("#comment-text");

        if(class2) {
            this.textarea.setAttribute("cols", "45");
        }

        this.container = this.shadowRoot.querySelector(".container");
        this.container.classList.add(class1);

        if (class2) { this.container.classList.add(class2); }

        if (this.container.classList.contains("user_reply")) {
            const replyBtn = this.shadowRoot.querySelector("#send-btn")
            replyBtn.innerHTML = "Reply";
        }
    }

    connectedCallback() {

        const sendBtn = this.shadowRoot.querySelector("#send-btn")
        sendBtn.addEventListener("click", () => this.addYourComment());
    }

    // to add user's reply
    addYourReply() {
        // console.log("reply button clicked");
        this.dispatchEvent(new CustomEvent("addReply", {
            bubbles: true
        }));
    }

    //to add user's comment
    addYourComment() {
        // console.log("send button is clicked");
        this.dispatchEvent(new CustomEvent("addComment", {
            bubbles: true
        }))
    }

}

customElements.define("comment-input", CommentInput);

