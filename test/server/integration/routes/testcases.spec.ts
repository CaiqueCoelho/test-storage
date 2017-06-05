import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';
import { testcaseFixture, editedTestCaseFixture } from './testcases.fixtures';


var token = '';
var entityId = '';


describe('/testcases', function () {

    it('login', function (done) {
        authenticate(function (restoken) {
            token = restoken;
            done();
        });
    });

    it('POST /testcases respond with status 201 and JSON', function (done) {

        request(app)
            .post('/api/v1/testcases')
            .set('x-access-token', token)
            .send(testcaseFixture)
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res).to.have.header('content-type', /json/);
                expect(res).to.have.header('Location', '/api/v1/testcases/' + res.body._id);
                entityId = res.body._id;
                done();
            });
    });

    it('GET /testcases/:id respond with status 200 and JSON', function (done) {

        request(app)
            .get('/api/v1/testcases/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('testSuiteId', '45069c63096d72f89cbf9205d27c985b');
                expect(res.body).to.have.deep.property('priority', 1);
                expect(res.body).to.have.deep.property('order', 2);
                expect(res.body).to.have.deep.property('preConditions', 'Preconditions 1');
                expect(res.body).to.have.deep.property('title', 'Testcase 1');
                expect(res.body).to.have.deep.property('description', 'Test case description');
                expect(res.body).to.have.deep.property('steps', ['Check that', 'Check this']);
                expect(res.body).to.have.deep.property('testData', ['data1', 'data2']);
                expect(res.body).to.have.deep.property('expected', ['Expected that', 'Expected this']);
                expect(res.body).to.have.deep.property('postConditions', 'Postconditions 1');
                expect(res.body).to.have.deep.property('tags', ['first tag', 'second tag']);
                expect(res.body).to.have.deep.property('estimate', 10);
                expect(res.body).to.have.deep.property('enabled', true);
                expect(res.body).to.have.deep.property('isAutomated', true);
                expect(res.body).to.have.deep.property('status', 'created');
                expect(res.body).to.have.deep.property('created');
                expect(res.body).to.have.deep.property('updated');
                done();
            });
    });

    it('GET /testcases respond with status 200 and JSON', function (done) {
        request(app)
            .get('/api/v1/testcases')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('array');
                // in case of all keys
                // expect(res.body[0]).to.have.all.keys(
                expect(res.body[0]).to.have.any.keys(
                    '_id',
                    'testSuiteId',
                    'priority',
                    'order',
                    'preConditions',
                    'title',
                    'description',
                    'steps',
                    'testData',
                    'expected',
                    'postConditions',
                    'tags',
                    'estimate',
                    'status',
                    'enabled',
                    'isAutomated',
                    'created',
                    'updated'
                );
                done();
            });
    });

    it('PUT /testcases respond with status 200 and JSON', function (done) {

        request(app)
            .put('/api/v1/testcases/' + entityId)
            .set('x-access-token', token)
            .send(editedTestCaseFixture)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('testSuiteId', '11111c63096d72f89cbf9205d27c985b');
                expect(res.body).to.have.deep.property('priority', 2);
                expect(res.body).to.have.deep.property('order', 3);
                expect(res.body).to.have.deep.property('preConditions', 'Preconditions 1 edited');
                expect(res.body).to.have.deep.property('title', 'Testcase 1 edited');
                expect(res.body).to.have.deep.property('description', 'Test case description edited');
                expect(res.body).to.have.deep.property('steps', ['Check that edited', 'Check this edited']);
                expect(res.body).to.have.deep.property('testData', ['data1 edited', 'data2 edited']);
                expect(res.body).to.have.deep.property('expected', ['Expected that edited', 'Expected this edited']);
                expect(res.body).to.have.deep.property('postConditions', 'Postconditions 1 edited');
                expect(res.body).to.have.deep.property('tags', ['first tag edited', 'second tag edited']);
                expect(res.body).to.have.deep.property('estimate', 15);
                expect(res.body).to.have.deep.property('enabled', true);
                expect(res.body).to.have.deep.property('isAutomated', true);
                expect(res.body).to.have.deep.property('status', 'approved');
                expect(res.body).to.have.deep.property('created');
                expect(res.body).to.have.deep.property('updated');
                done();
            });
    });


    it('DELETE /testcases/:id respond with status 204', function (done) {

        request(app)
            .delete('/api/v1/testcases/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                expect(res.body).to.be.empty;
                done();
            });
    });

});