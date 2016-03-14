/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
import _ from 'lodash';
import q from 'q';
import XmlCrawlerService from './crawler/xml-crawler-service';
import HtmlCrawlerService from './crawler/html-crawler-service';
import HtmlEntryMapper from './mapper/html-entry-mapper';
import SitemapEntryMapper from './mapper/sitemap-entry-mapper';
import logger from './utils/logger';
const ROOT_SITEMAP_KEY = 'sitemapindex.sitemap';
const SUBPAGE_URL_KEY = 'urlset.url';

class FightPassCrawler {
    constructor(url) {
        this.url = url;
        this.xmlCrawler = new XmlCrawlerService();
        this.htmlCrawler = new HtmlCrawlerService();
    }

    start() {
        return this._crawlSitemapIndex(this.url).
        then((sitemapPages)=> {
            // parse sub robots pages
            return this._crawlSitemapPages(sitemapPages);
        }).
        catch((err) => {
            logger.error(`Robots crawler failed: ${err}`);
        });
    }

    _crawlSitemapIndex(url) {
        const sitemapPages = [];
        let sitemap;

        return this.xmlCrawler.getPage(url).
        then((xml)=> {
            if (_.has(xml, ROOT_SITEMAP_KEY)) {
                sitemap = _.get(xml, ROOT_SITEMAP_KEY);
                _.forEach(sitemap, (entry) => {
                    sitemapPages.push(entry.loc[0]);
                });
                return sitemapPages;
            } else {
                throw new Error(`The xml does not contain the key ${ROOT_SITEMAP_KEY}`);
            }
        });
    }

    async _crawlSitemapPages(sitemapPages) {
        const promises = [];
        //_.forEach(sitemapPages, (page) => {
        //    const promise = this._crawlSubPage(page);
        //    promises.push(promise);
        //});

        return this._crawlSitemapPage(sitemapPages[0]);

        //return q.all(promises);
    }

    /**
     *
     * @param url
     * @returns {Promise}
     * @private
     */
    _crawlSitemapPage(url) {

        return this.xmlCrawler.getPage(url).
        then((xml)=> {
            let xmlEntries = [];
            const entries = [];

            if (_.has(xml, SUBPAGE_URL_KEY)) {
                xmlEntries = _.get(xml, SUBPAGE_URL_KEY);

                _.forEach(xmlEntries, (xmlEntry) => {
                    const entry = SitemapEntryMapper.toObject(xmlEntry);
                    entries.push(entry);
                });

                return entries;
            } else {
                throw new Error(`The sub page xml does not contain the key ${SUBPAGE_URL_KEY}`);
            }
        }).
        then((entries) => {
            // test parsing first entry
            return this._createEventFromSitemap(entries[0]);
        });
    }

    /**
     *
     * @param entry
     * @returns {Promise}
     * @private
     */
    _createEventFromSitemap(entry) {
        return this._crawlHtmlPage(entry.url).
        then((htmlEntry) => {
            console.log('Here')
        });
    }

    /**
     *
     * @param url
     * @returns {Promise}
     * @private
     */
    _crawlHtmlPage(url) {
        return this.htmlCrawler.getPage(url).
        then(($) => {
            const event = HtmlEntryMapper.toObject($);
            return event;
        });
    }
}

export default FightPassCrawler;
