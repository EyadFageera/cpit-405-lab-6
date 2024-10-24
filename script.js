let likes = 20;
let dislikes = 5;
let comments = [];

const likesbtn = document.getElementById("likeBtn");
const dislikesbtn = document.getElementById("disBtn");
const commentbox = document.getElementById("commentInput");
const commentslst = document.getElementById("CommentLst");
const submit = document.getElementById("submit");
const clear = document.getElementById("clear");


likesbtn.innerText = "👍 " + likes;
dislikesbtn.innerText = "👎 " + dislikes;

window.onload = () => {

    const savedLikes = getCookie("likes");
    const savedDislikes = getCookie("dislikes");
    const savedComments = getCookie("comments");

    if (savedLikes) likes = parseInt(savedLikes);
    if (savedDislikes) dislikes = parseInt(savedDislikes);
    if (savedComments) comments = JSON.parse(savedComments);


    likesbtn.innerText = "👍 " + likes;
    dislikesbtn.innerText = "👎 " + dislikes;
    updateComments();


    if (document.cookie.indexOf("voted=true") > -1) {
        likesbtn.disabled = true;
        dislikesbtn.disabled = true;
        submit.disabled = true;
    }
};


likesbtn.addEventListener("click", () => {
    likes++;
    likesbtn.innerText = "👍 " + likes;
    setCookie();
});


dislikesbtn.addEventListener("click", () => {
    dislikes++;
    dislikesbtn.innerText = "👎 " + dislikes;
    setCookie();
});


submit.addEventListener("click", () => {
    const comment = commentbox.value.trim();
    if (comment) {
        comments.push(comment);
        updateComments();
        setCookie();
        commentbox.value = ""; 
    }
});

clear.addEventListener("click", () => {
    commentbox.value = "";
});


function updateComments() {
    commentslst.innerHTML = "";
    comments.forEach(comment => {
        const commentElement = document.createElement("p");
        commentElement.innerText = comment;
        commentslst.appendChild(commentElement);
    });
}

function setCookie() {
    const expireOn = new Date(Date.now() + 1 * 60 * 1000); 
    document.cookie = "likes=" + likes + "; path=/; expires=" + expireOn.toUTCString();
    document.cookie = "dislikes=" + dislikes + "; path=/; expires=" + expireOn.toUTCString();
    document.cookie = "comments=" + JSON.stringify(comments) + "; path=/; expires=" + expireOn.toUTCString();
    document.cookie = "voted=true; path=/; expires=" + expireOn.toUTCString(); // Set voted cookie
}

function getCookie(name) {
    const cookieArr = document.cookie.split("; ");
    for (let i = 0; i < cookieArr.length; i++) {
        const cookiePair = cookieArr[i].split("=");
        if (name === cookiePair[0]) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}
