const jose = require('jose');
const fs = require("fs");

const currentWorkingDirectory = process.cwd();
const privateKey = fs.readFileSync(currentWorkingDirectory+"/private.key").toString();;
const publicKey = fs.readFileSync(currentWorkingDirectory+"/public.key").toString();;

async function generateToken(payload){
    const jwt = new jose.SignJWT(payload);
    const private_key = await jose.importPKCS8(privateKey);
    
    jwt.setExpirationTime('24h');
    jwt.setProtectedHeader({ alg:"RS512" });
    
    let access_token = await jwt.sign(private_key);
    
    return access_token; 
}

async function verifyToken(token){
    const public_key = await jose.importSPKI(publicKey);
    let is_valid = await jose.jwtVerify(token,public_key);
    return is_valid;
}

module.exports = { generateToken, verifyToken };