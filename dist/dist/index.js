"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const klasa_1 = require("klasa");
const Client_1 = require("./lib/Client");
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return Client_1.MusicClient; } });
module.exports[klasa_1.Client.plugin] = Client_1.MusicClient[klasa_1.Client.plugin];
//# sourceMappingURL=index.js.map