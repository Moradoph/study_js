import Account from "../models/Account.js";
import encrypt from "../utils/encryption.js"

class AccountService {
    constructor() {
        this.db = Account;
    }
    /**
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
     * 
     * @param {_id} userId 
     * @returns {Account} user
     */
    async getUser(userId) {
        try {
            const user = await this.db.findOne({_id: userId});
            return user;
        } catch (err) {
            return [];
        }
    }
    /**
     * 
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
                password: encrypt(password)
            });
            console.log(user);
            await user.save();
            console.log('CREATED: user was saved in database!');
        }
        return;
    }

    /**
     * 
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
            user1.friends.push(user2); 
            user2.friends.push(user1);

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
}

export default AccountService;