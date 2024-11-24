const { body, validationResult } = require('express-validator');

const validateTask = [
    body('title').notEmpty().withMessage('Title is required'),
    body('dueDate').isISO8601().withMessage('Invalid date format'),
    body('priority').isIn(['High', 'Medium', 'Low']).withMessage('Priority must be High, Medium, or Low'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateTask };