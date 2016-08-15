#!/usr/bin/env node
'use strict';
const meow = require('meow');
const open = require('open');
const got = require('got');
const cheerio = require('cheerio');

const cli = meow(`Usage: issues <n. of tabs> <owner/repo_name>

  Examples:
  > issues 10 segmentio/nightmare
  `, {
    alias: {
      'v': 'version',
      'h': 'help'
    }
});

// let userName = cli.input[0].trim();
let repoPath = "segmentio/nightmare";

let link = `https://github.com/${repoPath}/issues`;

got(link)
  .then(res => {
    let $ = cheerio.load( res.body );

    let result = $('ul.boxed-group-inner').children();

       		console.log(result);

       		/*

    if (result.length < 1) {
      console.log(`
        You might want to use another query. This one is returning an empty result.
      `);
    }

    // console.log('result: ', result);
    let attribs = Object.keys(result).map( (idx) => {
      return result[idx].attribs;
    });

    // filter out junk data then push to hrefs (_root, length, prevObjects...)
    attribs.forEach( attr => {
      if ( attr && attr.href ) {
        open(`https://github.com${ attr.href }`);
      }
    });

       		*/

  }).catch(err => {
    throw new Error(err);
  })
