"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Blog_1 = require("../model/Blog");
const AUTHOR_DETAIL = 'name profilePicUrl';
async function create(blog) {
    const now = new Date();
    blog.createdAt = now;
    blog.updatedAt = now;
    const createdBlog = await Blog_1.BlogModel.create(blog);
    return createdBlog.toObject();
}
async function update(blog) {
    blog.updatedAt = new Date();
    return Blog_1.BlogModel.findByIdAndUpdate(blog._id, blog, { new: true })
        .lean()
        .exec();
}
async function findInfoById(id) {
    return Blog_1.BlogModel.findOne({ _id: id, status: true })
        .populate('author', AUTHOR_DETAIL)
        .lean()
        .exec();
}
async function findInfoForPublishedById(id) {
    return Blog_1.BlogModel.findOne({ _id: id, isPublished: true, status: true })
        .select('+text')
        .populate('author', AUTHOR_DETAIL)
        .lean()
        .exec();
}
async function findBlogAllDataById(id) {
    return Blog_1.BlogModel.findOne({ _id: id, status: true })
        .select('+text +draftText +isSubmitted +isDraft +isPublished +status +createdBy +updatedBy')
        .populate('author', AUTHOR_DETAIL)
        .lean()
        .exec();
}
async function findPublishedByUrl(blogUrl) {
    return Blog_1.BlogModel.findOne({
        blogUrl: blogUrl,
        isPublished: true,
        status: true,
    })
        .select('+text')
        .populate('author', AUTHOR_DETAIL)
        .lean()
        .exec();
}
async function findUrlIfExists(blogUrl) {
    return Blog_1.BlogModel.findOne({ blogUrl: blogUrl }).lean().exec();
}
async function findByTagAndPaginated(tag, pageNumber, limit) {
    return Blog_1.BlogModel.find({ tags: tag, status: true, isPublished: true })
        .skip(limit * (pageNumber - 1))
        .limit(limit)
        .populate('author', AUTHOR_DETAIL)
        .sort({ updatedAt: -1 })
        .lean()
        .exec();
}
async function findAllPublishedForAuthor(user) {
    return Blog_1.BlogModel.find({ author: user, status: true, isPublished: true })
        .populate('author', AUTHOR_DETAIL)
        .sort({ updatedAt: -1 })
        .lean()
        .exec();
}
async function findAllDrafts() {
    return findDetailedBlogs({ isDraft: true, status: true });
}
async function findAllSubmissions() {
    return findDetailedBlogs({ isSubmitted: true, status: true });
}
async function findAllPublished() {
    return findDetailedBlogs({ isPublished: true, status: true });
}
async function findAllSubmissionsForWriter(user) {
    return findDetailedBlogs({ author: user, status: true, isSubmitted: true });
}
async function findAllPublishedForWriter(user) {
    return findDetailedBlogs({ author: user, status: true, isPublished: true });
}
async function findAllDraftsForWriter(user) {
    return findDetailedBlogs({ author: user, status: true, isDraft: true });
}
async function findDetailedBlogs(query) {
    return Blog_1.BlogModel.find(query)
        .select('+isSubmitted +isDraft +isPublished +createdBy +updatedBy')
        .populate('author', AUTHOR_DETAIL)
        .populate('createdBy', AUTHOR_DETAIL)
        .populate('updatedBy', AUTHOR_DETAIL)
        .sort({ updatedAt: -1 })
        .lean()
        .exec();
}
async function findLatestBlogs(pageNumber, limit) {
    return Blog_1.BlogModel.find({ status: true, isPublished: true })
        .skip(limit * (pageNumber - 1))
        .limit(limit)
        .populate('author', AUTHOR_DETAIL)
        .sort({ publishedAt: -1 })
        .lean()
        .exec();
}
async function searchSimilarBlogs(blog, limit) {
    return Blog_1.BlogModel.find({
        $text: { $search: blog.title, $caseSensitive: false },
        status: true,
        isPublished: true,
        _id: { $ne: blog._id },
    }, {
        similarity: { $meta: 'textScore' },
    })
        .populate('author', AUTHOR_DETAIL)
        .sort({ updatedAt: -1 })
        .limit(limit)
        .sort({ similarity: { $meta: 'textScore' } })
        .lean()
        .exec();
}
async function search(query, limit) {
    return Blog_1.BlogModel.find({
        $text: { $search: query, $caseSensitive: false },
        status: true,
        isPublished: true,
    }, {
        similarity: { $meta: 'textScore' },
    })
        .select('-status -description')
        .limit(limit)
        .sort({ similarity: { $meta: 'textScore' } })
        .lean()
        .exec();
}
async function searchLike(query, limit) {
    return Blog_1.BlogModel.find({
        title: { $regex: `.*${query}.*`, $options: 'i' },
        status: true,
        isPublished: true,
    })
        .select('-status -description')
        .limit(limit)
        .sort({ score: -1 })
        .lean()
        .exec();
}
exports.default = {
    create,
    update,
    findInfoById,
    findInfoForPublishedById,
    findBlogAllDataById,
    findPublishedByUrl,
    findUrlIfExists,
    findByTagAndPaginated,
    findAllPublishedForAuthor,
    findAllDrafts,
    findAllSubmissions,
    findAllPublished,
    findAllSubmissionsForWriter,
    findAllPublishedForWriter,
    findAllDraftsForWriter,
    findLatestBlogs,
    searchSimilarBlogs,
    search,
    searchLike,
};
//# sourceMappingURL=BlogRepo.js.map