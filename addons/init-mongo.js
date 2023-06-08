function seed(dbName, user, password) {
    db = db.getSiblingDB(dbName);
    db.createUser({
        user: user,
        pwd: password,
        roles: [{ role: 'readWrite', db: dbName }],
    });

    db.createCollection('api_keys');
    db.createCollection('roles');

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

    db.users.insert({
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@xyz.com',
        password: '$2a$10$psWmSrmtyZYvtIt/FuJL1OLqsK3iR1fZz5.wUYFuSNkkt.EOX9mLa', // hash of password: changeit
        roles: db.roles
            .find({})
            .toArray()
            .map((role) => role._id),
        createdAt: new Date(),
        updatedAt: new Date(),
    });
}

seed('api-db', 'justeatime', 'justeatime');
