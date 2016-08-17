#!/usr/bin/env node
'use strict';
const meow = require('meow');
const open = require('open');
const got = require('got');
const cheerio = require('cheerio');
const Ora = require('ora');
const isNumber = require('is-number');

const spin = new Ora('Loading the newest issues...');

const cli = meow(`
  Usage: issues <n. of tabs> <owner/repo_name>

  Examples:
  > issues 5 segmentio/nightmare
  `, {
    alias: {
      'v': 'version',
      'h': 'help'
    }
});

// query is the array of strings passed in by the user
let query = cli.input;

let nTabs = query.shift();
nTabs = Number(nTabs);

// check nTabs
if ( !isNumber(nTabs) ) {
  console.log(`
  The first argument should be a number. Preferably between 1 and 24.
  Example:
  issues 4 avajs/ava
  `);
  process.exit(1);
}

// repoPath defines the root path to the repository
let repoPath = query.join(' ');

let link = `https://github.com/${ repoPath }/issues`;

spin.start();

got(link)
  .then(res => {
    let $ = cheerio.load( res.body );
    let result = $('ul.Box-body.js-navigation-container.js-active-navigation-container').children();

    /*
    * The easiest way to get the job done:
    *  1. Collect the `issue_id`s.
    *  2. strip the issue numbers.
    */

    if (result.length < 1) {
      console.log(`
   You might want to use another query. This one is returning an empty result.
      `);
    }

    let attribs = Object.keys(result).map( (idx) => {
      return result[idx].attribs;
    });

    // Getting the ids then striping the first 6 characters `issue_`
    let dataIds = attribs.map(tag => {
      if (!!tag) {
        return tag.id.slice(6);
      }
    }).filter( id => id !== undefined);


    // slice array to corresponding number of tabs then open up issue tabs
    dataIds.slice(0, nTabs).forEach( (id, index) => {
      if ( id ) {
        open(`https://github.com/${ repoPath }/issues/${ id }`);
      }
      if (index == nTabs - 1) spin.succeed();
    });

  }).catch(err => {
    throw new Error(`
  Something went wrong:
  1. Make sure you are connected to the internet.
  2. Make sure your number of tabs is greater than 0 and less than 26
  3. Make sure your query points to the correct github path

  Error from sys:
  * ${ err }
    `);
  })
