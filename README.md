# sameGuys

Birds of the same feather flock together.

### Installation

```sh
$ cd sameGuys
$ npm i
```

### Run the app
Go to project folder and type:

```sh
$ cd sameGuys
$ npm start
```

Check same people:

- The endpoint is exposed at `people-like-you`
- Each of the terms in the query parameters is optional
- the endpoint returns a JSON response with an array of scored suggested matches
    - the suggestions are sorted by descending score
    - each suggestion has a score between 0 and 1 indicating confidence in the suggestion (1 is most confident)

```sh
$ curl -X GET \
    'http://localhost:3000/people-like-you?age=21&latitude=49.8683919&longitude=1.1433823&monthlyIncome=7996&experienced=false&limit=1'
```

Optional parameters:
- name - name of the person
- age - age of the person
- latitude - the latitude point
- longitude - the longitude point
- monthlyIncome - monthly income
- experienced - if experienced
- limit - result limit
- accuracy - score decimal point accuracy

### Tests
Run the tests:
```sh
$ npm test
```
