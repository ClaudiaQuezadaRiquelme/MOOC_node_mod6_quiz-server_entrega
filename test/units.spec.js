const Browser = require('zombie');
let chai = require('chai');
let chaiHttp = require('chai-http');

const { dbLength, app } = require('../main');
const expect = chai.expect;

describe('Test que compruebe la funcionalidad de una vista mostrada al usuario', () => {
    const browser = new Browser();

    describe('Quizzes in *indexView(quizzes)* must be aligned in a table', () => {
        before( () => browser.visit('http://localhost:8000/quizzes') );

        it('A table must exist', () => {
            browser.assert.element('table');
        });
        it('The table must have columns and rows', () => {
            browser.assert.elements('table tbody tr td', { atLeast: 1 });
        });
        it('The table must have links and buttons', () => {
            browser.assert.elements('table tbody tr td a', { atLeast: 1 });
            browser.assert.elements('table tbody tr td a.button', { atLeast: 1 });
        });
    });
});

describe('Test que compruebe el funcionamiento de un formulario', () => {
    const browser = new Browser();

    before( () => browser.visit('http://localhost:8000/quizzes/new') );
    
    describe('Creating a new quiz', () => {
        before( () => {
            browser.fill('question', 'Capital of Peru');
            browser.fill('answer', 'Lima');
            return browser.pressButton('Create');
        });

        it('New quiz form was filled', () => {
            browser.assert.success();
        });
        it('New quiz should exist', async() => { // Comprueba si existe la ruta del nuevo quiz dentro de la página quizzes
            const count = await dbLength();
            // console.log('dbLength ', count);
            browser.assert.attribute(`#quiz-name-${count}`, 'href', `/quizzes/${count}/play`);
        });
        
    });

    describe('Sending an empty quiz', () => {

    });

});

describe('Test que compruebe el funcionamiento de una ruta', () => {
    const browser = new Browser();

    describe('Quizzes home', () => {
        before( () => browser.visit('http://localhost:8000/quizzes') );

        it('Can access to quizzes home', () => {
            browser.assert.success();
        });
        it('Should see the page with all quizzes', () => {
            browser.assert.url({pathname: '/quizzes'});
        });
    });

    describe('Quizzes play', () => {
        before( () => browser.visit('http://localhost:8000/quizzes/1/play') );

        it('Can access to play with quiz 1', () => {
            browser.assert.success();
        });
        it('Should see the page to play with quiz 1', () => {
            browser.assert.url({pathname: '/quizzes/1/play'});
        });
    });

    describe('Quizzes new', () => {
        before( () => browser.visit('http://localhost:8000/quizzes/new') );

        it('Can access to create a new quiz', () => {
            browser.assert.success();
        });
        it('Should see the page to create a new quiz', () => {
            browser.assert.url({pathname: '/quizzes/new'});
        });
    });
    
    describe('Quizzes edit', () => {
        before( () => browser.visit('http://localhost:8000/quizzes/1/edit') );

        it('Can access to edit the quiz 1', () => {
            browser.assert.success();
        });
        it('Should see the page to edit the quiz 1', () => {
            browser.assert.url({pathname: '/quizzes/1/edit'});
        });
    });

});

describe('Test que compruebe el funcionamiento de un controlador', () => {
    chai.use(chaiHttp);

    describe('DELETE /quizzes/:id', () => {
        it('should delete quiz added in testing (´Capital of Peru´)', (done) => {
            dbLength().then( (count) => {
                // console.log('dbLength() ', count);
                chai.request(app)
                    .delete(`/quizzes/${count}`)
                    .end( (err, res) => {
                        expect(res).to.have.status(200);
                    done();
                });
            })
            
        });
    });
});

describe('Test que compruebe el funcionamiento de un acceso a la BD', () => {

});