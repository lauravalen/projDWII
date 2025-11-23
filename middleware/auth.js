module.exports = {
    checarAutenticacao: function(req, res, next) {
        // Se o usuário estiver logado, deixa passar
        if (req.isAuthenticated()) {
            return next();
        }
        // Se não, manda para o login
        res.redirect('/login'); // Ou '/auth/google' se estiver usando só Google
    }
};