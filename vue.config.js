module.exports = {
    devServer: {
        //'port': 3001,
        before: function (app) {
            app.post('/apiFlow/result', function (req, res) {
                res.redirect('/apiFlow/result');
            });
        },
    }
}