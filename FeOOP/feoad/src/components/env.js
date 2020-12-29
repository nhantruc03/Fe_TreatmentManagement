var AUTH= ''
try {
    var login = localStorage.getItem('login');
    var obj = JSON.parse(login);
    
    AUTH = obj.token;
} catch (e) {
    console.log(e);
}


export { AUTH }

const WebSocketServer = 'ws://localhost:3001'
// const WebSocketServer = 'wss://api-benhvien.herokuapp.com'
export {WebSocketServer}

// const BackEndURL ="https://api-benhvien.herokuapp.com"
const BackEndURL ="http://localhost:3001"
// const BackEndURL ="http://backend:3001"
export {BackEndURL}