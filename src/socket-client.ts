import { Manager, Socket } from "socket.io-client"
let socket: Socket;
export const connectToServer = (jwt: string) => {
    const maneger = new Manager(`http://localhost:3000/socket.io/socket.io.js`, {
        extraHeaders: {
            authentication: jwt
        }
    });
    socket?.removeAllListeners();
    socket = maneger.socket('/');
    addListeners();
}

const addListeners = () => {
    const serverStatus = document.querySelector('#server-status')!;
    const clientslist = document.querySelector('#clients-ul')!;
    const formulario = document.querySelector<HTMLFormElement>('#formulario')!;
    const message = document.querySelector<HTMLInputElement>('#message')!;
    const messageList = document.querySelector<HTMLUListElement>('#message-ul')!;
    socket.on('connect', () => {
        serverStatus.innerHTML = "Online";
    });
    socket.on('disconnect', () => {
        serverStatus.innerHTML = "Offline";
    });
    socket.on('clients-updated', (clients: string[]) => {
        let clientsHTML = '';
        clients.forEach(id => {
            clientsHTML += `
                <li>${id}</li>
            `;
        });
        clientslist.innerHTML = clientsHTML;
    });

    socket.on('request-message', (payload: { id: string, fullName: string, message: string }) => {
        const newMessage =  `
            <li>
                <strong>${payload.fullName}</strong>
                <span>${payload.message}</span>
            </li>
        `;
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messageList.append(li);
    });

    formulario.addEventListener('submit', (event) => {
        event.preventDefault();
        if (message.value.trim().length <= 0) return;

        socket.emit('send-message', {
            id: 'YO!',
            message: message.value
        });

        message.value = "";
    })
}