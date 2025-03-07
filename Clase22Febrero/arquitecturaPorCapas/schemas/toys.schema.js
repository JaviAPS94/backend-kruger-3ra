import Joi from "joi";

const toySchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
});

const toyUpdateSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number(),
  description: Joi.string(),
});

export { toySchema, toyUpdateSchema };
