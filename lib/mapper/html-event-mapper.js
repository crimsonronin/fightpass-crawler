/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
import cheerio from 'cheerio';
import _ from 'lodash';
import moment from 'moment';
import q from 'q';
import {Event} from 'fightpass-models';
import logger from './../utils/logger';

class HtmlEventMapper {
    /**
     *
     * @param $
     * @returns {{title: string, date: string, dateConvert, time: string, description: string, keywords: Array}}
     */
    static toObject($) {
        const name = _.trim($('#nlProgramName .eventName').text());
        const title = _.trim($('#nlProgramName').clone().children().remove().end().text());
        const detailsRow = $('.videoDetail .detail .txt .item');
        const date = _.trim(detailsRow.first().text());
        const city = _.trim(detailsRow.next().text());
        const venue = _.trim(detailsRow.next().text());
        const description = _.trim($('meta[name="description"]').attr('content'));
        const keywords = _.trim($('meta[name="keywords"]').attr('content')).split(',');

        // TODO create event types eg. PPV, FightNight, etc. Also, add organisation.
        return new Event({
            name: name,
            title: title,
            date: moment(date),
            location: {
                city: city,
                venue: venue
            },
            metadata: {
                description: description,
                keywords: keywords
            }
        });
    }
}

export default HtmlEventMapper;
