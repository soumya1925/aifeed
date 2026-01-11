const Joi = require("joi");

exports.objectId = Joi.string().hex().length(24);

exports.validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    next();
  };
};
