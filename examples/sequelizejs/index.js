const sequelize = require('./db');
const User = require('./user');

async function main() {
  try {
    await sequelize.authenticate();
    console.log('DB Connected');

    // force: true will drop the table if it already exists
    await User.sync({force: true});

    let john = await User.build({
      firstName: 'John',
      lastName: 'Hancock'
    });

    await john.save();

    await john.update({lastName: 'Smith'});

    const users = await User.findAll();

    users.forEach((user) => {
      console.log(`${user.firstName} ${user.lastName}`);
    });

  } catch(e) {
    console.error(e);
  }
}

main();
