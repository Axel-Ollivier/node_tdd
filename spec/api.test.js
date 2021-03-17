const request = require('supertest')
const app = require('../app')
const db = require('../models');
const cleanDb = require('./helpers/cleanDb')

require('./factories/author').factory
require('./factories/post').factory
require('./factories/booking').factory
require('./factories/attendee').factory
require('./factories/user').factory
const factory = require('factory-girl').factory

beforeAll(async () => {
    await cleanDb(db)
});

afterAll(async () => {
    await cleanDb(db)
    await db.close()
});

describe('GET /attendees', () => {

    let response
    let attendees

    beforeAll(async () => await cleanDb(db))

    describe('when there is no attendee in database', () => {
        beforeAll(async () => {
            response = await request(app).get('/attendees').set('Accept', 'application/json');
        })

        test('It should not retrieve any attendee in db', async () => {
            const attendees = await db.Attendee.findAll()
            expect(attendees.length).toBe(0);
        });
        test('It should respond with a 200 status code', async () => {
            expect(response.statusCode).toBe(200);
        });
        test('It should return a json with a void array', async () => {
            expect(response.body).toStrictEqual([]);
        });
    })

    describe('when there is one or more attendees in database', () => {
        beforeAll(async () => {
            attendees = await factory.createMany('attendee', 5)
            response = await request(app).get('/attendees').set('Accept', 'application/json')
        })

        test('It should not retrieve any attendee in db', async () => {
            const attendeesInDatabase = await db.Attendee.findAll()
            expect(attendeesInDatabase.length).toBe(5)
        });
        test('It should respond with a 200 status code', async () => {
            expect(response.statusCode).toBe(200)
        });
    })
});

describe('GET /users', () => {

    let response
    let users

    beforeAll(async () => await cleanDb(db))

    describe('when there is no users in database', () => {
        beforeAll(async () => {
            response = await request(app).get('/users').set('Accept', 'application/json');
        })

        test('It should not retrieve any attendee in db', async () => {
            const users = await db.User.findAll()
            expect(users.length).toBe(0);
        });
        test('It should respond with a 200 status code', async () => {
            expect(response.statusCode).toBe(200);
        });
        test('It should return a json with a void array', async () => {
            expect(response.body).toStrictEqual([]);
        });
    })

    describe('when there is one or more users in database', () => {
        beforeAll(async () => {
            users = await factory.createMany('user', 5)
            response = await request(app).get('/users').set('Accept', 'application/json')
        })

        test('It should not retrieve any user in db', async () => {
            const usersInDatabase = await db.User.findAll()
            expect(usersInDatabase.length).toBe(5)
        });
        test('It should respond with a 200 status code', async () => {
            expect(response.statusCode).toBe(200)
        });
    })
});