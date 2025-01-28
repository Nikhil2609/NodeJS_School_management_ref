import Joi from "joi";

export const teacherSchema = {
    CreateTeacher: {
        body: {
            name: Joi.string().min(3).max(50).required(),
            subject: Joi.string().min(3).required(),
            age: Joi.number().min(18).max(70).required(),
            fatherName: Joi.string().allow(null).optional(),
        },
    },
    UpdateTeacher: {
        params: {
            id: Joi.number().required(),
        },
        body: {
            name: Joi.string().min(3).max(50).required(),
            subject: Joi.string().min(3).required(),
            age: Joi.number().min(18).max(70).required(),
            fatherName: Joi.string().allow(null).optional(),
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