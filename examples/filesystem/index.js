const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');

const TMP_DIRECTORY = path.join(__dirname, '..', '..', 'tmp', 'filesystem');

const EXAMPLE_1 = 1; // working with directories synchronously (blocking)
const EXAMPLE_2 = 2; // working with directories asynchronously
const EXAMPLE_3 = 3; // working with directories using async/await (need to use the promisified fs module)

// change the active example here
const ACTIVE_EXAMPLE = EXAMPLE_3;


if (ACTIVE_EXAMPLE === EXAMPLE_1) {

  // working with directories synchronously (blocking)
  if (fs.existsSync(TMP_DIRECTORY)) {
    console.log('directory exists synchronously', TMP_DIRECTORY);
    console.log('removing directory synchronously', TMP_DIRECTORY);
    fs.rmdirSync(TMP_DIRECTORY);
  } else {
    console.log('created directory synchronously', TMP_DIRECTORY);
    fs.mkdirSync(TMP_DIRECTORY);
    console.log('removing directory synchronously', TMP_DIRECTORY);
    fs.rmdirSync(TMP_DIRECTORY);
  }

} else if (ACTIVE_EXAMPLE === EXAMPLE_2) {

  // working with directories asynchronously
  fs.exists(TMP_DIRECTORY, (exists) => {
    if (!exists) {
      fs.mkdir(TMP_DIRECTORY, (err) => {
        if (!err) {
          console.log('created directory asynchronously', TMP_DIRECTORY);
          console.log('removing directory asynchronously', TMP_DIRECTORY);
          fs.rmdir(TMP_DIRECTORY, (err) => {
            if (!err) {
              // was removed
            }
          })
        }
      })
    }
  });

} else if (ACTIVE_EXAMPLE === EXAMPLE_3) {

  // working with directories using async/await (need to use fs-extra module for promise support)
  async function workingWithDirectoriesAsync() {
    let exists = await fsExtra.exists(TMP_DIRECTORY);
    if (!exists) {
      await fsExtra.mkdir(TMP_DIRECTORY);
      console.log('created directory asynchronously', TMP_DIRECTORY);
    }
    console.log('removing directory asynchronously', TMP_DIRECTORY);
    await fsExtra.rmdir(TMP_DIRECTORY);
  }
  workingWithDirectoriesAsync();

}
