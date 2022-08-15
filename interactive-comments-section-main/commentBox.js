const template = document.createElement("template");
template.innerHTML =
    `<link rel="stylesheet" href="commentBox.css" />
<div class="container">
<div class="comment">
<div class="vote">
    <img class="plus" src="./images/icon-plus.svg" alt="plus" disabled="false"/>
    <span class="score"></span>
    <img class="minus" src="./images/icon-minus.svg" alt="minus" disabled="false"/>
</div>
<div class="main-content">
    <div class="header">
        <div class="user_details">
            <img class="profile" src="" alt="profile"/>
            <span class="username"></span>
            <span class="time_span"></span>
        </div>

        <div class="edit_section">
            <img class="reply_btn" src="./images/icon-reply.svg" alt="reply"/>
            <span class="reply_btn"> Reply </span>
        </div>
    </div>
    <p class="comment_text"></p>
    <button class="update_btn"> Update </button>
</div>
</div>
</div>
`


export class CommentBox extends HTMLElement {
    constructor(user, className) {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.container = this.shadowRoot.querySelector(".container");
        this.comment = this.shadowRoot.querySelector(".comment");

        if (className) { this.container.classList.add(className); }

        this.score = this.comment.querySelector(".score");
        this.score.innerHTML = user.score;

        this.profile = this.comment.querySelector(".profile");
        this.profile.setAttribute("src", user.user.image.png);

        this.username = this.comment.querySelector(".username");
        this.username.innerHTML = user.user.username;

        this.createdAt = this.comment.querySelector(".time_span");
        this.createdAt.innerHTML = user.createdAt;

        this.commentText = this.comment.querySelector(".comment_text");
        this.commentText.innerHTML = user.content;

        if (user.user.username == "juliusomo") {
            // add 'YouIcon', 'deleteButton' & 'EditButton'

            this.edit_section = this.comment.querySelector(".edit_section");

            const span_ele1 = document.createElement("span");
            span_ele1.innerHTML = "you";
            span_ele1.classList.add("youIcon");
            this.username.after(span_ele1);

            this.edit_section.children[0].setAttribute("class", "delete_btn");
            this.edit_section.children[0].setAttribute("src", "./images/icon-delete.svg");
            this.edit_section.children[1].setAttribute("class", "delete_btn");
            this.edit_section.children[1].innerHTML = "Delete";


            const img = document.createElement("img");
            img.classList.add("edit_btn");
            img.src = "./images/icon-edit.svg";
            this.edit_section.children[1].after(img); //insert img element 

            const span_ele2 = document.createElement("span");
            span_ele2.classList.add("edit_btn");
            span_ele2.innerHTML = "Edit";
            this.edit_section.children[2].after(span_ele2);

        }

        const user_details = this.comment.querySelector(".user_details");

    }

    connectedCallback() {
        // triggering an 'click' event to reply button
        const reply_event = this.shadowRoot.querySelectorAll(".reply_btn");
        reply_event.forEach( i => {
            i.addEventListener("click", () => this.ReplyBtnClicked());
        })

        // triggering 'click' event to plus & minus button
        const vote_event = this.shadowRoot.querySelectorAll(".vote img");
        vote_event.forEach( i => {
            i.addEventListener("click", (d) => {
                // console.log(d.path[0]);
                this.voteBtnClicked(d)
            }) 
        })

        // triggering 'click' event to 'edit' button to edit the user reply
        const edit_section = this.comment.querySelector(".edit_section");
        Array.from(edit_section.children).forEach( i => {
            if(i.className == "edit_btn"){
                i.addEventListener("click", () => {this.editBtnClicked()
                }, {once: true});   
            }
        });

        //triggering "click" event on 'update' button which will update the comment
        const updateBtn = this.shadowRoot.querySelector(".update_btn");
        updateBtn.addEventListener("click", () => this.updateBtnClicked());

        // triggering delete button event
        const deleteBtn = this.shadowRoot.querySelectorAll(".delete_btn");
        if(deleteBtn){
            deleteBtn.forEach(i => {
                i.addEventListener("click", () => this.deleteBtnClicked());
            });
        }
        
    }

    deleteBtnClicked() {
        this.dispatchEvent(new CustomEvent("deleteBtn-clicked", {
            bubbles: true
        }));
    }

    updateBtnClicked() {
        this.dispatchEvent(new CustomEvent("updateBtn-clicked", {
            bubbles: true
        }));
    }

    editBtnClicked() {
        const updateBtn = this.shadowRoot.querySelector(".update_btn")
        updateBtn.style.display = "block";

        this.dispatchEvent(new CustomEvent("editBtn-clicked", {
            bubbles: true
        }))
    }

    voteBtnClicked(d) {
        this.dispatchEvent(new CustomEvent("voteBtn-clicked", { 
            bubbles: true, detail: d.path
        }));
    }

    ReplyBtnClicked() {
        //call Parent
        this.dispatchEvent(new CustomEvent("replyBtn-clicked", { 
            bubbles: true
        }));
    }

}

customElements.define("comment-box", CommentBox);


