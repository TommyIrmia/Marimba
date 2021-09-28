export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    getTime
}

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function getTime ( date ) {

    const time = new Date(date)

    const createdAt = time.getDate() + '/' + (time.getMonth()+1) + '/' + time.getFullYear()

    var seconds = Math.floor(( new Date() - date ) / 1000 );

    var interval = Math.floor( seconds / 31536000 );

    if ( interval >= 1 ) {

        return createdAt
    }
    

    interval = Math.floor( seconds / 2592000 );
    if ( interval === 1 ) {

        return interval + " month ago";
    }
    if ( interval > 1 ) {

        return createdAt
    }

    interval = Math.floor( seconds / 86400 );
    if ( interval === 1 ) {

        return interval + " day ago";
    }
    if ( interval > 1 ) {

        return interval + " days ago";
    }

    interval = Math.floor( seconds / 3600 );
    if ( interval === 1 ) {

        return interval + " hour ago";
    }
    if ( interval > 1 ) {

        return interval + " hours ago";
    }

    interval = Math.floor( seconds / 60 );
    if ( interval === 1 ) {

        return interval + " minute ago";
    }
    if ( interval > 1 ) {

        return interval + " minutes ago";
    }

    return 'just now';
}

