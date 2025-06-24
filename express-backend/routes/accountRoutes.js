import express from "express";
import AccountController from "../controllers/accountController.js";

const accountRoutes = express.Router();
const controller = new AccountController();

accountRoutes.get('/user/:i', controller.getUser);
accountRoutes.get('/all', controller.getAllUsers);
accountRoutes.post('/register', controller.register);
accountRoutes.post('/edit', controller.updateUser);
accountRoutes.post('/change-password', controller.changePassword);

export default accountRoutes;