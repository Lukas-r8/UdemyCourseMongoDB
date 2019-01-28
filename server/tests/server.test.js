const request = require('supertest');
const expect = require('expect')

const {app} = require('./../server.js')
const {todoModel} = require('./../models/todo.js')

var arrayTodos = [{text: 'test one todos'},{text: 'test two todos'}]

beforeEach((done) => {
  todoModel.deleteMany({}).then(() =>{
    todoModel.insertMany(arrayTodos);
    done();
  });
})

describe('POST request', () => {
  it('should create a new todo', (done) => {
    var test = 'text control for test'
    request(app).post('/todo').send({text:test}).expect(200).expect((response) => {
      expect(response.body.text).toBe(test)
    }).end((err, res) => {
      if (err) { return done(err)};
      todoModel.find({text:test}).then((res) => {
        expect(res.length).toBe(1);
        expect(res[0].text).toBe(test);
        done()
      }).catch((e) => done(e));
    });
  });

  it('should fail to create a todo', (done) => {

    request(app).post('/todo').send({text: ''}).expect(400).end((err, res) => {
      if (err) {return done(err)}

      todoModel.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done(e));
    });
  });
});

describe('GET request', () => {


  it('should GET all todos', (done) => {

    request(app).get('/todo').expect(200).expect((data) => {
      expect(data.body.length).toBe(2);
    }).end(done)

  });


});
