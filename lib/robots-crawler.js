/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
import _ from 'lodash';
import q from 'q';
import XmlCrawlerService from './crawler/xml-crawler-service';
import logger from './utils/logger';
const ROOT_SITEMAP_KEY = 'sitemapindex.sitemap';
const SUBPAGE_URL_KEY = 'urlset.url';

class RobotsCrawler {
    constructor(url) {
        this.url = url;
        this.xmlCrawler = new XmlCrawlerService();
    }

    start() {
        return this._crawlRoot(this.url).
        then((robotsSubPages)=> {
            // parse sub robots pages
            return this._crawlSubPages(robotsSubPages);
        }).
        catch((err) => {
            logger.error(`Robots crawler failed: ${err}`);
        });
    }

    _crawlRoot(url) {
        const robotsSubPages = [];
        let siteMap;

        return this.xmlCrawler.getPage(url).
        then((xml)=> {
            if (_.has(xml, ROOT_SITEMAP_KEY)) {
                siteMap = _.get(xml, ROOT_SITEMAP_KEY);
                _.forEach(siteMap, (entry) => {
                    robotsSubPages.push(entry.loc[0]);
                });
                return robotsSubPages;
            } else {
                throw new Error(`The xml does not contain the key ${ROOT_SITEMAP_KEY}`);
            }
        });
    }

    async _crawlSubPages(robotsSubPages) {
        const promises = [];
        //_.forEach(robotsSubPages, (page) => {
        //    const promise = this._crawlSubPage(page);
        //    promises.push(promise);
        //});

        return this._crawlSubPage(robotsSubPages[0]);

        //return q.all(promises);
    }

    _crawlSubPage(url) {
        const entries = [];
        let xmlEntries = [];
        return this.xmlCrawler.getPage(url).
        then((xml)=> {
            if (_.has(xml, SUBPAGE_URL_KEY)) {
                xmlEntries = _.get(xml, SUBPAGE_URL_KEY);

                _.forEach(xmlEntries, (xmlEntry) => {
                    // TODO move this to a mapper
                    const image = _.get(xmlEntry, 'image:image[0]');
                    const video = _.get(xmlEntry, 'video:video[0]');

                    const entry = {
                        url: _.get(xmlEntry, 'loc[0]'),
                        image: {
                            title: _.get(image, 'image:title[0]'),
                            caption: _.get(image, 'image:caption[0]'),
                            url: _.get(image, 'image:loc[0]')
                        },
                        video: {
                            title: _.get(video, 'video:title[0]'),
                            url: _.get(video, 'video:player_loc[0]'),
                            thumbnail: _.get(video, 'video:thumbnail_loc[0]')
                        },
                        tags: _.get(video, 'video:tag')
                    };

                    // TODO retrieve the html page and parse it for additional information that could be used for
                    // search.

                    entries.push(entry);
                });

                return entries;
            } else {
                throw new Error(`The sub page xml does not contain the key ${SUBPAGE_URL_KEY}`);
            }
        });
    }
}

export default RobotsCrawler;
