import axios from 'axios'


export const getPlacesData = async (type, sw, ne) => {
    try {
       const { data: {data} } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng
        },
        headers: {
          'x-rapidapi-key': 'c2fa5f0443mshb32eb0a9653560cp14e71cjsn54a5010e5cdc',
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
          
        }
       })

       return data
    } catch(error){
        console.log(error)
    }
}

export const getWeather = async (lat , lng) => {
    try{
          const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/weather', {
            params: {
              lat: lat,
              lon: lng,
            },
            headers: {
              'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
              'x-rapidapi-key': 'process.env.REACT_APP_RAPID_WEATHER_KEY'
            }
          }) 

          return data
    }catch(err){
      console.log(err)
    }
}
