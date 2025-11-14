import * as Crypto from 'expo-crypto';

// Generate v4-like UUID using secure random bytes
export const uuidv4 = (): string => {
  const randomBytes = Crypto.getRandomBytes(16); // Uint8Array
  randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40; // Version 4
  randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80; // Variant 1
  return Array.from(randomBytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
};