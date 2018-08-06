const Heap = require('qheap');
const data = require('./data.json');

class People {
    constructor(people = data) {
        console.log("Loading data...");
        this.people = people;
        this.peopleSorted = [];
        console.log("Done");
    }

    calculateScores(target) {
        const {name, experienced} = target;
        let {age, latitude, longitude} = target;
        let monthlyIncome = target['monthlyIncome'];

        age = parseFloat(age);
        latitude = parseFloat(latitude);
        longitude = parseFloat(longitude);
        monthlyIncome = parseFloat(monthlyIncome);

        this.people.map(item => {
            let score = {};
            score.total = 0;

            // Get the scores
            score = this.getScore('name', name, item, score);
            score = this.getScore('age', age, item, score);
            score = this.getScore('latitude', latitude, item, score);
            score = this.getScore('longitude', longitude, item, score);
            score = this.getScore('monthlyIncome', monthlyIncome, item, score);
            score = this.getScore('experienced', experienced, item, score);

            item.scoreDetailed = Math.sqrt(score.total);
        });
    }

    getNearest(target = {}, limit = 10) {
        this.limit = limit;
        this.peopleSorted = [];

        // Calculate the scores
        this.calculateScores(target);

        // Sort the scores
        this.sortByScores();

        // Show the results
        return this.peopleSorted;
    }

    getScore(key, val, item, score) {
        // Check if key is name
        if (key === 'name') {
            if (val !== undefined) {
                // Create a substitute value
                let ItemNameValue = 0;
                let TargetNameValue = 0;

                if (val.trim() === item[key]) {
                    TargetNameValue = 0;
                } else if (val.trim().toLowerCase() === item[key].toLowerCase()) {
                    TargetNameValue = 1;
                } else if (val.trim() !== item[key]) {
                    TargetNameValue = 2;
                }

                score[key] = Math.pow((TargetNameValue - ItemNameValue), 2);
                score.total += score[key];
            }

            return score;
        }

        // Check if key is experienced
        if (key === 'experienced') {
            if (val !== undefined) {
                // Create a substitute value
                let ItemExpValue = 0;
                let TargetExpValue = 0;

                if (val.toLowerCase() === 'true') {
                    TargetExpValue = 1;
                }
                if (item[key]) {
                    ItemExpValue = 1;
                }

                score[key] = Math.pow((TargetExpValue - ItemExpValue), 2);
                score.total += score[key];
            }

            return score;
        }

        // Do the normal check
        if (val !== undefined) {
            score[key] = Math.pow((val - item[key]), 2);

            // Add only if valid
            if (!isNaN(score[key])) {
                score.total += score[key];
            }
        }

        return score;
    }

    sortByScores() {
        let heap = new Heap({
            compar: (a, b) => {
                return a.scoreDetailed < b.scoreDetailed ? 1 : -1
            }
        });

        // Populate the heap
        Array.from(this.people, item => heap.insert(item));

        // Get the highest value
        const heapHighest = heap.peek();

        // Get the total length
        const heapLength = heap.length;

        // Create temp holder
        const tmpPeople = [];

        for (let i = 0; i < heapLength; i++) {
            const {scoreDetailed, ...item} = heap.pop();

            item.score = scoreDetailed;
            if (scoreDetailed !== 1) {
                item.score = 1 - scoreDetailed / heapHighest.scoreDetailed;
            }

            // Check if score is too low to add
            if (Math.round(item.score) > 0) {
                tmpPeople.push(item);
            }
        }

        // Reverse the results
        for (let i = tmpPeople.length; i > 0; i--) {
            // Check if undefined
            if (tmpPeople[i] === undefined) {
                continue;
            }
            if (this.peopleSorted.length >= this.limit) {
                break;
            }

            this.peopleSorted.push(tmpPeople[i]);
        }
    }
}

module.exports = People;
