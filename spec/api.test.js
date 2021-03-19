const request = require('supertest')
const app = require('../app')
const db = require('../models');
const cleanDb = require('./helpers/cleanDb')

require('./factories/author').factory
require('./factories/post').factory
require('./factories/booking').factory
require('./factories/attendee').factory
require('./factories/user').factory
require('./factories/company').factory
require('./factories/account').factory
const factory = require('factory-girl').factory

beforeAll(async () => {
    await cleanDb(db)
});

afterAll(async () => {
    await cleanDb(db)
    await db.close()
});

describe('GET /users', () => {

    let response
    let users

    beforeAll(async () => await cleanDb(db))

    describe('when there is no users in database', () => {
        beforeAll(async () => {
            response = await request(app).get('/users').set('Accept', 'application/json');
        })

        test('It should not retrieve any user in db', async () => {
            const users = await db.User.findAll()
            expect(users.length).toBe(0);
        });
        test('It should respond with a 200 status code', async () => {
            expect(response.statusCode).toBe(200);
        });
        test('It should return a json with a void array', async () => {
            expect(response.body).toStrictEqual({"data": []});
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

describe('POST /users', () => {

    let response_signup;
    let response_signin;
    let data = {}
    let firstName = 'John'
    let lastName = 'Smith'
    let email = 'johnsmith422@gmail.com'
    let password = 'MyPassW0rd'
    let userType = 'employee'
    let hourlyRate = '25'
    let company = ""

    beforeAll(async () => {
        await cleanDb(db)
        company = await factory.create('company')
        data = {
            "attributes": {
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "password": password,
                "userType": userType,
                "company": company.dataValues.companyId,
                "hourlyRate": hourlyRate
            }
        }
        response_signup = await request(app).post('/user').send({"data": data});
        response_signin = await request(app).post('/user/signin').send({"data": data});
    })

    test('It should respond with a 200 status code /signup', async () => {
        expect(response_signup.statusCode).toBe(200);
    });

    test('It should return a json with the new user /signup', async () => {
        expect(response_signup.body.firstName).toBe(data.firstName);
        expect(response_signup.body.lastName).toBe(data.lastName);
        expect(response_signup.body.email).toBe(data.email);
        expect(response_signup.body.userType).toBe(data.userType);
        expect(response_signup.body.company).toBe(data.company);
        expect(response_signup.body.hourlyRate).toBe(data.hourlyRate);
    });

    test('It should create and retrieve a post for the selected user', async () => {
        const user = await db.User.findOne({
            where: {
                firstName: response_signup.body.data.attributes.firstName,
                lastName: response_signup.body.data.attributes.lastName
            }
        })
        expect(user.firstName).toBe(firstName)
        expect(user.lastName).toBe(lastName)
    });

    test('It should respond with a 200 status code /sginin', async () => {
        expect(response_signin.statusCode).toBe(200);
    });


    describe('GET /attendees (with token securisation', () => {

        let response
        let attendees

        beforeAll(async () => await cleanDb(db))

        describe('when there is no attendee in database', () => {
            beforeAll(async () => {
                response = await request(app).get('/attendees').set({'Accept': 'application/json', 'x-access-token': response_signin.body.data.attributes.accessToken});
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
                response = await request(app).get('/attendees').set({'Accept': 'application/json', 'x-access-token': response_signin.body.data.attributes.accessToken})
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

});


describe('GET /companies', () => {

    let response
    let companies

    beforeAll(async () => await cleanDb(db))

    describe('when there is no companies in database', () => {
        beforeAll(async () => {
            response = await request(app).get('/companies').set('Accept', 'application/json');
        })

        test('It should not retrieve any company in db', async () => {
            const companies = await db.Company.findAll()
            expect(companies.length).toBe(0);
        });
        test('It should respond with a 200 status code', async () => {
            expect(response.statusCode).toBe(200);
        });
        test('It should return a json with a void array', async () => {
            expect(response.body).toStrictEqual({"data": []});
        });
    })

    describe('when there is one or more companies in database', () => {
        beforeAll(async () => {
            companies = await factory.createMany('company', 5)
            response = await request(app).get('/companies').set('Accept', 'application/json')
        })

        test('It should not retrieve any company in db', async () => {
            const companiesInDatabase = await db.Company.findAll()
            expect(companiesInDatabase.length).toBe(5)
        });
        test('It should respond with a 200 status code', async () => {
            expect(response.statusCode).toBe(200)
        });
    })
});