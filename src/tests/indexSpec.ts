import supertest from 'supertest'
import app from '../index'

const request = supertest(app)
describe('Test endpoint responses', () => {
  it('gets the image endpoint', async () => {
    const response = await request.get('/image')
    expect(response.status).toBe(200)
  })

  it('gets the image/jpg endpoint', async () => {
    const response = await request.get('/image/jpg')
    expect(response.status).toBe(200)
  })
}
)
