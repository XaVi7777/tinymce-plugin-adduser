const User = require('./models/User/User');
const mongoose = require('mongoose');
const faker = require('faker');


const options = require('./options');

async function seed() {
    try {
        await mongoose.connect(options.MONGODB_URI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });

        for (let i = 0; i < 1000; i++) {
            const user = new User({
                name: faker.name.findName()
            });
            await user.save();
        }
        await mongoose.disconnect();
    } catch (e) {
        console.log(e);
    }
}
seed();