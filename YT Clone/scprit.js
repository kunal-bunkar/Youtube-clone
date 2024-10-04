const menuIcon = document.querySelector(".menu");
const hider = document.querySelector(".side_bar")
const expand = document.querySelector(".content")
// const videoSize = document.querySelectorAll(".v_img") 
// const buttons= document.querySelector(".discription")
menuIcon.onclick=function(){
    console.log("clicked");
    hider.classList.toggle("side_hider")
    expand.classList.toggle("expand_container")
    buttons.classList.toggle("change_button")
    // videoSize.classList.toggle("video_resize")
}


const commentInput = document.getElementById("commentInput");
const commentsContainer = document.getElementById("commentsContainer");
const countComment =document.getElementById("countComment")

let count =3

// Function to add a comment
function addComment(){
    const commentText=commentInput.value.trim()
    if(commentText){
        const newComment =document.createElement('div')
        newComment.classList.add("prv_comments")
        newComment.innerHTML= `<img class="imgs" src="./images/userPic.jpg" alt="" width="30px">
                        <div class="comments">
                            <h5>
                                <p>@kunal_bunkar</p>
                            </h5>
                            <div class="add">
                                <p>${commentText}</p>
                            </div>
                            <div class="clike_dislike">
                                <div class="like">
                                    <img src="./images/like.png" alt="" width="23px">
                                </div>
                                <div class="dislike">
                                    <img src="./images/dislike.webp" alt="" width="20px">
                                </div>
                            </div>
                        </div>`
        commentsContainer.appendChild(newComment)
        commentInput.value='' 
        
        count++
        countComment.innerHTML=`${count} Comments`
    }
}

// Event listener for Enter key press
commentInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addComment();
    }
});


const readMoreLink = document.getElementById("readMoreLink");
const extraText = document.querySelector(".extra-text");

readMoreLink.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default link behavior
    if (extraText.style.display === "none" || extraText.style.display === "") {
        extraText.style.display = "inline"; // Show the extra text
        readMoreLink.textContent = "Read less"; // Change link text
    } else {
        extraText.style.display = "none"; // Hide the extra text
        readMoreLink.textContent = "Read more"; // Reset link text
    }
});


const SubscribeButton = document.querySelector("button")
button=true;
SubscribeButton.addEventListener('click',() =>{
    if(button){
        SubscribeButton.style.backgroundColor='rgb(222, 210, 210)'
        SubscribeButton.style.color='black'
        SubscribeButton.innerText="UnSubscribe"
        button=false
    }
   else{
    SubscribeButton.style.backgroundColor='#ce0303'
    SubscribeButton.style.color='white'
    SubscribeButton.innerText="Subscribe"
    button=true
   }
})


