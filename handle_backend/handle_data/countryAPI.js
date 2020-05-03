const countryList = require('country-list');

module.exports = {

    getCountriesNameCodes: () => {return countryList.getCodes()},

    getCountriesNameList: () =>{return countryList.getNames()},

    getCountryNameByCode: (code) =>{return countryList.getName(code)},

    getCountryCodeByName: (name) =>{return countryList.getCode(name)}

};