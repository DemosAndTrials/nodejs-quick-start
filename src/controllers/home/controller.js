
const homePage = (req, res) => {
    res.render('pages/home');
}

const aboutPage = (req, res) => {
    res.render('pages/about');
}

export {
    homePage,
    aboutPage
}