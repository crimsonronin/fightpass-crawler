/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
import cheerio from 'cheerio';
import _ from 'lodash';
import q from 'q';
import logger from './../utils/logger';

class HtmlEntryMapper {
    static toObject($) {

        const title = _.trim($('#nlProgramName').text());
        const dateTime = $('.videoDetail .detail .txt .item');
        const date = _.trim(dateTime.prev().text());
        const time = _.trim(dateTime.next().text());
        const description = _.trim($('meta[name="description"]').attr('content'));
        const keywords = _.trim($('meta[name="keywords"]').attr('content')).split(',');

        return {
            title: title,
            date: date,
            time: time,
            description: description,
            keywords: keywords
        };
    }
}

export default HtmlEntryMapper;
