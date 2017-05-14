// imports
const readline = require('readline');


// functions

/**
 * This will wait for the specified number of milliseconds before resolving
 */
async function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
}

/**
 * This will log messages after a set number of milliseconds
 */
async function logAfterMs(ms, ...messages) {
  await sleep(ms);
  console.log(...messages);
}


/**
 * This will throw an error if shouldThrowError is true
 */
async function potentiallyThrowAnError(shouldThrowError) {
  if (shouldThrowError) {
    throw new Error('A useful error message could go here...');
  } else {
    return true;
  }
}

/**
 * This will ask a question using the readline module.
 * It will return a promise which will be resolved once the readline callback
 * has been called with the input provided.
 */
async function askQuestion(question) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(`${question} `, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

/**
 * This will ask a question after the specified milliseconds
 * Internally it will await sleep and then askQuestion
 */
async function askQestionAfterMs(ms, question) {
  await sleep(ms);
  return await askQuestion(question);
}


// main logic (wrapped into an async function)

const main = async () => {

  console.log('going to sleep for 1500ms');

  await sleep(1500);

  console.log('finished sleeping');

  console.log('will ask some questions');

  const name = await askQuestion('What is your name?');

  await logAfterMs(500, `Hello "${name}"`);

  const age = await askQestionAfterMs(500, 'How old are you?');

  await logAfterMs(500, `You are "${age}" years old!`);

  await sleep(1500);

  try {
    console.log('going to await a function that will not error');
    await potentiallyThrowAnError(false);
    console.log('going to await a function that will error');
    await potentiallyThrowAnError(true);
    console.log('this message should not appear as an error was thrown above');
  } catch (e) {
    console.error('caught the following error:', e);
  }

  await logAfterMs(500, `bye ${name}!`);
}

main();
