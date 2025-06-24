import AccountService from '../services/accountService.js';

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
    async register(req, res) {
        try {
            console.log(`${req.method} ${req.originalUrl}`);

            const { name, username, password } = req.body;
            const user = await this.service.createNewUser(name, username, password);
            return res.status(201).json(user);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}

export default AccountController;