import Joi from 'joi';

export const solutionQuerySchema = {
  query: {
    taskIds: Joi.string()
  }
};

export const solutionIdSchema = {
  params: {
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }
};

export const solutionSubmitScheme = {
  body: {
    solutionCode: Joi.string().required(),
    taskId: Joi.string().required()
  }
};
