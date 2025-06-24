import express from "express";
import AccountController from "../controllers/accountController.js";

const accountRoutes = express.Router();
const controller = new AccountController();

accountRoutes.get('/all', controller.getAllUsers);
accountRoutes.post('/register', controller.register);

export default accountRoutes;