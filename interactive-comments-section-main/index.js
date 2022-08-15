import { CommentBox } from "./commentBox.js";
import { CommentInput } from "./commentInput-box.js";


async function asyncCall() {
    const res = await fetch("data.json");
    const json = await res.json();
    // console.log(json);

    displayData(json);
}

asyncCall();

function displayData(json) {
    const main = document.querySelector(".main");
    json.comments.forEach((user) => {
        main.appendChild(new CommentBox(user, ""));

        if (user.replies.length) {
            user.replies.forEach(user_reply => {
                main.appendChild(new CommentBox(user_reply, "reply"));
            });
        }
    });

}

// like and dislike
document.addEventListener("voteBtn-clicked", addVote);
function addVote(e) {
    const target = e.detail[0];
    const score = e.detail[1].innerText;
    let plus = e.target.shadowRoot.querySelector(".plus")
    let minus = e.target.shadowRoot.querySelector(".minus")

    if (target.classList[0] == "plus") {
        if ((plus.getAttribute("disabled", "false")) == "false") {
            e.detail[1].children[1].innerText = parseInt(score) + 1;
            plus.setAttribute("disabled", "true");
            minus.setAttribute("disabled", "false");
        }
    }
    else {
        if (score > 0) {
            if ((minus.getAttribute("disabled", "false")) == "false") {
                e.detail[1].children[1].innerText = parseInt(score) - 1;
                minus.setAttribute("disabled", "true");
                plus.setAttribute("disabled", "false");
            }
        }
    }
}

// edit your reply
document.addEventListener("editBtn-clicked", editYourReply);
function editYourReply(e) {
    const commentText = e.target.shadowRoot.querySelector(".comment_text")
    // console.log(e.target.shadowRoot.querySelector(".main-content"));

    const textarea = document.createElement("textarea");
    textarea.cols = "60"
    textarea.rows = "5";
    textarea.innerHTML = commentText.innerText;

    commentText.style.display = "none";
    commentText.before(textarea);

    //changing the value of textarea on altering the text
    textarea.addEventListener("input", (e) => {
        textarea.innerHTML = e.target.value;
    })
}

// listening to update button event when clicked
document.addEventListener("updateBtn-clicked", updateYourReply);
function updateYourReply(e) {
    const updateBtn = e.target.shadowRoot.querySelector(".update_btn");
    const commentText = e.target.shadowRoot.querySelector(".comment_text");
    const textarea = e.target.shadowRoot.querySelector("textarea")
    commentText.innerHTML = textarea.innerHTML;

    textarea.style.display = "none";
    commentText.style.display = "block";
    updateBtn.style.display = "none";
}


// click reply button
document.addEventListener("replyBtn-clicked", appendCommentInputBox);
function appendCommentInputBox(e) {

    if (e.target.shadowRoot.children[1].classList.contains("reply")) {
        e.target.after(new CommentInput("user_reply", "reply_to_reply"));
    }
    else {
        e.target.after(new CommentInput("user_reply", ""));
    }

    //selecting the new added commentInput
    const newCommentInputBox = e.target.nextElementSibling;
    const textarea = newCommentInputBox.shadowRoot.querySelector("#comment-text");
    textarea.addEventListener("input", (e) => {
        textarea.innerHTML = e.target.value;
    });
}


// updating the text inside comment-input field
const commentInput = document.querySelector("comment-input");
let staticCommentBox = commentInput.shadowRoot.querySelector("#comment-text")
staticCommentBox.addEventListener("input", (e) => {
    staticCommentBox.innerHTML = e.target.value;
});

// listening an event on 'send' button which will append the user's comment
document.addEventListener("addComment", addYourComment);
function addYourComment(e) {
    const textArea = e.target.shadowRoot.querySelector("#comment-text");

    if (textArea.innerHTML === "") { // if there is nothing in the textarea's input field, then don't add comment 
        return;
    }

    const user = { // current user
        id: 4,
        content: "",
        createdAt: "Just now",
        score: 2,
        user: {
            image: {
                png: "./images/avatars/image-juliusomo.png",
                webp: "./images/avatars/image-juliusomo.webp"
            },
            username: "juliusomo"
        }
    }

    user.content = textArea.innerHTML;

    // add comment
    if (e.target.previousElementSibling.classList.contains("main")) {
        const lastCommentComponent = document.querySelector(".main comment-box:nth-last-child(1)")
        lastCommentComponent.after(new CommentBox(user, ""));
    } else {
        e.target.previousElementSibling.after(new CommentBox(user, "reply"))
        e.target.remove();
    }
}

// listen to the event which will delete you comment
document.addEventListener("deleteBtn-clicked", deleteComment);
function deleteComment(e) {
    const popUp = document.querySelector(".pop-up");
    const shadeBox = document.querySelector(".shade");
    const dltBtn = document.querySelector(".delete");
    const cancelBtn = document.querySelector(".cancel");
    shadeBox.classList.add("active");
    popUp.style.display = "block";

    dltBtn.addEventListener("click", () => {
        e.target.remove();
        shadeBox.classList.remove("active");
        popUp.style.display = "none";
    });

    cancelBtn.addEventListener("click", () => {
        shadeBox.classList.remove("active");
        popUp.style.display = "none";
    });
}







