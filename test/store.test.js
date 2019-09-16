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
        expect(res.body.data.name).to.equal('Duluth')
        expect(res.body.data.address).to.equal('1902 Miller Trunk Hwy')
        expect(res.body.data.city).to.equal('Duluth')
        expect(res.body.data.state).to.equal('MN')
        expect(res.body.data.county).to.equal('St Louis County')
        expect(res.body.data.distance).to.not.equal(null)
        expect(res.body.data.units).to.equal('mi')
        done()
      })
  }).timeout(10000)

  it('Should query using zipcode (pure javascript)', (done) => {
    api
      .get(`closest?zip=55811-1810`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('success')
        expect(res.body.data.name).to.equal('Duluth')
        expect(res.body.data.address).to.equal('1902 Miller Trunk Hwy')
        expect(res.body.data.city).to.equal('Duluth')
        expect(res.body.data.state).to.equal('MN')
        expect(res.body.data.county).to.equal('St Louis County')
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
        expect(res.body.data.name).to.not.equal(null)
        expect(res.body.data.address).to.not.equal(null)
        expect(res.body.data.city).to.not.equal(null)
        expect(res.body.data.state).to.not.equal(null)
        expect(res.body.data.county).to.not.equal(null)
        expect(res.body.data.distance).to.not.equal(null)
        expect(res.body.data.units).to.equal('mi')
        done()
      })
  }).timeout(10000)

  it('Should query using address (pure javascript)', (done) => {
    api
      .get(`closest?address=${encodeURI('731 Lawrence St. San Angelo, TX 76901')}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('success')
        expect(res.body.data.name).to.not.equal(null)
        expect(res.body.data.address).to.not.equal(null)
        expect(res.body.data.city).to.not.equal(null)
        expect(res.body.data.state).to.not.equal(null)
        expect(res.body.data.county).to.not.equal(null)
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
        expect(res.body.data.name).to.not.equal(null)
        expect(res.body.data.address).to.not.equal(null)
        expect(res.body.data.city).to.not.equal(null)
        expect(res.body.data.state).to.not.equal(null)
        expect(res.body.data.county).to.not.equal(null)
        expect(res.body.data.distance).to.not.equal(null)
        expect(res.body.data.units).to.equal('km')
        done()
      })
  }).timeout(10000)

  it('Should query using zipcode and units (Miles) (Mongodb)', (done) => {
    api
      .get(`closest?zip=47906&units=mi`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('success')
        expect(res.body.data.name).to.not.equal(null)
        expect(res.body.data.address).to.not.equal(null)
        expect(res.body.data.city).to.not.equal(null)
        expect(res.body.data.state).to.not.equal(null)
        expect(res.body.data.county).to.not.equal(null)
        expect(res.body.data.distance).to.not.equal(null)
        expect(res.body.data.distance).to.not.equal(null)
        expect(res.body.data.units).to.equal('mi')
        done()
      })
  }).timeout(10000)

  it('Should query using zipcode and units (Miles) (Pure Javascript)', (done) => {
    api
      .get(`noclosest?zip=47906&units=mi`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('success')
        expect(res.body.data.name).to.not.equal(null)
        expect(res.body.data.address).to.not.equal(null)
        expect(res.body.data.city).to.not.equal(null)
        expect(res.body.data.state).to.not.equal(null)
        expect(res.body.data.county).to.not.equal(null)
        expect(res.body.data.distance).to.not.equal(null)
        expect(res.body.data.distance).to.not.equal(null)
        expect(res.body.data.units).to.equal('mi')
        done()
      })
  }).timeout(10000)

  it('Should flag wrong zipcode', (done) => {
    api
      .get(`closest?zip=655637748`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('error')
        expect(res.body.message).to.equal('zip code does not exist')
        done()
      })
  }).timeout(10000)

  it('Should flag no query parameter passed', (done) => {
    api
      .get(`closest`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('error')
        expect(res.body.message).to.equal('"Query" must contain at least one of [zip, address]' )
        done()
      })
  }).timeout(10000)

  it('Should flag wrong query parameter passed', (done) => {
    api
      .get(`closest?zipaddress=100`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('error')
        expect(res.body.message).to.equal('"zipaddress" is not allowed')
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

