const axios = require('axios').default;

async function getImageLink(driverName){
    safeName = encodeURI(driverName.replace(/[,\s]/g,''));
    const queryUrl = `http://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${safeName}&pithumbsize=1000&format=json`;
    let response = await axios.get(queryUrl);
    return response;
}

module.exports = {
    getImageLink
}
