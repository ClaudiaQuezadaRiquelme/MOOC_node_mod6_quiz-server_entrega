const Browser = require('zombie');

describe('Un test que compruebe la funcionalidad de una vista mostrada al usuario', () => {

});

describe('Un test que compruebe el funcionamiento de un formulario', () => {

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

describe('Un test que compruebe el funcionamiento de un controlador', () => {

});

describe('Un test que compruebe el funcionamiento de un acceso a la BD', () => {

});