import React, {useState, useEffect} from 'react'
import { CssBaseline, Grid} from '@material-ui/core'

import { getPlacesData, getWeather } from './api'
import Header from './Components/Header/Header'
import List from './Components/List/List'
import Map from './Components/Map/Map'


const App = () => {
    
    const [ places, setPlaces] = useState([])
    const [filterPlaces, setFilterPlaces] = useState([])
    const [coordinates , setCoordinates] = useState({})
    const [bounds, setBounds] = useState({})
    const [childClicked, setChildClicked] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState('restaurants')
    const [rating, setRating] = useState(0)
    const [weatherData, setWeatherData] = useState([])



    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude}}) => {
                setCoordinates({ lat: latitude, lng: longitude})
        })
    }, []) // get current location you're at 

    useEffect(() => {
        const filterPlaces = places.filter((place) => place.rating > rating)
        setFilterPlaces(filterPlaces)
    }, [rating])

    useEffect(() => {
        if(bounds.sw && bounds.ne){
            setIsLoading(true)
            
        getWeather(coordinates.lat, coordinates.lng)

        .then((data) => setWeatherData(data) )
        

        getPlacesData(type,  bounds.sw , bounds.ne )
            .then((data) => {
                console.log(data)
                setPlaces(data?.filter((place) => place.name && place.num_reviews > 0))
                setFilterPlaces([])
                setIsLoading(false)
                
            })
        }
    }, [type, bounds]);


    return (
        <div>
            <CssBaseline/>
            <Header setCoordinates={setCoordinates}/>
            <Grid container spacing={3} style={{ width: '100%',  display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
                   <Grid item xs={12} md={4}>  
                        <List  places={filterPlaces.length ? filterPlaces : places}
                            childClicked = {childClicked}
                            isLoading = {isLoading}
                            type={type}
                            setType={setType}
                            rating = {rating}
                            setRating = {setRating}
                        /> 
                   </Grid> 
                   <Grid item xs={12} md={8}>  
                        <Map  
                            setCoordinates = { setCoordinates }  
                            setBounds = { setBounds }
                            coordinates = {coordinates}
                            places={filterPlaces.length ? filterPlaces : places}
                            setChildClicked={setChildClicked}
                            weatherData = {weatherData}
                        /> 
                     
                   </Grid> 
            </Grid>

        </div>
    )
}

export default App