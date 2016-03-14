/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
import _ from 'lodash';

class SitemapEntryMapper {
    static toObject(xmlEntry) {
        const image = _.get(xmlEntry, 'image:image[0]');
        const video = _.get(xmlEntry, 'video:video[0]');

        return {
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
    }
}

export default SitemapEntryMapper;
