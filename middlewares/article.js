// validation
const Joi = require(`@hapi/joi`);

// Register validation
const articleValidation = (data) =>{
    const schema = Joi.object({
        title: Joi.string().min(4).required(),
        description : Joi.string().min(6).required()
        
     });   
    return schema.validate(data);
};
module.exports.articleValidation = articleValidation;