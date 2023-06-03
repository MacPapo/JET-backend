import argon2 from 'argon2';

export class HashHandler {
    
    static encrypt = async (pwd: string): Promise<string> => {
        return await argon2.hash(pwd, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            hashLength: 50,
        });
    };

    static verify = async (enc_pwd: string, user_pwd: string) => {
        return await argon2.verify(enc_pwd, user_pwd);
    };
}
