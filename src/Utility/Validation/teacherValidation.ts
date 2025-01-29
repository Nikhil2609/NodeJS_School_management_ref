import Joi from "joi";

export const teacherSchema = {
    CreateTeacher: {
        body: {
            name: Joi.string().min(3).max(50).required(),
            email: Joi.string().required().email(),
            subject: Joi.string().required(),
        },
    },
    UpdateTeacher: {
        params: {
            id: Joi.number().required(),
        },
        body: {
            name: Joi.string().min(3).max(50).required(),
            email: Joi.string().required().email(),
            subject: Joi.string().required(),
        },
    },
    DeleteTeacher: {
        params: {
            id: Joi.number().required(),
        },
    },
    GetTeacher: {
        params: {
            id: Joi.number().required(),
        },
    },
}