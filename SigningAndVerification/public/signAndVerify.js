//import { utils, getPublicKey, sign, verify } from 'https://cdn.skypack.dev/@noble/ed25519';
import * as ed from "https://unpkg.com/@noble/ed25519";

function addTextAsync(element, text, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            element.textContent = text;
            resolve();
        }, delay);
    });
}

async function signAndVerify() {
    const messageVal = document.getElementById('message2').value;

    const privKey = ed.utils.randomPrivateKey();
    const message = new TextEncoder().encode(messageVal);
    const pubKey = await ed.getPublicKeyAsync(privKey);

    const signature = await ed.signAsync(message, privKey);
    const isVerified = await ed.verifyAsync(signature, message, pubKey);

    const test = ed.etc.bytesToHex(privKey);

    console.log(typeof (test));
    document.getElementById('result2').textContent = "Signature is verified: " + isVerified;
    console.log("Private Key: " + ed.etc.bytesToHex(privKey));
    console.log("Signature: " + ed.etc.bytesToHex(signature));
    console.log("Public Key: " + ed.etc.bytesToHex(pubKey));
    // document.getElementById('privateKey2').innerText = " Private Key : " + await ed.etc.bytesToHex(test).toString();
    // document.getElementById('signature2').textContent = " Signature : " + ed.etc.bytesToHex(signature);
    // document.getElementById('publicKey2').textContent = " Public Key : " + ed.etc.bytesToHex(pubKey);
}

window.signAndVerify = signAndVerify;
