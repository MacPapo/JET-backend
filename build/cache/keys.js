"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDynamicKey = exports.DynamicKey = exports.Key = void 0;
var Key;
(function (Key) {
    Key["BLOGS_LATEST"] = "BLOGS_LATEST";
})(Key = exports.Key || (exports.Key = {}));
var DynamicKey;
(function (DynamicKey) {
    DynamicKey["BLOGS_SIMILAR"] = "BLOGS_SIMILAR";
    DynamicKey["BLOG"] = "BLOG";
})(DynamicKey = exports.DynamicKey || (exports.DynamicKey = {}));
function getDynamicKey(key, suffix) {
    const dynamic = `${key}_${suffix}`;
    return dynamic;
}
exports.getDynamicKey = getDynamicKey;
//# sourceMappingURL=keys.js.map