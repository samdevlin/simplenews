const { parseStringPromise } = require('xml2js');
const sitemapUrl = "https://www.footballscotland.co.uk/map_news.xml";

const SOURCE = 'FOOTBALL_SCOTLAND'

module.exports = {
    getNews
}

// TODO: sources that use google news site map can be treated the same when I add TS to the project.
async function getNews() {
    // get sitemap & parse to JSON
    const response = await fetch(sitemapUrl);
    const body = await response.text();
    const json = await parseStringPromise(body);

    // reduce to only the data we're actually interested in
    return json.urlset.url.reduce((out, newsObj) => {
        const innerData =  newsObj['news:news'][0];
        const keywords = innerData['news:keywords'][0].toUpperCase();
        if(keywords.includes('CELTIC')){
            let news = {}
            news.title = innerData['news:title'][0];
            news.url = newsObj['loc'][0];
            news.publicationDate = innerData['news:publication_date'][0];
            news.lastModified = newsObj['lastmod'][0]
            news.keywords = keywords;
            news.source = SOURCE;

            out.push(news);
        }

        return out;
    }, []);
}
