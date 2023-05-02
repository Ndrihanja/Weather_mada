// import axios from "axios";
import React, { Component } from "react";
import {fetchWeather} from '../service/fetchWeather';

// const [weatherTana , setWeatherTana] = useState({});
const villes = ['Antsiranana','Mahajanga','Toamasina','Antananarivo','Fianarantsoa','Toliara'];
var villesMeteo = [];

class Meteo extends Component{
    constructor(props){
        super(props);
        this.state = {
            weatherAntsiranana : [],
            weatherMahajanga : [],
            weatherToamasina : [],
            weatherTana : [],
            weatherFianara : [],
            weatherToliara : [],
            loadingWeather : true
        };
    }

    ville = ['Antsiranana','Mahajanga','Toamasina','Antananarivo','Fianarantsoa','Toliara'];
    villeWeather = [];

    async search(query){
        console.log(await fetchWeather(query));
    }

    async componentDidMount(){
        this.getMeteo();
        console.log(villesMeteo);
    }

    async getMeteo(){
        villesMeteo = [];
       
        villesMeteo[0] = new Object(await fetchWeather(villes[0]));
        villesMeteo[1] = new Object(await fetchWeather(villes[1]));
        villesMeteo[2] = new Object(await fetchWeather(villes[2]));
        villesMeteo[3] = new Object(await fetchWeather(villes[3]));
        villesMeteo[4] = new Object(await fetchWeather(villes[4]));
        villesMeteo[5] = new Object(await fetchWeather(villes[5]));

        this.setState({loadingWeather:false});

        console.log(villesMeteo);
    }

    

    render()
    {
        var meteo_HTML = "";
        if(this.state.loadingWeather){
            meteo_HTML = <><span className="spinner-grow" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </span>
                            <span className="ms-3 spinner-grow" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </span>
                            <span className="ms-3 spinner-grow" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </span>
                            </>
        } else {
            meteo_HTML = villesMeteo.map( (item) => {
                return (
                    // <div>OK {item.name}</div>
                    <div className="col-sm-4">
                        <div className="card">
                            {/* <div className="card-header">
                                <div className="card-title">{item.name}</div>
                            </div> */}
                            <div className="card-body text-center">
                                <h2 className="city-name">
                                    <span>{item.name}</span>
                                    {/* <sup>{item.sys.country}</sup> */}
                                </h2>
                                <div className="city-temp">
                                    {Math.round(item.main.temp)}
                                    <sup>&deg;C</sup>
                                </div>
                                <div className="info">
                                    <img className="city-icon" src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description} />
                                    <p>{item.weather[0].description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            } );
        }
        return(
            <>
                <div className="container">
                    <div className="row" style={{width:'1250px'}}>
                        {meteo_HTML}
                    </div>
                </div>
                {/* {meteo_HTML} */}
            </>
        );
    }
}

export default Meteo;