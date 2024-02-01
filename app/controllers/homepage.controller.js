const {getNews} = require("../services/dailyrecord.service");

module.exports = {
    getHomepageData
}

async function getHomepageData() {
    return getNews();
}