const { parseStringPromise } = require('xml2js');

module.exports = {
    getNews
}

// A generic function to process google sitemaps
async function getNews(sourceName, sitemapUrl) {
    // get sitemap & parse to JSON
    const response = await fetch(sitemapUrl);
    const body = await response.text();
    const json = await parseStringPromise(body);

    // reduce to only the data we're actually interested in
    return json.urlset.url.reduce((out, newsObj) => {
        // Try to use keywords field to filter. If not present, use title.
        const innerData =  newsObj['news:news'][0];
        let filterField = innerData['news:keywords'];
        if(filterField){
            filterField = filterField[0].toUpperCase();
        }
        else{
            filterField = innerData['news:title'][0].toUpperCase();
        }

        if(filterField.includes('CELTIC')){
            let news = {}
            news.title = innerData['news:title'][0];
            news.url = newsObj['loc'][0];
            news.publicationDate = innerData['news:publication_date'][0];
            news.lastModified = newsObj['lastmod'] ? newsObj['lastmod'][0] : "";
            news.keywords = filterField;
            news.source = sourceName;

            out.push(news);
        }

        return out;
    }, []);
}
