const info = require('chalk').magenta;
const path = require('path');
const spawn = require('child_process').spawn;
const REPO = require(path.join(require('find-root')(), 'package.json')).repository.url;

module.exports = {
  description: `push branch ${info('master')} to origin ${info(REPO)}`,

  /**
   * Spawn a git process to push the branch master to origin.
   *
   * @param  {Function} done  Called when the git process terminates.
   * @return {void}
   */
  action(done) {
    done = done || (() => {});
    const git = spawn('git', ['push', 'origin', 'master'], {stdio: 'inherit'});
    git.on('close', done);
  }
};
