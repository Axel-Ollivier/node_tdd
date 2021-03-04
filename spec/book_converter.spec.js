const request = require('supertest')
const app = require('../app')
const db = require('../models');
const cleanDb = require('./helpers/cleanDb')

require('./factories/author').factory
require('./factories/post').factory
require('./factories/booking').factory
require('./factories/attendee').factory
const factory = require('factory-girl').factory

beforeAll(async () => {

});

afterAll(async () => {

});

class EventConverter {
    constructor(payload, account) {
        this.payload = payload
        this.account = account
        this.start = new Date(this.payload.start)
        this.end = new Date(this.payload.end)
        this._id = payload.id
        this.html_link = payload.html_link
        this.status = payload.status
        this.summary = payload.summary
    }

    client() {
        let users = this.account.getClientUsers()
        return users
    }
}

describe('#client', () => {
    let eventConverter
    let eventPayload
    let client1
    let client2
    let account
    beforeAll(async () => {
        client1 = {email: "client1@client.com"}
        client2 = {email: "client2@client.com"}
        account = {
            getClientUsers() {
                [client1, client2]
            }
        }
        eventPayload = {
            attendees: [
                {
                    displayName: 'Nick Stock',
                    email: "client@client.com",
                    organizer: true,
                    response_status: 'accepted'
                },
                {
                    displayName: 'Nicholas Stock',
                    email: 'not_client@client.com',
                    response_status: 'accepted',
                    self: true
                }
            ],
            end: {date_time: '2018-03-05T18:30:00.000+01:00'},
            html_link: 'https://www.google.com/calendar/event?eid=MGptdjJ1ZDljMWo3Y2kyZzFqZ21ybWY2c3Mgbmlja0BnZW1iYW5pLmNvbQ',
            id: '0jmv2ud9c1j7ci2g1jgmrmf6ss',
            start: {date_time: '2018-03-05T12:30:00.000+01:00'},
            status: 'confirmed',
            summary: "summary"
        }
        eventConverter = new EventConverter(eventPayload, account);
    })

/*     test('Paylod good', async () => {
        expect(EventConverter.payload).toEqual(eventPayload)
    }) */

    test('it should return type Date for start date', async () => {
        expect(eventConverter.start instanceof Date).toBe(true);
    })

    test('it should return type Date for end date', async () => {
        expect(eventConverter.end instanceof Date).toBe(true);
    })
    test('id payload is valid', async () => {
        expect(eventConverter.html_link.split('=')[1]).toEqual('MGptdjJ1ZDljMWo3Y2kyZzFqZ21ybWY2c3Mgbmlja0BnZW1iYW5pLmNvbQ');
    })
    test('payload is confirmed', async () => {
        expect(eventConverter.status).toBe('confirmed');
    })
});

