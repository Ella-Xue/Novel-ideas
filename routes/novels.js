let Novel = require('../models/novels');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/novels');

router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Novel.find(function(err, novels) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(novels,null,10));
    });
}

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Novel.find({ "_id" : req.params.id },function(err, novel) {
        if (err)
            res.json({ message: 'Novel NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(novel,null,10));
    });

}

router.addNovel = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var novel = new Novel();

    novel.name = req.body.name;
    novel.author = req.body.author;
    novel.type = req.body.type;
    novel.recommender = req.body.recommender;

    novel.save(function(err) {
        if (err)
            res.json({ message: 'Novels NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Novels Successfully Added!', data: novel });
    });
}
router.giveGrade = (req,res)=>{
    Novel.findById(req.params.id, function(err,novel) {
        if (err)
            res.json({ message: 'Novel NOT Found!', errmsg : err } );
        else {
            novel.grade = req.body.grade;
            novel.save(function (err) {
                if (err)
                    res.json({ message: 'Novel NOT graded!', errmsg : err } );
                else
                    res.json({ message: 'Novel Successfully graded!', data: novel });
            });
        }
    });
}
router.deleteNovel = (req, res) => {

    Novel.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Novels NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Novels Successfully Deleted!'});
    });
}


module.exports = router;