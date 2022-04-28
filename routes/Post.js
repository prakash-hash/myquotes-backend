const express = require('express');
const res = require('express/lib/response');
const Post = require('../models/Post');
const router = express.Router();


//post quotes

// router.post("/", async (req, res) => {
//     try {
//         let post = new Post(req.body);
//         post = await post.save();
//         res.status(200).json({
//             status: 200,
//             data: post,
//         });
//     }
//     catch (err) {
//         res.status(400).json({
//             stastus: 400,
//             message: err.message,
//         });
//     }
// });

router.get("/list", async (req, res) => {
    try {
        // to get random values we are calculating a random number
        
        
        let post = await Post.aggregate([{$sample:{size:20}}]);
        if (post) {
            res.status(200).json({
                status: 200,
                data: post,
            });
        }
        else {
            res.status(400).json({
                status: 400,
                data: "No post found",
            });
        }
    }
    catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
});

router.get("/list/tags", async (req, res) => {
    try {
        let post = await Post.find({}).distinct('tag');
        if (post) {
            res.status(200).json({
                status: 200,
                data: post,
            });
        }
        else {
            res.status(400).json({
                status: 400,
                data: "No post found",
            });
        }
    }
    catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
});

router.get("/list/authors/:pageNo?", async (req, res) => {
    try {
        let post = await Post.find({}).distinct('author');
        let totalPage = Math.ceil(post.length/20);
        let pageNo = req.params.pageNo ? req.params.pageNo : Math.random()*totalPage; 
        if (post) {
            res.status(200).json({
                status: 200,
                data: post.slice((pageNo-1)*20,pageNo*20),
                totalPages:totalPage,
            });
        }
        else {
            res.status(400).json({
                status: 400,
                data: "No post found",
            });
        }
    }
    catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
});

router.get("/list/author=:authorNname/:pageNo?", async (req, res) => {
    try {
        let post = await Post.find({author: req.params.authorNname});
        let pageNo = req.params.pageNo ? req.params.pageNo : 1;
        let totalResults = post.length;
        let totalPages = Math.ceil(totalResults/20);
        if (post) {
            res.status(200).json({
                status: 200,
                data: post.slice((pageNo-1)*20,pageNo*20),
                totalPages:totalPages,
            });
        }
        else {
            res.status(400).json({
                status: 400,
                data: "No post found",
            });
        }
    }
    catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
});



router.get("/list/postId=:postId", async (req, res) => {
    try {
        let post = await Post.findOne({
            _id: req.params.postId,
        });
        if (post) {
            res.status(200).json({
                status: 200,
                data: post,
            });
        }
        else {
            res.status(400).json({
                status: 400,
                data: "No post found",
            });
        }
    }
    catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
});


router.get("/list/tag=:tag?/:pageNo?", async (req, res) => {
    try {
        let pageNo = req.params.pageNo ? req.params.pageNo : 1;
        let limit = 20;
        let tag = req.params.tag ? req.params.tag : "love";
        
        let post = await Post.find({tag:tag}).skip((pageNo-1)*req.params.limit).limit(limit);

        let totalCount = await Post.countDocuments({tag:tag});
        if (post) {
            res.status(200).json({
                status: 200,
                data: post,
                totalPages:totalCount/limit,
            });
        }
        else {
            res.status(400).json({
                status: 400,
                data: "No post found",
            });
        }

    }
    catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
});


// Uncomment below code to enable update quote

// router.put("/:postId", async (req, res) => {
//     try {
//         let post = await Post.findByIdAndUpdate(req.params.postId, req.body, {
//             new: true,
//         });
//         if (post) {
//             res.status(200).json({
//                 status: 200,
//                 data: post,
//             });
//         }
//         else {
//             res.status(400).json({
//                 status: 400,
//                 message: "No post found",
//             });
//         }
//     }
//     catch (err) {
//         res.status(400).json({
//             status: 400,
//             message: err.message,
//         });
//     }

// });


// Uncomment below code to enable deleting quote

// router.delete("/:postId", async (req, res) => {
//     try {
//         let post = await Post.findByIdAndRemove(req.params.postId);
//         if (post) {
//             res.status(200).json({
//                 status: 200,
//                 message: "Post deleted successfully",
//             });

//         } else {
//             res.status(400).json({
//                 status: 400,
//                 message: "No post found",
//             });
//         }
//     } catch (err) {
//         res.status(400).json({
//             status: 400,
//             message: err.message,
//         });
//     }
// });

module.exports = router;