import Account from "../models/Account.js";
import Encryption from "../utils/encryption.js"

class AccountService {
    constructor() {
        this.db = Account;
    }

    /**
     * get all users
     * @returns {Promise<Account[]>} users
     */
    async getAll() {
        try {        
            const users = await this.db.find();
            return users;
        } catch (err) {
            console.log(`[ACCOUNT SERVICE] ` + err.message);
            return [];
        }
    }

    /**
     * get one user by his ID
     * @param {_id} userId 
     * @returns {Account} user
     */
    async getUser(userId) {
        try {
            const user = await this.db.findOne({_id: userId});
            if (!user) {
                return { success: false, message: `User with id: ${userId} not found!`};
            }
            return { success: true, object: user };
        } catch (err) {
            return { success: false, message: err.message };
        }
    }

    /**
     * create new user via registration
     * @param {String} name 
     * @param {String} username 
     * @param {String} password 
     */
    async createNewUser (name, username, password) {
        const isExist = await this.db.findOne({
            $or: [
                { name: name },
                { username: username },
            ]
        });
        if (isExist) {
            console.log('FAILED: user already exists!');
            return;
        } else {
            const user = new Account({
                name,
                username,
                password: Encryption.encrypt(password)
            });
            console.log(user);
            await user.save();
            console.log('CREATED: user was saved in database!');
        }
        return;
    }

    /**
     * add friend for user
     * @param {String} username1 
     * @param {String} username2 
     */
    async addFriend (username1, username2) {
        try {
            if ( !username1 || !username2 ) {
                throw new Error('ERROR: Both usernames are required!');
            }

            const user1 = await this.db.findOne({ username: username1 });
            const user2 = await this.db.findOne({ username: username2 });

            if (!user1 || !user2) {
                throw new Error('ERROR: Both or one user not found!')
            }
            // add friend logic
            if (user1.friends.includes(user2._id)) {
                throw new Error("FAILED: Both are already friends!")
            }
            user1.friends.push(user2._id); 
            user2.friends.push(user1._id);

            await user1.save();
            console.log(`UPDATE: ${user1.username}'s friends list updated!`);
    
            await user2.save();
            console.log(`UPDATE: ${user2.username}'s friends list updated!`);

            return;
        } catch (err) {
            console.log(err.message);
            return;
        }
    }

    /**
     * edit user data
     * @param {Object} newUser 
     * @returns 
     */
    async changeUserInfo(newUser) {
        try {
            const user = await this.db.findOne({ _id: newUser._id });
            if (!user) {
                return { success: false, message: `User not found`};
            }

            user.name = newUser.name;
            user.username = newUser.username;
            await user.save();

            return { success: true, object: user };
        } catch (err) {
            return { success: false, message: err.message };
        }
    }

    /**
     * change user's password
     * @param {String} newPassword 
     * @param {String} userId 
     * @returns 
     */
    async changeUserPassword(newPassword, userId) {
        try {
            const user = await this.db.findById(userId);
            if (!user) {
                return { success: false, message: `User not found`};
            }

            user.password = await Encryption.encrypt(newPassword);
            await user.save();

            return { success: true, object: user };
        } catch (err) {
            return { success: false, message: err.message };
        }
    }
}

export default AccountService;