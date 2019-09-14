const expect = require('chai').expect
const supertest = require('supertest')
require('dotenv').config();
const { config, toKm, calDistance } = require('../helpers/utils');

const api = supertest(`${config.host}`)
console.log(`${config.host}`)

describe('Biblotech Test', () => {
  before(async () => {
    console.log(config.mongo);
  })

  it('Should query using zipcode', (done) => {
    api
      .get(`closest?zip=55811-1810`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('success')
        expect(res.body.data.store._id).to.have.lengthOf.above(0)
        expect(res.body.data.store.location.type).to.equal('Point')
        expect(res.body.data.store.location.coordinates).to.be.instanceof(Array)
        expect(res.body.data.distance).to.not.equal(null)
        expect(res.body.data.units).to.equal('mi')
        done()
      })
  }).timeout(10000)

  it('Should query using address', (done) => {
    api
      .get(`closest?address=${encodeURI('731 Lawrence St. San Angelo, TX 76901')}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('success')
        expect(res.body.data.store._id).to.have.lengthOf.above(0)
        expect(res.body.data.store.location.type).to.equal('Point')
        expect(res.body.data.store.location.coordinates).to.be.instanceof(Array)
        expect(res.body.data.distance).to.not.equal(null)
        expect(res.body.data.units).to.equal('mi')
        done()
      })
  }).timeout(10000)

  it('Should query using zipcode and units (KM)', (done) => {
    api
      .get(`closest?zip=47906&units=km`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('success')
        expect(res.body.data.store._id).to.have.lengthOf.above(0)
        expect(res.body.data.store.location.type).to.equal('Point')
        expect(res.body.data.store.location.coordinates).to.be.instanceof(Array)
        expect(res.body.data.distance).to.not.equal(null)
        expect(res.body.data.units).to.equal('km')
        done()
      })
  }).timeout(10000)

  it('Should query using zipcode and units (Miles)', (done) => {
    api
      .get(`closest?zip=47906&units=mi`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('success')
        expect(res.body.data.store._id).to.have.lengthOf.above(0)
        expect(res.body.data.store.location.type).to.equal('Point')
        expect(res.body.data.store.location.coordinates).to.be.instanceof(Array)
        expect(res.body.data.distance).to.not.equal(null)
        expect(res.body.data.units).to.equal('mi')
        done()
      })
  }).timeout(10000)

  it('Should calculate correct havesine distance between two geometric points', async () => {
    try {
      // Distance from lagos to abuja as the crow flies
      const distanceInMiles = calDistance(6.4531, 9.0579, 3.3958, 7.4951)
      expect(parseInt(distanceInMiles, 10)).to.equal(333)
      const distanceInKm = toKm(distanceInMiles)
      expect(parseInt(distanceInKm, 10)).to.equal(parseInt(distanceInMiles * 1.609344, 10))
    } catch (error) {
      console.log(error)
    }
  }).timeout(10000)
})

