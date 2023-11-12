
const express = require('express');
const http = require('http');
const forge = require('node-forge');
const crypto = require('crypto');
const socketIo = require('socket.io');


const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

// SHA256 Signing
io.on('connection', (socket) => {
  socket.on('sign and verify SHA256', (message, callback) => {
    const keys = forge.pki.rsa.generateKeyPair(2048);
    const privateKeyPem = forge.pki.privateKeyToPem(keys.privateKey);
    const sign = crypto.createSign('SHA256');
    sign.update(message);
    const signature = sign.sign(privateKeyPem, 'hex');
    const publicKeyPem = forge.pki.publicKeyToPem(keys.publicKey);
    const verify = crypto.createVerify('SHA256');
    verify.update(message);
    const isVerified = verify.verify(publicKeyPem, signature, 'hex');
    callback(isVerified, privateKeyPem, signature, publicKeyPem);
  });

});

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get('/signAndVerify.js', (req, res) => {
  console.log("Here!");
  res.sendFile(`${__dirname}/signAndVerify.js`);
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
