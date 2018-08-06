const server = require('../../src/server');

describe('People API', () => {

    describe('GET /people-like-you', () => {
        it('should deliver a blank list if nothing was specified', async () => {
            let res, error;
            try {
                res = await chai.request(server)
                    .get('/people-like-you');
            } catch (err) {
                error = err;
            }

            expect(error).not.to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body.peopleLikeYou).to.be.a('array');
            expect(res.body.peopleLikeYou.length).to.equal(0);
        });

        it('should limit default list', async () => {
            let res, error;
            try {
                res = await chai.request(server)
                    .get('/people-like-you?age=35&limit=2');
            } catch (err) {
                error = err;
            }

            expect(error).not.to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body.peopleLikeYou).to.be.a('array');
            expect(res.body.peopleLikeYou.length).to.equal(2);

            res.body.peopleLikeYou.forEach(item => expect(item.name).to.be.a('string'));
        });

        it('should show score of 1 if perfect match found', async () => {
            let res, error;
            try {
                res = await chai.request(server)
                    .get('/people-like-you?name=Oralee&age=21&latitude=49.8683919&longitude=1.1433823&monthlyIncome=7996&experienced=false&limit=1');
            } catch (err) {
                error = err;
            }

            expect(error).not.to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body.peopleLikeYou).to.be.a('array');
            expect(res.body.peopleLikeYou.length).to.equal(1);

            res.body.peopleLikeYou.forEach(item => expect(item.score).to.exist);
            res.body.peopleLikeYou.forEach(item => expect(item.score).to.equal(1));
        });

        it('should show score of 1 if perfect match found', async () => {
            let res, error;
            try {
                res = await chai.request(server)
                    .get('/people-like-you?age=21&limit=3');
            } catch (err) {
                error = err;
            }

            expect(error).not.to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body.peopleLikeYou).to.be.a('array');
            expect(res.body.peopleLikeYou.length).to.equal(3);

            res.body.peopleLikeYou.forEach(item => expect(item.score).to.exist);
            res.body.peopleLikeYou.forEach(item => expect(item.score).to.equal(1));
        });

        it('should show an empty list', async () => {
            let res, error;
            try {
                res = await chai.request(server)
                    .get('/people-like-you?age=1000&limit=2');
            } catch (err) {
                error = err;
            }

            expect(error).not.to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body.peopleLikeYou).to.be.a('array');
        });

        it('should show a list', async () => {
            let res, error;
            try {
                res = await chai.request(server)
                    .get('/people-like-you?experienced=true&limit=2');
            } catch (err) {
                error = err;
            }

            expect(error).not.to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body.peopleLikeYou).to.be.a('array');
            expect(res.body.peopleLikeYou.length).to.equal(2);

            res.body.peopleLikeYou.forEach(item => expect(item.score).to.exist);
            res.body.peopleLikeYou.forEach(item => expect(item.score).to.equal(1));
        });
    });
});
