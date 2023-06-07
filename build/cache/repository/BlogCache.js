"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../query");
const keys_1 = require("../keys");
const config_1 = require("../../config");
const utils_1 = require("../../helpers/utils");
function getKeyForId(blogId) {
    return (0, keys_1.getDynamicKey)(keys_1.DynamicKey.BLOG, blogId.toHexString());
}
function getKeyForUrl(blogUrl) {
    return (0, keys_1.getDynamicKey)(keys_1.DynamicKey.BLOG, blogUrl);
}
async function save(blog) {
    return (0, query_1.setJson)(getKeyForId(blog._id), { ...blog }, (0, utils_1.addMillisToCurrentDate)(config_1.caching.contentCacheDuration));
}
async function fetchById(blogId) {
    return (0, query_1.getJson)(getKeyForId(blogId));
}
async function fetchByUrl(blogUrl) {
    return (0, query_1.getJson)(getKeyForUrl(blogUrl));
}
exports.default = {
    save,
    fetchById,
    fetchByUrl,
};
//# sourceMappingURL=BlogCache.js.map