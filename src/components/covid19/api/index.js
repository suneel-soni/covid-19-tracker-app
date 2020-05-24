import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async country => {
  let changeableUrl = url;
  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    throw new Error("Failed to load data.");
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios(`${url}/daily`);
    const modifiedData = data.map(dailyData => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      data: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (error) {
    throw new Error("Failed to load data.");
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    return countries.map(country => country.name);
  } catch (error) {
    throw new Error("Failed to load data.");
  }
};
