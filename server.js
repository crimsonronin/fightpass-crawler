/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */

import RobotsCrawler from './lib/robots-crawler';

const crawlerService = new RobotsCrawler('http://www.ufc.tv/service/videoindex?ps=100');

crawlerService.start().
then(()=> {
    process.exit(0);
});