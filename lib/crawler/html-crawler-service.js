/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
import cheerio from 'cheerio';
import q from 'q';
import CrawlerService from './crawler-service';
import logger from './../utils/logger';

class HtmlCrawlerService extends CrawlerService {
    /**
     * Gets a remote page and passes it through cheerio, returning a jQuery style DOM helper.
     *
     * @param url
     * @param options
     * @returns {Promise}
     */
    getPage(url, options) {
        return super.getPage(url, options).
        then((body)=> {
            return cheerio.load(body);
        }).
        then(($)=> {
            logger.info(`Successfully parsed html`);
            return $;
        }).
        catch((err) => {
            logger.error(`Failed to parse html: ${err}`);
        });
    }
}

export default HtmlCrawlerService;
