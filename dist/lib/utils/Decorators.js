"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyOptions = exports.createClassDecorator = void 0;
function createClassDecorator(fn) {
    return fn;
}
exports.createClassDecorator = createClassDecorator;
function ApplyOptions(options) {
    return createClassDecorator((target) => class extends target {
        constructor(store, file, directory) {
            super(store, file, directory, options);
        }
    });
}
exports.ApplyOptions = ApplyOptions;
//# sourceMappingURL=Decorators.js.map