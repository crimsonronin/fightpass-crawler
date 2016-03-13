/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
import request from 'request-promise';
import logger from './../utils/logger';

class CrawlerService {
    /**
     *
     * @param url
     * @param options
     * @returns {Promise}
     */
    getPage(url, options) {
        options = options || {};
        options.uri = url;
        logger.info(`Starting to crawl ${url}`);

        return request(options).
        then((body)=> {
            logger.info(`Finished crawling ${url}`);
            return body;
        }).
        catch((err) => {
            logger.error(`Failed to crawl ${url}: ${err}`);
        });
    }
}

export default CrawlerService;
