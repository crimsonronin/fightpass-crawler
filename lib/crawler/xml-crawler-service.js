/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
import xml2js from 'xml2js';
import q from 'q';
import CrawlerService from './crawler-service';
import logger from './../utils/logger';
const parseXmlString = xml2js.parseString;

class XmlCrawlerService extends CrawlerService {
    getPage(url, options) {
        return super.getPage(url, options).
        then((body)=> {
            logger.info(`Parsing XML`);
            return q.nfcall(parseXmlString, body);
        }).
        then((xml)=> {
            logger.info(`Successfully parsed XML`);
            return xml;
        }).
        catch((err) => {
            logger.error(`Failed to parse XML: ${err}`);
        });
    }
}

export default XmlCrawlerService;
