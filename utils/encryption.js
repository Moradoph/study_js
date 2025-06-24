import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

/**
 * @param {String} password 
 */
function encrypt(password) {
    return bcrypt.hashSync(password);
}

export default encrypt;