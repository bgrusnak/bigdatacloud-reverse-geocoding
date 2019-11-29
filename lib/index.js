"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class ReverseGeocode {
    constructor(options = {
        api: "https://api.bigdatacloud.net",
        endpoint: "/data/reverse-geocode-client",
        language: "en",
        format: "latitude=${lat}&longitude=${long}&localityLanguage=${lang}"
    }) {
        this.options = options;
    }
    locate(coords) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = (this.options.format || "").replace(/(\${lat})|(\${long})|(\${lang})/g, match => {
                switch (match) {
                    case "${lat}":
                        return String(coords.lat);
                    case "${long}":
                        return String(coords.long);
                    case "${lang}":
                        return this.options.language || "en";
                }
                return "";
            });
            const answer = yield axios_1.default.get(`${this.options.api}${this.options.endpoint}?${queryString}`);
            return answer.data;
        });
    }
}
exports.default = ReverseGeocode;
