import { body, check } from "express-validator";

export const registerValidation = [
    body('username')
        .isLength({ min: 3, max: 10 })
        .withMessage('Kullanıcı adı en az 3 karakter olmalıdır.')
        .isAlphanumeric()
        .withMessage('Kullanıcı adı sadece sayı ve harflerden oluşmalıdır.'),

    body('email')
        .isEmail()
        .withMessage('Geçerli bir e-posta adresi girin.')
        .custom(value => {
            return User.findByEmail(value).then(user => {
                if (user) {
                    return Promise.reject('E-posta zaten kullaniliyor!');
                }
            })
        }),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Şifre en az 6 karakter uzunluğunda olmalıdır.'),

    body('passwordConfirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Şifre doğrulama eşleşmiyor.');
        }
        return true;
    }),

]