/**
 * @author Josh Stuart <joshstuartx@gmail.com>.
 */
import should from 'should';
import fs from 'fs';
import q from 'q';
import cheerio from 'cheerio';
import FileHelper from '../../utils/file-helper';
import HtmlEventMapper from '../../../lib/mapper/html-event-mapper';

describe('HTML entry mapper', () => {
    const FIXTURE_EVENT_INTERVIEW = `${__dirname}/../../fixtures/event-ppv.html`;

    it('should successfully map a ppv event page from html to an event model', (done) => {
        const html = FileHelper.getTextFile(FIXTURE_EVENT_INTERVIEW);
        const $ = cheerio.load(html);

        // test
        const event = HtmlEventMapper.toObject($);

        event.name.should.eql('UFC 196');
        event.title.should.eql('McGregor vs Diaz');
        event.metadata.description.should.eql('UFC featherweight champion Conor McGregor and the fiery Nate Diaz will meet in a  highly anticipated matchup at UFC 196 on Saturday, March 5th live from the MGM Grand Garden Arena in Las Vegas, Nevada.');
        event.date.toString().should.eql('Sat Mar 05 2016 00:00:00 GMT+1100 (AEDT)');
        event.metadata.keywords.length.should.eql(8);
        event.metadata.keywords[0].should.eql('768');
        event.metadata.keywords[1].should.eql('Las Vegas');
        event.metadata.keywords[7].should.eql('USA');
        done();
    });
});
