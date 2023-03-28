import * as crypto from "crypto";
import './env.js'

const password = process.env.ENCRYPTION_PASSWORD;
const salt = process.env.ENCRYPTION_SALT;

function createKeyFromPassword(password, salt) {
    const keyLength = 32
    const iterations = 100000
    return crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha512')
}

const key = createKeyFromPassword(password, salt)

export function encrypt(plaintext) {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
    let encrypted = cipher.encrypt(plaintext, 'utf8', 'base64')
    encrypted += cipher.final('base64')

    const authTag = cipher.getAuthTag()

    return Buffer.concat([iv, authTag, Buffer.from(encrypted, 'base64')]).toString('base64')
}

export function decrypt(ciphertext) {
    const data = Buffer.from(ciphertext, 'base64')
    const iv = data.slice(0, 16)
    const authTag = data.slice(16, 32)
    const encrypted = data.slice(32);

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
    decipher.setAuthTag(authTag)

    let decrypted = decipher.update(encrypted, 'binary', 'utf8');
    decrypted += decipher.final('utf8')

    return decrypted
}