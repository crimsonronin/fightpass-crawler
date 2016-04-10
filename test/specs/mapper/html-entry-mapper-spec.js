/**
 * @author Josh Stuart <joshstuartx@gmail.com>.
 */
import should from 'should';
import fs from 'fs';
import q from 'q';
import cheerio from 'cheerio';
import FileHelper from '../../utils/file-helper';
import HtmlEntryMapper from '../../../lib/mapper/html-entry-mapper';

describe('HTML entry mapper', () => {
    const FIXTURE_EVENT_INTERVIEW = `${__dirname}/../../fixtures/event-interview.html`;

    it('should successfully map an interview html page to an entry', (done) => {
        const html = FileHelper.getTextFile(FIXTURE_EVENT_INTERVIEW);
        const $ = cheerio.load(html);

        // test
        const entry = HtmlEntryMapper.toObject($);

        entry.title.should.eql('Invicta FC 16: Jennifer Maia Backstage Interview');
        entry.description.should.eql('Jennifer Maia spoke with UFC FIGHT PASS after becoming the interim flyweight champion at Invicta FC 16.');
        entry.date.format().should.eql('2016-03-12T01:56:00+11:00');
        entry.keywords.length.should.eql(2);
        entry.keywords[0].should.eql('Invicta FC 16');
        entry.keywords[1].should.eql('Jennifer Maia');
        done();
    });
});
