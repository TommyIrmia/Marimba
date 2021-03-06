import io from 'socket.io-client'

const baseUrl = (process.env.NODE_ENV === 'production') ? 'https://marimbamusic.herokuapp.com/' : '//localhost:3030'
export const socketService = createSocketService()

socketService.setup()

function createSocketService() {
  var socket = null;
  const socketService = {
    setup() {
      socket = io(baseUrl)
    },
    on(eventName, cb) {
      if (!socket) this.setup()
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      if (!socket) this.setup()
      socket.emit(eventName, data)
    },
    terminate() {
      socket = null
    }
  }
  return socketService
}



