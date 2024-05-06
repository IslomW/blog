import PostModel from '../models/Post.js'


export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts);

    } catch (err) {
        console.log(err);
        res.status(505).json({
            message: "couldn't find the post"
        });
    }
};
export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        console.log(postId)

        PostModel.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: {viewsCount: 1},
            },
            {
                returnDocument: 'after'
            }).then(doc => res.json(doc)).catch(err => res.status(500).json({message: "Not found"}));
    } catch (err) {
        console.log(err);
        res.status(505).json({
            message: "couldn't find the post"
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        console.log(postId);

        PostModel.findOneAndDelete({
            _id: postId
        }).then(doc => res.json(doc)).catch(err => res.status(500).json({message: 'Not Found'}));

    } catch (err) {
        console.log(err);
        res.status(505).json({
            message: "couldn't find the post"
        });
    }
}
export const update = async (req, res) => {

    try {
        const postId = req.params.id;

        await PostModel.updateOne(
            {
                _id: postId
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags
            }
        );

        res.json({
            success: true
        })

    } catch (err) {
        console.log(err);
        res.status(505).json({
            message: "couldn't update the post"
        });
    }
};
export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.title,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "failed to create post"
        });
    }
};
