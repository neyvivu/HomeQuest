import Customer from "../db/customer.model.js";
import Agent from "../db/agent.model.js";
import Investor from "../db/investor.model.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken"; //jwt
import "dotenv/config";
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';


function isPasswordStrong(password) {     
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}

//Register Investor
export const registerInvestor = async (req, res, next) => {
  const { username, email, password, phoneNo } = req.body;
  if (!/^\d{8}$/.test(phoneNo)) {
    return next(
      errorHandler(401, { type: "phoneNo", content: "Phone number must contain exactly 8 digits." })
    );
  }
  const strongpass = isPasswordStrong(password);
  if (username.length < 6) {
    return next(errorHandler(401, { type: "username", content: "Username must consist of at least 6 characters." }));
  }

  if (password.length < 10) {
    return next(
      errorHandler(
        401,
        { type: "password", content: "Password length must be greater than 10." }
      )
    );
  }
  
  if (!strongpass) {
    return next(
      errorHandler(
        401,
        { type: "password", content: "Password must contain at least 1 upper case letter, 1 special symbol, and a normal case letter." }
      )
    );
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newInvestor = new Investor ({
    username,
    email,
    password: hashedPassword,
    phoneNo,
  });
  try {
    await newInvestor.save();
    console.log(`${newInvestor.username} 's account is created successfully`);
    res
      .status(201)
      .json(`${newInvestor.username} 's account is created successfully`);
  } catch (error) {
    console.log(error.keyValue);
    const message = error.keyValue || {};
    if (message.username) {
      return next(
        errorHandler(
          409,
          { type: "username", content: "Username already existed in our database." }
        )
      );
    } else if (message.email) {
      return next(
        errorHandler(
          409,
          { type: "email", content: "Email address already existed in our database." }
        )
      );
    } else if (message.phoneNo) {
      return next(
        errorHandler(
          409,
          { type: "phoneNo", content: "Phone number already existed in our database." }
        )
      );
    }
  }
};

//Register customer
export const registerCustomer = async (req, res, next) => {
  const { username, email, password, phoneNo } = req.body;
  if (!/^\d{8}$/.test(phoneNo)) {
    return next(
      errorHandler(401, { type: "phoneNo", content: "Phone number must contain exactly 8 digits." })
    );
  }
  const strongpass = isPasswordStrong(password);
  if (username.length < 6)
  {
    return next(errorHandler(401, {type:"username", content:"Username must consists at least 6 characters."}))
  }

  if (password.length < 10)
  {
    return next(
      errorHandler(
        401,
        {type:"password", content:"Password length must be greater than 10."}
        
      ))
  }
  if (!strongpass)
  {
    return next(
      errorHandler(
        401,
        {type:"password", content:"Password must contain at least 1 upper Case letter, 1 special symbol and normal case letter"}
      ))
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newCustomer = new Customer({
    username,
    email,
    password: hashedPassword,
    phoneNo,
  });
  try {
    await newCustomer.save();
    console.log(`${newCustomer.username} 's account is created sucessfully`);
    res
      .status(201)
      .json(`${newCustomer.username} 's account is created sucessfully`);
  } catch (error) {
    console.log(error.keyValue);
    const message = error.keyValue || {};
    if (message.username)
    {
      return next(
        errorHandler(
          409,
          {type:"username",content:"Username already existed in our database."}
        ))
    }
    else if (message.email)
    {
      return next(
        errorHandler(
          409,
          {type:"email",content: "Email address already existed in our database."}
        ))
    }
    else if (message.phoneNo)
    {
      return next(
        errorHandler(
          409,
          {type:"phoneNo",content: "Phone number already existed in our database."}
        ))
    }
  

  }
};

//Register agent
export const registerAgent = async (req, res, next) => {
  const { username, email, password, phoneNo,agentname, agentregnum } = req.body;
  if (!/^\d{8}$/.test(phoneNo)) {
    return next(
      errorHandler(401, { type: "phoneNo", content: "Phone number must contain exactly 8 digits." })
    );
  }
  const strongpass = isPasswordStrong(password);
  if (password.length < 10)
  {
    return next(
      errorHandler(
        401,
        {type:"password", content:"Password length must be greater than 10."}
        
      ))
  }
  if (!strongpass)
  {
    return next(
      errorHandler(
        401,
        {type:"password", content:"Password must contain at least 1 upper Case letter, 1 special symbol and normal case letter"}
      ))
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newAgent = new Agent({
    username,
    email,
    password: hashedPassword,
    phoneNo,
    agentname,
    agentregnum,
  });
  try {
    await newAgent.save();
    console.log(`${newAgent.username} 's account is created sucessfully`);
    res
      .status(201)
      .json(`${newAgent.username} 's account is created sucessfully`);
  } catch (error) {
    console.log(error);
    console.log(error.keyValue);
    const message = error.keyValue
    if (error.keyValue.username)
    {
      return next(
        errorHandler(
          409,
          {type:"username", content:"Username already existed in our database."}
        ))
    }
    else if (error.keyValue.email)
    {
      return next(
        errorHandler(
          409,
         {type:"email",content: "Email address already existed in our database."}
        ))
    }
    else if (error.keyValue.phoneNo)
    {
      return next(
        errorHandler(
          409,
          {type:"phoneNo",content: "Phone number already existed in our database."}
        ))
    }
    else if (error.keyValue.agentregnum)
    {
      return next(
        errorHandler(
          409,
          {type:"license", content:"The license no. has already been registered by another agent."}
        ))

    }
  

  }
};


//Customer Login
export const loginCustomer = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const validCustomer = await Customer.findOne({ username });
    if (!validCustomer) {
      return next(errorHandler(404, "Invalid username or pasword"));
    }
    //Customer do exist, now check the acccount lock status
    if (validCustomer.accountLocked) {
      const curTime = new Date();
      const lockDuration = 5 * 60 * 1000;
      const unlockTime = new Date(
        validCustomer.lockedAt.getTime() + lockDuration
      );

      // Check if it's time to unlock the account
      if (curTime >= unlockTime) {
        // Reset login attempt counter and then unlock the account
        validCustomer.loginAttempts = 0;
        validCustomer.accountLocked = false;
        //Save info back to database
        await validCustomer.save();
      } else {
        const remainingTime = Math.ceil((unlockTime - curTime) / 1000); // Remaining time in seconds
        return next(
          errorHandler(
            403,
            `Account is locked. Please try again in ${remainingTime} seconds`
          )
        );
      }
    }
    const validPassword = bcryptjs.compareSync(
      password,
      validCustomer.password
    );
    if (!validPassword) {
      validCustomer.loginAttempts += 1;
      if (validCustomer.loginAttempts >= 5) {
        validCustomer.accountLocked = true;
        validCustomer.lockedAt = new Date();
      }
      await validCustomer.save();
      return next(errorHandler(401, "Invalid username or password"));
    }
    const jwtToken = jwt.sign(
      { id: validCustomer._id },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );
    validCustomer.loginAttempts = 0;
    validCustomer.accountLocked = false;
    //Save info back to database
    await validCustomer.save();
    const {password: pass, ...rest} = validCustomer._doc;
    const token =jwtToken;
    res
      .status(200)
      .json({rest, token});
  } catch (error) {
    return next(error);
  }
};

//Agent Login   
export const loginAgent = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const validAgent = await Agent.findOne({ username });
    if (!validAgent) {
      return next(errorHandler(404, "Invalid username or pasword"));
    }
    //Agent do exist, now check the acccount lock status
    if (validAgent.accountLocked) {
      const curTime = new Date();
      const lockDuration = 5 * 60 * 1000;
      const unlockTime = new Date(validAgent.lockedAt.getTime() + lockDuration);

      // Check if it's time to unlock the account
      if (curTime >= unlockTime) {
        // Reset login attempt counter and then unlock the account
        validAgent.loginAttempts = 0;
        validAgent.accountLocked = false;
        //Save info back to database
        await validAgent.save();
      } else {
        const remainingTime = Math.ceil((unlockTime - curTime) / 1000); // Remaining time in seconds
        return next(
          errorHandler(
            403,
            `Account is locked. Please try again in ${remainingTime} seconds`
          )
        );
      }
    }
    const validPassword = bcryptjs.compareSync(password, validAgent.password);
    if (!validPassword) {
      validAgent.loginAttempts += 1;
      if (validAgent.loginAttempts >= 5) {
        validAgent.accountLocked = true;
        validAgent.lockedAt = new Date();
      }
      await validAgent.save();
      return next(errorHandler(401, "Invalid username or password"));
    }
    const jwtToken = jwt.sign({ id: validAgent._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const {password: pass, ...rest} = validAgent._doc;
    const token =jwtToken;
    res
      .status(200)
      .json({rest, token});
  } catch (error) {
    return next(error);
  }
};

//Investor Login
export const loginInvestor = async (req, res, next) => {
  const { username, password } = req.body;
  try { 
    const validInvestor = await Investor.findOne({ username });
    if (!validInvestor) {
      return next(errorHandler(404, "Invalid username or pasword"));
    }
    //Customer do exist, now check the acccount lock status
    if (validInvestor.accountLocked) {
      const curTime = new Date();
      const lockDuration = 5 * 60 * 1000;
      const unlockTime = new Date(
        validInvestor.lockedAt.getTime() + lockDuration
      );

      // Check if it's time to unlock the account
      if (curTime >= unlockTime) {
        // Reset login attempt counter and then unlock the account
        validCustomer.loginAttempts = 0;
        validCustomer.accountLocked = false;
        //Save info back to database
        await validInvestor.save();
      } else {
        const remainingTime = Math.ceil((unlockTime - curTime) / 1000); // Remaining time in seconds
        return next(
          errorHandler(
            403,
            `Account is locked. Please try again in ${remainingTime} seconds`
          )
        );
      }
    }
    const validPassword = bcryptjs.compareSync(
      password,
      validInvestor.password
    );
    if (!validPassword) {
      validInvestor.loginAttempts += 1;
      if (validInvestor.loginAttempts >= 5) {
        validInvestor.accountLocked = true;
        validInvestor.lockedAt = new Date();
      }
      await validInvestor.save();
      return next(errorHandler(401, "Invalid username or password"));
    }
    const jwtToken = jwt.sign(
      { id: validInvestor._id },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );
    validInvestor.loginAttempts = 0;
    validInvestor.accountLocked = false;
    //Save info back to database
    await validInvestor.save();
    const {password: pass, ...rest} = validInvestor._doc;
    const token =jwtToken;
    res
      .status(200)
      .json({rest, token});
  } catch (error) {
    return next(error);
  }
};

export const forgetPassword = async (req, res, next) => {

  const { email, userType } = req.body;
  let validUser;
  console.log(email);
  if (userType === "customer") {
    validUser = await Customer.findOne({ email });
  } else if (userType === "agent"){
    validUser = await Agent.findOne({ email });
  } else if (userType === "investor"){
    validUser = await Investor.findOne({ email });
  }

  if(!validUser){
    return next(
      errorHandler(
        401,
        {type:"email", content:"Email not found"}
      )
    );
  }
  if (validUser)
  {
    const jwtToken = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const token =jwtToken;
    res.status(200).json({message:"user found", email:validUser.email, userType:validUser.userType, token:token, id:validUser._id, username:validUser.username});
  }


};

export const sendEmail = async (req, res) => {
  console.log("Received email request:", req.body);
  const BASE_URL = 'http://localhost:5173';
    const { email ,userType, token,id, username} = req.body;
    let config = {
        service : 'gmail',
        auth : {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);
    transporter.verify((error, success) => {
      if (error) {
        console.log("Error connecting to email service:", error);
      } else {
        console.log("Email server is ready to take messages");
      }
    });

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "HomeQuest by SCEX Group 4",
            link : 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name : `${username}`,
            intro: "Here is your reset password link",
            table : {
                data : [
                    {
                        'Your reset link': `${BASE_URL}/reset-pass/${userType}/${id}/${token}`
                    }
                ]
            },
            outro: "Please remember to not share your password with anyone."
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from : process.env.EMAIL,
        to : email,
        subject: "HomeQuest Password reset",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        res.status(201).json({
            msg: "Email sent"
        })
    }).catch(error => {
        res.status(500).json({ error })
    })


};


export const resetPassword = async (req, res, next) => {
  const {password, passwordconfirm, username, userType} = req.body;
  const strongpass = isPasswordStrong(password);
  const {id, token} = req.params;
  if(password !== passwordconfirm){
    return next(
      errorHandler(
        401,
        {type:"passwordconfirm", content:"Password does not match"}
      )
    )
  }
  if (password.length < 10)
  {
    return next(
      errorHandler(
        401,
        {type:"password", content:"Password length must be greater than 10."}
        
      ))
  }
  if (!strongpass)
  {
    return next(
      errorHandler(
        401,
        {type:"password", content:"Password must contain at least 1 upper Case letter, 1 special symbol and normal case letter"}
      ))
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  let user;
  try {
    const type = userType.toLowerCase();
    if (type === "customer") {
      user = await Customer.findOne({ username });
    } else if (type === "agent") {
      user = await Agent.findOne({ username });
    } else if (type === "investor") {
      user = await Investor.findOne({ username });
    }
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    user.password = hashedPassword;
    await user.save();
    const { password: pass, ...rest } = user._doc;
    res.status(200).json({ rest });
  } catch (error) {
    console.log(error);
    return next(error);
  }
}
