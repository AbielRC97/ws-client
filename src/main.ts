import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>  Websocket - client</h1>
    <span id="server-status">offline</span>
    <ul id="clients-ul"></ul>
    <form id="formulario">
      <input placeholder="Mensaje" id="message" />
    </form>
  </div>
`

connectToServer()