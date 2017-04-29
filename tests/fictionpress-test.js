"use strict";
exports.__esModule = true;
var FictionpressParser_1 = require("../src/parsers/FictionpressParser");
var fictionpressTestInfo = [
    {
        tabId: -1,
        testName: 'fictionpress parser, single chapter',
        url: 'https://www.fanfiction.net/s/2048837/1/Reminiscence',
        title: 'Reminiscence',
        author: 'Kenya Starflight',
        chapterUrls: ['https://www.fanfiction.net/s/2048837/1/Reminiscence'],
        parser: FictionpressParser_1["default"].getParserReturner()
    },
    {
        tabId: -1,
        testName: 'fictionpress parser, multiple chapters',
        url: 'https://www.fictionpress.com/s/3305498/2/When-Darkness-Shines-Brightest',
        title: 'When Darkness Shines Brightest',
        author: 'JulmaSatu',
        chapterUrls: [
            'https://www.fictionpress.com/s/3305498/1/When-Darkness-Shines-Brightest',
            'https://www.fictionpress.com/s/3305498/2/When-Darkness-Shines-Brightest',
            'https://www.fictionpress.com/s/3305498/3/When-Darkness-Shines-Brightest',
            'https://www.fictionpress.com/s/3305498/4/When-Darkness-Shines-Brightest'
        ],
        parser: FictionpressParser_1["default"].getParserReturner()
    }
];
exports["default"] = fictionpressTestInfo;
