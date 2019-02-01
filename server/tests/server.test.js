const request = require('supertest');
const expect = require('expect')

const {app} = require('./../server.js')
const {todoModel} = require('./../models/todo.js')
const {ObjectID} = require('mongodb');

var arrayTodos = [{_id: new ObjectID() ,text: 'test one todos'},
                  {_id: new ObjectID(), text: 'test two todos', completed: true, completedAt: 1000}]

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

describe('GET todo/:id', () => {

  it('should return todo doc', (done) => {
    request(app).get(`/todo/${arrayTodos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(arrayTodos[0].text)
    })
    .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    request(app).get(`/todo/${new ObjectID().toHexString()}`)
    .expect(404)
    .expect((res) => {
      var messageStr = JSON.parse(res.text).message
      expect(messageStr).toBe('user not found')
    })
    .end(done);
  });

  it('should return 404 for non valid ID', (done) => {
    var dummyNonValidId = '37466dehgbdgvybsycd'
    request(app).get(`/todo/${dummyNonValidId}`)
    .expect(404)
    .expect((res) => {
      var messageStr = JSON.parse(res.text).message
      expect(ObjectID.isValid(dummyNonValidId)).toBe(false);
      expect(messageStr).toBe('ID not Valid');

    })
    .end(done);



  })
});

describe('DELETE todo/:id', () => {
  it('should delete a todo', (done) => {
    var id = arrayTodos[0]._id.toHexString()
    request(app).delete(`/todo/${id}`).expect(200)
    .expect((res) => {
      expect(res.body._id).toBe(arrayTodos[0]._id.toHexString());
    })
    .end((err, res) => {
      if (err) {
        return done(err)
      };

      todoModel.findById(id).then((doc) => {
        expect(doc).toBeFalsy();
        done();
      }).catch((e) => done(e));
    });
  });

  it('should return 404 if todo not found', (done) => {
    request(app).delete(`/todo/${new ObjectID()}`).expect(404)
    .end(done);
  });

  it('should return 404 if id is not valid', (done) => {
    request(app).delete(`/todo/123asd`).expect(404)
    .end(done);
  });
});

describe('PATCH todo/:id', () => {

  it('should update the todo', (done) => {
    var id = arrayTodos[0]._id.toHexString();
    request(app).patch(`/todo/${id}`).send({completed: true, text: 'test one todos updated!'})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).not.toBe(arrayTodos[0].text);
      expect(typeof res.body.completedAt).toBe('number');
    }).end(done);

  });





  it('should clear completedAt when todo is not completed', (done) => {

    var id = arrayTodos[1]._id.toHexString();

    request(app).patch(`/todo/${id}`).send({completed: false}).expect(200)
    .expect((res) => {
      expect(res.body.completedAt).toBeFalsy();
    }).end(done);

  });









})
