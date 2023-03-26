export const getLoginController = (req, res) => {
    res.render('auth/login')
}
export const postLoginController = (req, res) => {
    const { username, password } = req.body
    console.log(req.body);

}




