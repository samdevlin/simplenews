const {getNews} = require("../services/sitemapnews.service");

module.exports = {
    getHomepageData
}

const GOOGLE_SOURCES = {
    "DAILY_RECORD" : "https://www.dailyrecord.co.uk/map_news.xml",
    "FOOTBALL_SCOTLAND" : "https://www.footballscotland.co.uk/map_news.xml",
    "SCOTSMAN" : "https://www.scotsman.com/sitemaps/googlenews",
    "IRISH_MIRROR" : "https://www.irishmirror.ie/map_news.xml",
    "67_HAILHAIL" : "https://www.67hailhail.com/sitemap-news.xml",
    "CELTIC_STAR" : "https://thecelticstar.com/post_google_news.xml",
    "EDINBURGH_EVENING_NEWS" : "https://www.edinburghnews.scotsman.com/sitemaps/googlenews",
    "SCOTTISH_SUN" : "https://www.thescottishsun.co.uk/news-sitemap.xml",
    "IRISH_INDEPENDENT" : "https://www.independent.ie/sitemap/sitemap_googlenews.xml",
    "HITC" : "https://www.hitc.com/sitemap-news.xml"
}

async function getHomepageData() {
    let news = [];

    console.time('Google Source Fetch');
    const sources = Object.keys(GOOGLE_SOURCES)
    for(let i = 0; i < Object.keys(GOOGLE_SOURCES).length; i++){
        const source = sources[i];
        const url = GOOGLE_SOURCES[source];
        news = news.concat(await getNews(source, url));
    }
    console.timeEnd('Google Source Fetch');

    return news;
}