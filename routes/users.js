let User = require('../models/users');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/novels');

router.addUser = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var user = new User();

    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;

    user.save(function(err) {
        if (err)
            res.json({ message: 'User NOT Added!', errmsg : err } );
        else
            res.json({ message: 'User Successfully Added!', data: user });
    });
}

router.getInfo = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    User.find({ "_id" : req.params.id },function(err, user) {
        if (err)
            res.json({ message: 'User NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(user,null,5));
    });

}
router.modifyPassword = (req,res)=>{
    User.findById(req.params.id, function(err,user) {
        if (err)
            res.json({ message: 'User NOT Found!', errmsg : err } );
        else {
            user.password = req.body.password;
            user.save(function (err) {
                if (err)
                    res.json({ message: 'Novel NOT graded!', errmsg : err } );
                else
                    res.json({ message: 'Password Successfully changed!', data: user });
            });
        }
    });
}

module.exports = router;