import { storageService } from './async-storage.service.js'

export const stationService = {
    query,
    getGenres
}

const STORAGE_KEY = 'station'
const genres = ['Funk', 'Happy']
const initialStations = [
    {
        "_id": "5c09",
        "name": "Reggae is fun",
        "tags": [
            "Funk",
            "Happy"
        ],
        "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
        "createdAt": 1541652422,
        "createdBy": {
            "_id": "u101",
            "fullname": "Puki Ben David",
            "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg"
        },
        "likedByUsers": [{
            '_id': 'xdasd',
            'firstname': 'asd',
            'lastname': 'sdsa',
            'imgUrl': 'asdasd.co.il'
        }, {
            '_id': 'xdasd',
            'firstname': 'asd',
            'lastname': 'sdsa',
            'imgUrl': 'asdasd.co.il'
        }, {
            '_id': 'xdasd',
            'firstname': 'asd',
            'lastname': 'sdsa',
            'imgUrl': 'asdasd.co.il'
        }, {
            '_id': 'xdasd',
            'firstname': 'asd',
            'lastname': 'sdsa',
            'imgUrl': 'asdasd.co.il'
        }
        ],
        "songs": [
            {
                "_id": "s1001",
                "title": "Is This Love",
                "trackId": "CHekNnySAfM",
                "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
                "tags": [
                    "Funk",
                    "Happy"
                ],
                "artist": "Bob Marley"

            },
            {
                "_id": "mUkfiLjooxs",
                "title": "Rise Up",
                "trackId": "HHk_4cur2nw",
                "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                "tags": [
                    "Funk",
                    "Happy"
                ],
                "artist": "Tomorrow People"
            },
            {
                "_id": "mUkfiLjooxs",
                "title": "Three Little Birds",
                "trackId": "CuNJ5j2fybo",
                "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                "tags": [
                    "Funk",
                    "Happy"
                ],
                "artist": "Bob Marley"
            },


        ]
    },
    {
        "_id": "5c0915",
        "name": "Reggae for us",
        "tags": [
            "Happy",
            "Funk"
        ],
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "createdAt": 1541652422,
        "createdBy": {
            "_id": "u101",
            "fullname": "Puki Ben David",
            "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg"
        },
        "likedByUsers": [{
            '_id': 'xdasd',
            'firstname': 'asd',
            'lastname': 'sdsa',
            'imgUrl': 'asdasd.co.il'
        }, {
            '_id': 'xdasd',
            'firstname': 'asd',
            'lastname': 'sdsa',
            'imgUrl': 'asdasd.co.il'
        }, {
            '_id': 'xdasd',
            'firstname': 'asd',
            'lastname': 'sdsa',
            'imgUrl': 'asdasd.co.il'
        }, {
            '_id': 'xdasd',
            'firstname': 'asd',
            'lastname': 'sdsa',
            'imgUrl': 'asdasd.co.il'
        }
        ],
        "songs": [
            {
                "_id": "s1001",
                "title": "Is This Love",
                "trackId": "CHekNnySAfM",
                "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
                "tags": [
                    "Funk",
                    "Happy"
                ],
                "artist": "Bob Marley"

            },
            {
                "_id": "mUkfiLjooxs",
                "title": "Rise Up",
                "trackId": "HHk_4cur2nw",
                "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                "tags": [
                    "Funk",
                    "Happy"
                ],
                "artist": "Tomorrow People"
            },
            {
                "_id": "mUkfiLjooxs",
                "title": "Three Little Birds",
                "trackId": "CuNJ5j2fybo",
                "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                "tags": [
                    "Funk",
                    "Happy"
                ],
                "artist": "Bob Marley"
            },


        ]
    },
    {
        "_id": "5c0914",
        "name": "Reggae for us",
        "tags": [
            "Happy",
            "Funk"
        ],
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "createdAt": 1541652422,
        "createdBy": {
            "_id": "u101",
            "fullname": "Puki Ben David",
            "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg"
        },
        "likedByUsers": [{
            '_id': 'xdasd',
            'firstname': 'asd',
            'lastname': 'sdsa',
            'imgUrl': 'asdasd.co.il'
        }, {
            '_id': 'xdasd',
            'firstname': 'asd',
            'lastname': 'sdsa',
            'imgUrl': 'asdasd.co.il'
        }, {
            '_id': 'xdasd',
            'firstname': 'asd',
            'lastname': 'sdsa',
            'imgUrl': 'asdasd.co.il'
        }, {
            '_id': 'xdasd',
            'firstname': 'asd',
            'lastname': 'sdsa',
            'imgUrl': 'asdasd.co.il'
        }
        ],
        "songs": [
            {
                "_id": "s1001",
                "title": "Is This Love",
                "trackId": "CHekNnySAfM",
                "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
                "tags": [
                    "Funk",
                    "Happy"
                ],
                "artist": "Bob Marley"

            },
            {
                "_id": "mUkfiLjooxs",
                "title": "Rise Up",
                "trackId": "HHk_4cur2nw",
                "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                "tags": [
                    "Funk",
                    "Happy"
                ],
                "artist": "Tomorrow People"
            },
            {
                "_id": "mUkfiLjooxs",
                "title": "Three Little Birds",
                "trackId": "CuNJ5j2fybo",
                "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                "tags": [
                    "Funk",
                    "Happy"
                ],
                "artist": "Bob Marley"
            },


        ]
    },
    {
        "_id": "5c0913",
        "name": "Reggae for us",
        "tags": [
            "Happy",
            "Funk"
        ],
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "createdAt": 1541652422,
        "createdBy": {
            "_id": "u101",
            "fullname": "Puki Ben David",
            "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg"
        },
        "likedByUsers": [{
            '_id': 'xdasd',
            'firstname': 'asd',
            'lastname': 'sdsa',
            'imgUrl': 'asdasd.co.il'
        }, {
            '_id': 'xdasd',
            'firstname': 'asd',
            'lastname': 'sdsa',
            'imgUrl': 'asdasd.co.il'
        }, {
            '_id': 'xdasd',
            'firstname': 'asd',
            'lastname': 'sdsa',
            'imgUrl': 'asdasd.co.il'
        }, {
            '_id': 'xdasd',
            'firstname': 'asd',
            'lastname': 'sdsa',
            'imgUrl': 'asdasd.co.il'
        }
        ],
        "songs": [
            {
                "_id": "s1001",
                "title": "Is This Love",
                "trackId": "CHekNnySAfM",
                "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
                "tags": [
                    "Funk",
                    "Happy"
                ],
                "artist": "Bob Marley"

            },
            {
                "_id": "mUkfiLjooxs",
                "title": "Rise Up",
                "trackId": "HHk_4cur2nw",
                "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                "tags": [
                    "Funk",
                    "Happy"
                ],
                "artist": "Tomorrow People"
            },
            {
                "_id": "mUkfiLjooxs",
                "title": "Three Little Birds",
                "trackId": "CuNJ5j2fybo",
                "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                "tags": [
                    "Funk",
                    "Happy"
                ],
                "artist": "Bob Marley"
            },


        ]
    },
    {
        "_id": "5c0912",
        "name": "Reggae for us",
        "tags": [
            "Happy",
            "Funk"
        ],
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "createdAt": 1541652422,
        "createdBy": {
            "_id": "u101",
            "fullname": "Puki Ben David",
            "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg"
        },
        "likedByUsers": [{
            '_id': 'xdasd',
            'firstname': 'asd',
            'lastname': 'sdsa',
            'imgUrl': 'asdasd.co.il'
        }, {
            '_id': 'xdasd',
            'firstname': 'asd',
            'lastname': 'sdsa',
            'imgUrl': 'asdasd.co.il'
        }, {
            '_id': 'xdasd',
            'firstname': 'asd',
            'lastname': 'sdsa',
            'imgUrl': 'asdasd.co.il'
        }, {
            '_id': 'xdasd',
            'firstname': 'asd',
            'lastname': 'sdsa',
            'imgUrl': 'asdasd.co.il'
        }
        ],
        "songs": [
            {
                "_id": "s1001",
                "title": "Is This Love",
                "trackId": "CHekNnySAfM",
                "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
                "tags": [
                    "Funk",
                    "Happy"
                ],
                "artist": "Bob Marley"

            },
            {
                "_id": "mUkfiLjooxs",
                "title": "Rise Up",
                "trackId": "HHk_4cur2nw",
                "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                "tags": [
                    "Funk",
                    "Happy"
                ],
                "artist": "Tomorrow People"
            },
            {
                "_id": "mUkfiLjooxs",
                "title": "Three Little Birds",
                "trackId": "CuNJ5j2fybo",
                "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                "tags": [
                    "Funk",
                    "Happy"
                ],
                "artist": "Bob Marley"
            },


        ]
    }
]

function query(byGenre) {
    const stations = initialStations.filter(station => station.tags.includes(byGenre))
    return stations
}

function getGenres() {
    return genres
}

function _saveStationsToStorage() {
    storageService.save(STORAGE_KEY, initialStations)
}