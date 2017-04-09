var axios = require("axios");

const SYMPHONY_API_URL = "https://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js";

module.exports = {
    getSymphonyData : function() {
        var requestUrl = SYMPHONY_API_URL;

        return axios.get(requestUrl).then(function(response) {
            if (response.data.cod && response.data.message) {
                throw new Error (response.data.message);
            } else {
                return response.data;
            }
        }, function(response) {
            throw new Error (response.data.message);
        })
    }
}
