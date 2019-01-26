const request = require('supertest');
const expect = require('expect')

const {app} = require('./../server.js')
const {todoModel} = require('./../models/todo.js')

beforeEach((done) => {
  todoModel.remove({}).then(() => done());
})

describe('POST request', () => {

  it('should create a new todo', (done) => {

    var test = 'text control for test'

    request(app).post('/todo').send({text:test}).expect(200).expect((response) => {
      expect(response.body.text).toBe(test)
    }).end((err, res) => {
      if (err) { return done(err)};

      todoModel.find().then((res) => {
        expect(res.length).toBe(1);
        expect(res[0].text).toBe(test);
        done()
      }).catch((e) => done(e));

    })






  })









})
