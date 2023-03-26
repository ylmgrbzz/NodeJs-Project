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
    res.render('auth/register')
}

export const logoutController = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}

export const getRegisterController = (req, res) => {
    res.render('auth/register')
}


