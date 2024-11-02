import { Manager, Socket } from "socket.io-client"

export const connectToServer = () => {
    const maneger = new Manager(`http://localhost:3000/socket.io/socket.io.js`);
    const socket = maneger.socket('/');
    addListeners(socket);
}

const addListeners = (client: Socket) => {
    const serverStatus = document.querySelector('#server-status')!;
    const clientslist = document.querySelector('#clients-ul')!;
    client.on('connect', ()=> {
        serverStatus.innerHTML = "Online";
    });
    client.on('disconnect', ()=> {
        serverStatus.innerHTML = "Offline";
    });
    client.on('clients-updated', (clients: string[]) => {
        let clientsHTML = '';
        clients.forEach(id => {
            clientsHTML += `
                <li>${id}</li>
            `;
        });
        clientslist.innerHTML = clientsHTML;
    });
}