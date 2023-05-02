import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather?lang=fr';
const API_KEY = '1d6a82901a33d07d31555a75fb34d1b3';

export const fetchWeather = async (query) => {
    const { data } = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY,
        }
    });

    return data;
}
