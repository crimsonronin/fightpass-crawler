/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
import cheerio from 'cheerio';
import _ from 'lodash';
import moment from 'moment';
import q from 'q';
import logger from './../utils/logger';

class HtmlEntryMapper {
    /**
     *
     * @param $
     * @returns {{title: string, date: string, dateConvert, time: string, description: string, keywords: Array}}
     */
    static toObject($) {
        const title = _.trim($('#nlProgramName').text());
        const dateTime = $('.videoDetail .detail .txt .item');
        const date = _.trim(dateTime.prev().text());
        const time = _.trim(dateTime.next().text());
        const description = _.trim($('meta[name="description"]').attr('content'));
        const keywords = _.trim($('meta[name="keywords"]').attr('content')).split(',');

        return {
            title: title,
            date: HtmlEntryMapper.toDate(date, time),
            time: time,
            description: description,
            keywords: keywords
        };
    }

    /**
     * Creates a moment date from date/time.
     *
     * @param date
     * @param time
     * @return {Object}
     */
    static toDate(date, time) {
        const dateTime = `${date} ${time}`;

        if (moment(dateTime).isValid()) {
            return moment(dateTime);
        }

        return moment(date);
    }
}

export default HtmlEntryMapper;
