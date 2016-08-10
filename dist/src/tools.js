"use strict";
function union(...arr) {
    return [...new Set([].concat(...arr))];
}
exports.union = union;
//# sourceMappingURL=tools.js.map