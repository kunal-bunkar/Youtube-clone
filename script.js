const chat = document.querySelector(".chat");
const msgInput = document.querySelector(".msg-input");
const sendMsg = document.querySelector("#send-msg");
const fileInput = document.querySelector("#file-input");

//  Access API
const API_KEY = `AIzaSyBvKM9QrlScHa4EXGGHQV2yRJ62LWQU2kE`
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`

const userData = {
    message: null,
    file: {
        data: null,
        mime_type: null
    }

}

const chatHistory = [];
const botResponse = async (botMassaging) => {
    // console.log(botMassaging);

    const messageElement = botMassaging.querySelector(".msg")
    chatHistory.push({
        role: "user",
        parts: [{ text: userData.message }, ...(userData.file.data ? [{ inline_data: userData.file }] : [])]
    });

    const request = {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: chatHistory
        })
    }

    try {
        const response = await fetch(API_URL, request);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error.message);
        const apiData = data.candidates[0].content.parts[0].text.replace(/[*/`#]/g, "").trim();
        console.log(messageElement);
        messageElement.innerText = apiData;

        chatHistory.push({
            role: "model",
            parts: [{ text: userData.message }, ...(userData.file.data ? [{ inline_data: userData.file }] : [])]
        });
        // console.log(apiData);

    }
    catch (error) {
        console.log(error);
        messageElement.innerText = error.message;
        messageElement.style.color = "red";
        // messageElement.style.background = "red"
    }
    finally {
        userData.file = {};
        botMassaging.classList.remove("resulting");
        chat.scrollTo({ top: chat.scrollHeight, behavior: "smooth" });
    }

}

// Fit msg in container
const addMsg = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("text", ...classes);
    div.innerHTML = content;
    return div;
}

const msgCreate = (e) => {
    e.preventDefault();

    userData.message = msgInput.value.trim();
    msgInput.value = "";
    // Make container for input
    const msgContent = `<div class="msg">  </div>
                        ${userData.file.data ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class ="attachment"/>` : ""}`;
    const Msg = addMsg(msgContent, "user-msg");
    Msg.querySelector(".msg").textContent = userData.message;
    chat.appendChild(Msg);
    chat.scrollTo({ top: chat.scrollHeight, behavior: "smooth" });
    // botResponse(Msg);
    // Bot is in processing.....
    setTimeout(() => {
        const msgContent = `<div class="bot-msg-log
                "><span class="material-symbols-outlined">
                    robot_2
                </span></div><div class="resulting msg">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>`
        const botMassaging = addMsg(msgContent, "bot-msg", "resulting");
        chat.appendChild(botMassaging);
        chat.scrollTo({ top: chat.scrollHeight, behavior: "smooth" });
        botResponse(botMassaging);

    }, 700)
}

msgInput.addEventListener("keydown", (e) => {
    const userMsg = e.target.value.trim();
    // GET INPUT FROM USER
    if (e.key === "Enter" && userMsg) {
        msgCreate(e);
    }
})

sendMsg.addEventListener("click", (e) => msgCreate(e))

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    fileInput.value = "";
    if (!file) return;
    const reader = new FileReader();

    reader.onload = (e) => {
        const baseString = e.target.result.split(",")[1];
        userData.file = {
            data: baseString,
            mime_type: file.type
        }

    }
    reader.readAsDataURL(file);
})

// Apply emoji 
const picker = new EmojiMart.Picker({
    theme: "light",
    skinTonePosition: "none",
    previewPosition: "none",
    onEmojiSelect: (emoji) => {
        const { selectionStart: start, selectionEnd: end } = msgInput;
        msgInput.setRangeText(emoji.native, start, end, "end");
        msgInput.focus();
    },
    onClickOutside: (e) => {
        if (e.target.id === "emoji-picker") {
            document.body.classList.toggle("showEmoji");
        }
        else {
            document.body.classList.remove("showEmoji");

        }
    }
});

document.querySelector(".chat_form").appendChild(picker);

document.querySelector("#file-uplode").addEventListener("click", () => fileInput.click());