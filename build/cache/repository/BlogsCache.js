"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../query");
const keys_1 = require("../keys");
const utils_1 = require("../../helpers/utils");
const config_1 = require("../../config");
function getKeyForSimilar(blogId) {
    return (0, keys_1.getDynamicKey)(keys_1.DynamicKey.BLOGS_SIMILAR, blogId.toHexString());
}
async function saveSimilarBlogs(blogId, blogs) {
    return (0, query_1.setList)(getKeyForSimilar(blogId), blogs, (0, utils_1.addMillisToCurrentDate)(config_1.caching.contentCacheDuration));
}
async function fetchSimilarBlogs(blogId) {
    return (0, query_1.getListRange)(getKeyForSimilar(blogId));
}
exports.default = {
    saveSimilarBlogs,
    fetchSimilarBlogs,
};
//# sourceMappingURL=BlogsCache.js.map