/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */

import FightPassCrawler from './lib/fightpass-crawler';

const fightPassCrawler = new FightPassCrawler('http://www.ufc.tv/service/videoindex?ps=100');

fightPassCrawler.start().
then(()=> {
    process.exit(0);
});