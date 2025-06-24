import AccountService from '../services/accountService.js';
import getUserDTO from '../dtos/getUser.js';

class AccountController {
    constructor() {
        this.service = new AccountService();

        this.register = this.register.bind(this); // bind the method manually
    }

    // Arrow function field
    getAllUsers = async (req, res) => {
        try {
            console.log(`${req.method} ${req.originalUrl}`);

            const result = await this.service.getAll();
            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    // Class method declaration, the method will __not__ be binded automatically.
    // async register(req, res) {
    //     try {
    //         console.log(`${req.method} ${req.originalUrl}`);

    //         const { name, username, password } = req.body;
    //         const user = await this.service.createNewUser(name, username, password);
    //         return res.status(201).json(user);
    //     } catch (err) {
    //         return res.status(500).json({ message: err.message });
    //     }
    // }

    register = async(req, res) => {
        try {
            console.log(`${req.method} ${req.originalUrl}`);

            const { name, username, password } = req.body;
            const user = await this.service.createNewUser(name, username, password);
            return res.status(201).json(user);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    getUser = async(req, res) => {
        try {
            console.log(`${req.method} ${req.originalUrl}`);

            const { i } = req.params;
            const result = await this.service.getUser(i);
            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }
            return res.status(200).json(getUserDTO(result.object));
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    updateUser = async(req, res) => {
        try {
            console.log(`${req.method} ${req.originalUrl}`);

            const { name, username } = req.body;
            const newUser = {
                name: name,
                username: username,
            }
            const result = await this.service.changeUserInfo(newUser);
            if (!result) {
                return res.status(404).json({ message: result.message });
            }
            return res.status(200).json(getUserDTO(result.object));
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    changePassword = async(req, res) => {
        try {
            console.log(`${req.method} ${req.originalUrl}`);
            const { newPassword, userId } = req.body;
            const result = await this.service.changeUserPassword(newPassword, userId);
            if (!result) {
                return res.status(404).json({ message: result.message });
            }
            return res.status(200).json(getUserDTO(result.object));
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}

export default AccountController;