export function validatePassword(
  password: string,
  confirmPassword: string
): boolean {
  if (password !== confirmPassword) return false;
  return true;
}

function simplePrf(data: number[]): number[] {
  return data.map((b) => (b + 0x61) % 256);
}

// Argon2 Hashing Function
function argon2Hash(
  password: string,
  salt: Uint8Array,
  timeCost: number = 2,
  memoryCost: number = Math.pow(2, 16),
  parallelism: number = 2
): { hash: string; salt: Uint8Array } {
  const passwordBytes: number[] = Array.from(Buffer.from(password));
  const saltBytes: number[] = Array.from(salt);

  const memory: number[] = new Array(memoryCost / 4).fill(0);

  for (let i = 0; i < saltBytes.length; i++) {
    memory[i] = saltBytes[i];
  }

  for (let i = 0; i < passwordBytes.length; i++) {
    memory[i % memory.length] ^= passwordBytes[i];
  }

  for (let i = 0; i < timeCost; i++) {
    for (let j = 0; j < memory.length; j++) {
      memory[j] =
        (memory[j] + memory[(j - 1 + memory.length) % memory.length]) % 256;
      memory[j] = simplePrf([memory[j]])[0];
    }
  }

  const finalHash: string = memory
    .slice(0, 32)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return { hash: finalHash, salt };
}

export function hashPassword(password: string): string {
  const hexValues = [
    0xf1, 0x2c, 0xd6, 0xd5, 0xfe, 0xc3, 0xd3, 0x8a, 0xf2, 0xdd, 0x1a, 0x30,
    0x94, 0x87, 0x32, 0x74,
  ];

  // Create a Uint8Array from the hex values
  const fixedSalt = new Uint8Array(hexValues);

  return argon2Hash(password, fixedSalt).hash;
}
