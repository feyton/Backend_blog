// validation
const Joi = require(`@hapi/joi`);

// Register validation
const registerValidation = (data) =>{
    const schema = Joi.object({
        full_name: Joi.string().min(4).required().pattern(new RegExp(/^([a-zA-Z]+\s)*[a-zA-Z]+$/))
        .message({"string.pattern.base":"Name can not contain numbers",
        "string.min":"minimum 4 character required"}),
        email : Joi.string().required().email().pattern(new RegExp(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/))
        .message({"string.pattern.base":"Invalid email"}),
        password: Joi.string().min(6).required().pattern(new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{3,}$/))
        .message({"string.pattern.base":"Password can contain letters, number, symbol, uppercase and lower case",
        "string.min":"minimum 6 character required"})
     });   
     return schema.validate(data);
};
// login validation
const loginValidation = (data) =>{
    const schema = Joi.object({
        email : Joi.string().required().email().pattern(new RegExp(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/))
        .message({"string.pattern.base":"Invalid email"}),
        password: Joi.string().min(6).required().pattern(new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{3,}$/))
        .message({"string.pattern.base":"Password can contain number, symbol, uppercase and lower case",
        "string.min":"minimum 6 character required"})
     });   
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation =loginValidation;