import express from "express";
import {registerCustomer, registerAgent, registerInvestor, loginCustomer, loginAgent, loginInvestor, forgetPassword} from "../controllers/auth.controller.js"
import { sendEmail } from '../controllers/auth.controller.js'

const router = express.Router();



/** HTTP Reqeust */

router.post('/forget-pass/sendemail', sendEmail);
router.post('/forget-pass', forgetPassword);
router.post("/register-customer", registerCustomer);
router.post("/register-agent", registerAgent);
router.post("/register-investor", registerInvestor);
router.post("/login-agent", loginAgent);
router.post("/login-customer", loginCustomer);
router.post("/login-investor", loginInvestor);

export default router;

