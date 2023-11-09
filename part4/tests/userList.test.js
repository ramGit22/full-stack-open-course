const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')
beforeEach(async () => {
  await User.deleteMany()
  let newUser = new User(helper.initialUser[0])
  await newUser.save()
  newUser = new User(helper.initialUser[1])
  await newUser.save()
})
describe('while making new users', () => {
  test('username must be given', async () => {
    const testUser = {
      name: 'test',
      password: 'jsdlkfjsljf',
    }
    const response = await api.post('/api/users').send(testUser).expect(400)
    expect(response.body.error).toBe(
      'username and password must be provided and password length should be minimum 3'
    )
  })
  test('minimum password length must be 3', async () => {
    const testUser = {
      username: 'rishi',
      name: 'test',
      password: 'jj',
    }
    const response = await api.post('/api/users').send(testUser).expect(400)
    expect(response.body.error).toBe(
      'username and password must be provided and password length should be minimum 3'
    )
  })

  test('retuns status code 201 when request is valid', async () => {
    const testUser = {
      username: 'rambo',
      name: 'jambo',
      password: 'jdflkjsdlfjlsjfs',
    }
    await api.post('/api/users').send(testUser).expect(201)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
