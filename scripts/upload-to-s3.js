require('dotenv').config();
const chalk = require('chalk');
const debug = require('debug')('deploy');
const info = chalk.magenta, success = chalk.bold.green, failure = chalk.bold.red;
const s3 = require('s3').createClient({
  s3Options: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    logger: {log: message => debug('%s', message.replace(/\n/g, ''))}
  }
});

const BUILD_DIR = 'dist';
const BUCKET = 'westonfribley.com';

module.exports = {
  description: `upload ${info('./' + BUILD_DIR)} to S3 bucket ${info(BUCKET)}`,

  /**
   * Upload the contents of the BUILD_DIR directory to the S3 bucket BUCKET.
   *
   * @param  {Function} done  Called when the upload completes.
   * @return {void}
   */
  action(done) {
    done = done || (() => {});

    const options = {
      localDir: BUILD_DIR,
      deleteRemoved: true,

      s3Params: {
        Bucket: BUCKET
      }
    };

    console.log(`Deploying ${info(options.localDir)} to S3 bucket: ${info(options.s3Params.Bucket)}`)
    const uploader = s3.uploadDir(options);

    uploader.on('progress',() => {
      let total = uploader.progressTotal;
      let percent = total === 0 ? 0 : Math.round(uploader.progressAmount / total);
      debug('progress: %d', percent);
    });

    uploader.on('error', err => {
      console.error(failure('Deployment failed'), '\n', err, '\n');
      done();
    });

    uploader.on('end',() => {
      console.log(success('Deployment succeeded!\n'));
      done();
    });
  }
};
