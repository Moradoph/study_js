import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

class Encryption {
    /**
     * @param {String} plainText 
     */
    encrypt(plainText) {
        return bcrypt.hashSync(plainText);
    }

    /**
     * 
     * @param {String} plainText 
     * @param {String} hashed 
     * @returns 
     */
    compareHashed(plainText, hashed) {
        return bcrypt.compare(plainText, hashed);
    }
}

export default Encryption;