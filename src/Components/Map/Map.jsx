
import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Button, Paper, Typography, useMediaQuery } from '@material-ui/core'
import LocationOnOutlined from '@material-ui/icons/LocationOnOutlined'
import Rating from '@material-ui/lab'

import makeStyles  from './styles'
import PlaceDetails from '../PlaceDetails/PlaceDetails'

const Map = ( {setCoordinates, setBounds, coordinates, place} ) => {

   const classes = makeStyles()
   const isDesktop = useMediaQuery("(min-width: 600px)")



    return (
        <div className={classes.mapContainer}> 
            <GoogleMapReact
                bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter= { coordinates }
                center= {coordinates}
                defaultZoom= {14}
                margin= {[ 50, 50, 50, 50]}    
                options={""}
                onChange={ (event) => {
                   
                    setCoordinates({  lat: event.center.lat , lng: event.center.lng })
                    setBounds({ ne: event.marginBounds.ne, sw: event.marginBounds.sw })
                }}
                onChildClick={""}
            >
                {place?.map((place, i) => (
                    <div className={ classes.markerContainer}
                     lat={Number(place.lattitude)} 
                     lng={Number(place.longitude)}
                     key={i}
                     >
               
                {
                    !isDesktop ? (
                        <LocationOnOutlined color='primary' fontSize='large' />
                    )  : (
                        <Paper elevation={3} className={classes.paper}>
                            <Typography className={classes.typography} variant='subtitle2' gutterBottom>
                                {place.name}
                            </Typography>
                            <img
                                className={classes.pointer}
                                src = { place.photo ? place.photo.images.large.url : "http://www.resto.be/across/resources/static/site/images/placeholder-detail-resto.jpg"}
                                alt={place.name}
                            />
                        </Paper>
                    )
                }

                </div>
                ))} 
            </GoogleMapReact>
        
        </div>
    ) 
}

export default Map

