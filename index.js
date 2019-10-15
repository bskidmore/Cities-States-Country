var countries = require('./countries.json').countries;
var states = require('./states.json').states;
var cities = require('./cities.json').cities;
var alasql = require("alasql");

module.exports = {

	getAllCountries: function() {
        return countries;
    },

	getAllStates: function() {
        return states;
    },

	getAllStatesFromCountry: function(countryName) {
        let stateCountryJoinQuery = 'SELECT state.* FROM ? as state WHERE state.country_id=(VALUE OF SELECT * FROM ? AS country WHERE country.name="'+countryName+'")';
        let cityStateJoinList = alasql(cityStateJoinQuery, [cityList, states]);
        return states;
    },

    getAllCitiesFromState: function(stateName) {
        return cities;
    },

    searchCity: function(searchTextCity) {
        let searchCityQuery = 'SELECT * FROM ? as city WHERE name LIKE "'+searchTextCity+'%"';
        let cityList = alasql(searchCityQuery, [cities]);

        let cityStateJoinQuery = 'SELECT city.id as cityId, city.name as cityName, city.state_id, state.name as stateName, state.country_id FROM ? as city JOIN ? as state ON city.state_id=state.id';
        let cityStateJoinList = alasql(cityStateJoinQuery, [cityList, states]);

        let cityStateCountryJoinQuery = 'SELECT state.*, country.name as countryName, country.sortname as countryShortName, country.phoneCode as phoneCode FROM ? as state JOIN ? as country ON state.country_id=country.id';
        let cityStateCountryJoinList = alasql(cityStateCountryJoinQuery, [cityStateJoinList, countries]);
        return cityStateCountryJoinList;
    }
}