class Results {
    getPeopleDetails(data, accuracy) {
        const {name, age, experienced, score} = data;
        const monthlyIncome = data['monthly income'];
        let {latitude, longitude} = data;

        latitude = parseFloat(latitude);
        longitude = parseFloat(longitude);

        const people = {
            name,
            age,
            latitude,
            longitude,
            monthlyIncome,
            experienced,
            score
        };

        // Check if score matters
        if (isNaN(score)) {
            delete people.score;
        }

        // Check if accuracy is needed for the scores
        if (!isNaN(accuracy)) {
            people.score = Number(people.score.toFixed(Math.abs(accuracy)));
        }

        return people;
    }

    // Encode error with status code
    EncodeError(errorMessage, statusCode) {
        return {
            success: false,
            status: statusCode,
            error: errorMessage
        };
    }

    // Encode success list with status code
    EncodeSuccessPeopleList(results, accuracy, statusCode) {
        const peopleLikeYou = results.map(data => this.getPeopleDetails(data, accuracy));
        return {
            status: statusCode,
            peopleLikeYou
        };
    }
}

module.exports = Results;
