import React, {useState, useEffect} from 'react'
import { CssBaseline, Grid} from '@material-ui/core'

import { getPlacesData } from './api'
import Header from './Components/Header/Header'
import List from './Components/List/List'
import Map from './Components/Map/Map'


const App = () => {
    
    const [ places, setPlaces] = useState([])
    const [coordinates , setCoordinates] = useState({})
    const [bounds, setBounds] = useState({})
    const [childClicked, setChildClicked] = useState(null)
    const [isLoading, setIsLoading] = useState(false)



    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude}}) => {
                setCoordinates({ lat: latitude, lng: longitude})
        })
    }, []) // get current location you're at 



    useEffect(() => {
        setIsLoading(true)
        getPlacesData( bounds.sw , bounds.ne )
            .then((data) => {
                setPlaces(data)
                setIsLoading(false)
                
            })
    }, [coordinates, bounds]);


    return (
        <div>
            <CssBaseline/>
            <Header/>
            <Grid container spacing={3} style={{ width: '100%',  display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
                   <Grid item xs={12} md={4}>  
                        <List  places={places}
                            childClicked = {childClicked}
                            isLoading = {isLoading}
                        /> 
                   </Grid> 
                   <Grid item xs={12} md={8}>  
                        <Map  
                            setCoordinates = { setCoordinates }  
                            setBounds = { setBounds }
                            coordinates = {coordinates}
                            places={places}
                            setChildClicked={setChildClicked}
                        /> 
                     
                   </Grid> 
            </Grid>

        </div>
    )
}

export default App