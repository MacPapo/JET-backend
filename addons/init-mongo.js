function seed(dbName, user, password) {
    db = db.getSiblingDB(dbName);
    db.createUser({
        user: user,
        pwd: password,
        roles: [{ role: 'readWrite', db: dbName }],
    });

    db.createCollection('api_keys');
    db.createCollection('roles');
    db.createCollection('users');
    db.createCollection('tables');
    db.createCollection('foods');
    db.createCollection('drinks');

    db.api_keys.insert({
        key: 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
        permissions: ['GENERAL'],
        comments: ['To be used by the xyz vendor'],
        version: 1,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    db.roles.insertMany([
        {
            code: 'WAITER',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            code: 'BARTENDER',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            code: 'CASHIER',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            code: 'COOKER',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            code: 'ADMIN',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);

    db.users.insertMany([
        {
            firstName: 'Admin',
            lastName: 'Admin',
            email: 'admin@justeatime.com',
            password: '$2a$10$psWmSrmtyZYvtIt/FuJL1OLqsK3iR1fZz5.wUYFuSNkkt.EOX9mLa', // hash of password: changeit
            roles: db.roles
                .find({})
                .toArray()
                .map((role) => role._id),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            firstName: 'Waiter',
            lastName: 'Waiter',
            email: 'waiter@justeatime.com',
            password: '$2a$10$psWmSrmtyZYvtIt/FuJL1OLqsK3iR1fZz5.wUYFuSNkkt.EOX9mLa', // hash of password: changeit
            roles: db.roles
                .find({ code: 'WAITER' })
                .toArray()
                .map((role) => role._id),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            firstName: 'Bartender',
            lastName: 'Bartender',
            email: 'bartender@justeatime.com',
            password: '$2a$10$psWmSrmtyZYvtIt/FuJL1OLqsK3iR1fZz5.wUYFuSNkkt.EOX9mLa', // hash of password: changeit
            roles: db.roles
                .find({ code: 'BARTENDER' })
                .toArray()
                .map((role) => role._id),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            firstName: 'Cooker',
            lastName: 'Cooker',
            email: 'cooker@justeatime.com',
            password: '$2a$10$psWmSrmtyZYvtIt/FuJL1OLqsK3iR1fZz5.wUYFuSNkkt.EOX9mLa', // hash of password: changeit
            roles: db.roles
                .find({ code: 'COOKER' })
                .toArray()
                .map((role) => role._id),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            firstName: 'Cashier',
            lastName: 'Cashier',
            email: 'cashier@justeatime.com',
            password: '$2a$10$psWmSrmtyZYvtIt/FuJL1OLqsK3iR1fZz5.wUYFuSNkkt.EOX9mLa', // hash of password: changeit
            roles: db.roles
                .find({ code: 'CASHIER' })
                .toArray()
                .map((role) => role._id),
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ]);

    db.tables.insertMany([
        {
            number: 1,
            seats: 4,
            isAvailable: true,
        },
        {
            number: 2,
            seats: 4,
            isAvailable: true,
        },
        {
            number: 3,
            seats: 4,
            isAvailable: true,
        },
        {
            number: 4,
            seats: 4,
            isAvailable: true,
        },
        {
            number: 5,
            seats: 4,
            isAvailable: true,
        },
        {
            number: 6,
            seats: 4,
            isAvailable: true,
        },
        {
            number: 7,
            seats: 4,
            isAvailable: true,
        },
        {
            number: 8,
            seats: 4,
            isAvailable: true,
        },
        {
            number: 9,
            seats: 4,
            isAvailable: true,
        },
        {
            number: 10,
            seats: 4,
            isAvailable: true,
        },
        {
            number: 11,
            seats: 4,
            isAvailable: true,
        },
        {
            number: 12,
            seats: 4,
            isAvailable: true,
        },
        {
            number: 13,
            seats: 4,
            isAvailable: true,
        },
        {
            number: 14,
            seats: 4,
            isAvailable: true,
        },
        {
            number: 15,
            seats: 4,
            isAvailable: true,
        }
    ]);

    db.foods.insertMany([
        {
            name: 'Cheeseburger',
            price: 12,
            description: 'Cheeseburger with cheese',
            productionTime: 10,
        },
        {
            name: 'Hot Dog',
            price: 8,
            description: 'Hot Dog with cheese',
            productionTime: 10,
        },
        {
            name: 'French Fries',
            price: 5,
            description: 'French Fries with cheese',
            productionTime: 10,
        },
        {
            name: 'Onion Rings',
            price: 5,
            description: 'Onion Rings with cheese',
            productionTime: 10,
        }
    ]);

    db.drinks.insertMany([
        {
            name: 'Coca Cola',
            price: 5,
            description: 'Coca Cola',
            productionTime: 1,
        },
        {
            name: 'Fanta',
            price: 5,
            description: 'Fanta',
            productionTime: 1,
        },
        {

            name: 'Sprite',
            price: 5,
            description: 'Sprite',
            productionTime: 1,
        },
        {
            name: 'Water',
            price: 5,
            description: 'Water',
            productionTime: 1,
        },
        {
            name: 'Beer',
            price: 5,
            description: 'Beer',
            productionTime: 3,
        }
    ]);
}

seed('api-db', 'justeatime', 'justeatime');
