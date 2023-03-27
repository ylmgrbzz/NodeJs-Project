import { validationResult } from "express-validator";
// import User from "../models/user.js";
import slugify from "slugify";
import pool from "../db.js";

export const getLoginController = (req, res) => {
    res.render('auth/login')
}
export const postLoginController = (req, res) => {
    const { username, password } = req.body
    console.log(req.body);
    res.locals.formData = req.body
    let error
    if (!username) {
        error = 'Please fill in username fields'
    }
    else if (!password) {
        error = 'Please fill in password fields'
    } else if (username !== 'ylmgrbz' || password !== 'ylmgrbz') {
        error = 'Username or password is incorrect'
    } else {

        req.session.username = username
        res.redirect('/')
    }
    res.render('auth/login', {
        error
    })
}

export const postRegisterController = (req, res) => {
    res.session.formData = req.body
    const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    // 	return res.status(400).json({
    // 		errors: errors.array()
    // 	});
    // }
    // hata yoksa

    if (!errors.isEmpty()) {
        let avatar = req.files.avatar
        let file = avatar.name.split('.')
        let fileExtension = file.pop()
        let fileName = file.join('')
        let path = 'upload/' + Date.now() + '-' + slugify(fileName, {
            lower: true,
            locale: 'tr',
            strict: true
        }) + '.' + fileExtension;

        avatar.mv(path, async (error) => {
            if (error) {
                console.log(error);
                return res.status(500).send(error)
            }

            const db = await pool.getConnection()

            try {
                const data = {
                    email: req.body.email,
                    password: req.body.password,
                    username: req.body.username,
                    avatar: path
                }

                const [result] = await db.execute('INSERT INTO users SET email = : email, username = : username , password  = : password, avatar = : avatar', data, (error, result) => {
                    if (error) throw error
                    console.log("KAYIT TAMAMLANDI", result);
                })
            }
            catch (error) {
                console.log(error);
            }

            // const response = await User.create({
            //     email: req.body.email,
            //     password: req.body.password,
            //     avatar: path,
            //     username: req.body.username
            // })
            // const user = await User.findById(response.insertId)
            // req.session.username = user.username
            // req.session.user_id = user.id
            // res.redirect('/')
        })
    } else {
        res.render('auth/register', {
            errors: errors.array()
        })
    }

}
export const logoutController = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}

export const getRegisterController = (req, res) => {
    res.render('auth/register')
}


