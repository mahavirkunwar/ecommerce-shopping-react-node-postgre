export function shortenString(string = "", max) {
    if (string.length > max) {
        string = string.slice(0, max).split(' ').slice(0, -1).join(' ');
        string = string + "...";
    }
    return string;
}

export function getLocalUserId() {
    return localStorage.getItem('userId');
}