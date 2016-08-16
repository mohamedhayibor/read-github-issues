# read-github-issues ![](https://img.shields.io/badge/status-stable-green.svg)

This module will automatically open already submitted issues on any repos in Github.

## Installation
```sh
  > npm install -g read-github-issues
```

> Don't forget the "-g" to install it globally. (then you can run the `issues` command anywhere)

## Usage

On your terminal:
```sh
  > issues {owner}/{repo_name} {number}
  // example
  > issues 5 segmentio/nightmare
  > issues 3 avajs/ava
```

# Demo
![](http://g.recordit.co/D8ITkomdnq.gif)

#### Api

No api to mess with. Enter the command and get instant results (most recent to oldest issue).

> If you are on Chrome the newest to oldest issues will go from left to right.

By default, all open issues will be opened if the number of tabs is not specified.

> Please keep your browser open before running the command.

### Raison D'etre

Ever heard that code not written by you is hostile code. Welcome to the pack and embrace it. To measure how hostile a (repos, dependency) skimming at the issues can help decide if you are diving or not into the codebase to find out how it even works. This tool can even speed up your decision on which repos to contribute or learn from.

## License
MIT © [Mohamed Hayibor](http://github.com/mohamedhayibor)
