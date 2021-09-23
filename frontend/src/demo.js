// Guidlines:
// *. no need for song store, it is part of the station

var playlist = {
  "_id": "5c09",
  "name": "Funky Monks",
  "tags": [
    "Funk",
    "Happy"
  ],
  "createdAt": 1541652422,
  "createdBy": {
    "_id": "u101",
    "fullname": "Puki Ben David",
    "imgUrl": "http://some-photo/"
  },
  "likedByUsers": [{
    '_id': 'xdasd',
    'firstname': 'asd',
    'lastname': 'sdsa',
    'imgUrl': 'asdasd.co.il'
  },
    '{minimal-user}'
  ],
  "songs": ['s1001', 'mUkfiLjooxs']
}

var songs = [
  {
    "_id": "s1001",
    "title": "The Meters - Cissy Strut",
    "url": "youtube/song.mp4",
    "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
    "tags": [
      "Funk",
      "Happy"
    ],
    "artist": "Artist name"

  },
  {
    "_id": "mUkfiLjooxs",
    "title": "The JB's - Pass The Peas",
    "url": "youtube/song.mp4",
    "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
    "tags": [
      "Funk",
      "Happy"
    ],
    "artist" : "Artist name"
  },


]

const user = {
  "_id": "xxxxxxx",
  "fullname": "woohoooh",
  "password": "1234",
  "email": "1341234@gmasil.com",
  "createdPlaylists": ['5c09', '423423', 'asd23'],
  "favoritePlaylists": ['sdaasd', 'asdasdasd', 'asdgs'],
  "imgUrl": "http://some-img.jpg",
}
