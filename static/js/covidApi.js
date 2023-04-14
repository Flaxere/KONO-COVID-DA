let summary;
let worldAllTimeCases;
let countryAllTimeCases;
let worldDaysCases;
let countryDaysCases;

const covidApi = {
    getSummary: async () => {
        if (summary) {
            return summary
        }
        summary = await fetchRequest(covidApiEndPoints.summary())
        return summary;
    },
    getWorldAllTimeCases: async () => {
        if (worldAllTimeCases) {
            return worldAllTimeCases;
        }
        worldAllTimeCases = await fetchRequest(covidApiEndPoints.worldAllTimeCases());
        return worldAllTimeCases;
    },
    getCountryAllTimeCases: async (country, status) => {
        if (countryAllTimeCases) {
            return countryAllTimeCases;
        }
        countryAllTimeCases = await fetchRequest(covidApiEndPoints.countryAllTimeCases(country, status));
        return countryAllTimeCases;
    },
    getWorldDaysCases: async () => {
        if (worldDaysCases) {
            return worldDaysCases;
        }
        worldDaysCases = await fetchRequest(covidApiEndPoints.worldDaysCases());
        return worldDaysCases;
    },
    getCountryDaysCases: async (country, status) => {
        if (countryDaysCases) {
            return countryDaysCases;
        }
        countryDaysCases = await fetchRequest(covidApiEndPoints.countryDaysCases(country, status));
        return countryDaysCases;
    }
}

const covid_api_base = 'https://api.covid19api.com/'

const covidApiEndPoints = {
    summary: () => {
        return getApiPath('summary')
    },
    worldAllTimeCases: () => {
        return getApiPath('world')
    },
    countryAllTimeCases: (country, status) => {
        let end_point = `dayone/country/${country}/status/${status}`
        return getApiPath(end_point)
    },
    countryDaysCases: (country, status) => {
        let date = getDaysRange(30)

        let end_point = `country/${country}/status/${status}?from=${date.start_date}&to=${date.end_date}`

        return getApiPath(end_point)
    },
    worldDaysCases: () => {
        let date = getDaysRange(30)

        let end_point = `world?from=${date.start_date}&to=${date.end_date}`

        return getApiPath(end_point)
    }
}


getDaysRange = (days) => {
    let d = new Date()

    let from_d = new Date(d.getTime() - (days * 24 * 60 * 60 * 1000))

    let to_date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`

    let from_date = `${from_d.getFullYear()}-${from_d.getMonth() + 1}-${from_d.getDate()}`

    return {
        start_date: from_date,
        end_date: to_date
    }
}

getApiPath = (end_point) => {
    return covid_api_base + end_point
}