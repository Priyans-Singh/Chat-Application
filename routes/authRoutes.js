import express from "express";
import {login, signup, logout} from "../controllers/authController.js"
const routes = express.Router();

routes.post("/login",login);

routes.post('/signup', signup);

routes.post('/logout', logout);

export default routes;