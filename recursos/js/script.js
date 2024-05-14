
// Elementos Login

    const loginGeral = document.querySelector(".login-area")
    const loginArea = document.querySelector(".login-space");
    const loginForm = loginArea.querySelector(".login-form");

    const loginInpImage = loginArea.querySelector(".log-inp-img");
    const loginInpName = loginArea.querySelector(".log-inp-name");
    const loginInpColor = loginArea.querySelector(".log-inp-color");

// Login Config.

    const user = {
        id: "",
        image: "",
        name: "",
        color: ""
    }

    let websocket;

    const createMessageSelfElement = (content) => {
        const div = document.createElement("div");

        div.classList.add("message-self");
        div.innerHTML = content;

        return div;
    }

    const createMessageOtherElement = (content, name, imageURL) => {
        // Criar os elementos necessários
        const div = document.createElement("div");
        const innerDiv = document.createElement('div');
        const img = document.createElement('img');
        const span = document.createElement('span');
    
        // Adicionar classes aos elementos
        div.classList.add('message-other');
        span.classList.add('message-user');
    
        // Configurar atributos e conteúdo dos elementos
        img.alt = 'Foto de Perfil de um Usuário';
        img.src = imageURL;
        span.textContent = name;
        span.style.color = `${loginInpColor.value}`;
        innerDiv.appendChild(img);
        innerDiv.appendChild(span);
        div.appendChild(innerDiv);
        div.innerHTML += content;
    
        return div;
    }

    const scrollScreen = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        })
    }

    const processMessage = ({ data }) => {
        const {
            userId,
            userImg,
            userName,
            userColor,
            content
        } = JSON.parse(data);

        const message = userId == user.id ? createMessageSelfElement(content) : createMessageOtherElement(content, userName, userColor, userImg);

        chatMessageArea.appendChild(message);

        scrollScreen();
    }

    const handleLogin = (event) => {
        event.preventDefault();

        user.id = crypto.randomUUID();
        user.image = loginInpImage.value
        user.name = loginInpName.value;
        user.color = loginInpColor.value;

        loginGeral.style.display = "none";
        chatArea.style.display = "flex";

        websocket = new WebSocket("ws://localhost:8080");
        websocket.onmessage = processMessage;

        console.log(user);
    }

    loginForm.addEventListener("submit", handleLogin);

// Elmentos Chat

    const chatArea = document.querySelector(".chat-area");
    const chatForm = chatArea.querySelector(".chat-form");
    const chatInput = chatArea.querySelector(".chat-input");

    const chatMessageArea = document.querySelector(".chat-messages");

// Chat Config.

    const sendMessage = (event) => {
        event.preventDefault();

        const message = {
            userId: user.id,
            userImg: user.image,
            userName: user.name,
            userColor: user.color,
            content: chatInput.value
        }

        websocket.send(JSON.stringify(message));

        chatInput.value = "";
    }

    chatForm.addEventListener("submit", sendMessage);