const models = require('../models/');
const utils = require('../utils/');

const PeopleModel = models.People;
const UtilResults = new utils.Results();

class People {
    constructor() {
        this.PeopleModel = new PeopleModel();
    }

    // List users
    async List(req) {
        const {limit, accuracy} = req.query;
        let result;

        // Try listing all data
        try {
            result = await this.PeopleModel.getNearest(req.query, limit);
        } catch (err) {
            // Error occured
            return UtilResults.EncodeError(err.message, 404);
        }

        // Return the results
        return UtilResults.EncodeSuccessPeopleList(result, accuracy, 200);
    }
}

module.exports = People;
