
const citiesCards = $(".citiesCards")

class Renderer {

    constructor() {

    }
    renderData = function (cities) {
        citiesCards.empty()
        const source = $('#city-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template({cities});
        citiesCards.append(newHTML);
    }
}