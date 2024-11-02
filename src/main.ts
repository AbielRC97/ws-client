import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Client</h1>
    <input placeholder="Json Web Token" id="jwt" />
    <button id="connect">Connectar</button>
    <br/>
    <span id="server-status">offline</span>
    <ul id="clients-ul"></ul>
    <form id="formulario">
      <input placeholder="Mensaje" id="message" />
    </form>
    
    <ul id="message-ul"></ul>
  </div>
`

//connectToServer()

const jwt = document.querySelector<HTMLInputElement>('#jwt')!;
const connectar = document.querySelector<HTMLButtonElement>('#connect')!;


connectar.addEventListener('click', () => {
  if(jwt.value.trim().length <= 0) return alert('Ingrese JWT');
  connectToServer(jwt.value.trim());
})