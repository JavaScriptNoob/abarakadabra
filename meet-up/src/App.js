    import React from "react";
    import Titles from "./components/titles";
    import Forms from "./components/forms";
    import Weather from "./components/weather";
    import firebase from "firebase";
    import EventCards from "./components/eventcards";
    import { DB_CONFIG } from "./components/config";
    // console.log = function() {};
    let lat;
    let long;
    let geohashValue;
    let helsingborgDataDb;
    let eventsData;
    let helsingborgSnapshot;
    

    console.clear();

    navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    });

    var geohash = require("ngeohash");
    setTimeout(function(params) {
    geohashValue = geohash.encode(lat, long);
    console.log(geohashValue,1)
    }, 5000);

    var selfreference;

    class App extends React.Component {
        
       
    state = {
        data: [" "],
        place: ' ',
        country: ' ',
        mode: "view",
        numbersOfItems:100,
        itemsToShow: 3,
        expanded: false,
        city: ' ',
        parsedData:' '
    };
    
    pushEvents = async () => {
        console.log('loop');
        // e.preventDefault();
        if (!firebase.apps.length) {
            firebase.initializeApp(DB_CONFIG);
         console.log('object')}
        const ref = firebase.database().ref("greatApp");
        
        const apiCallHelsignborg = await fetch(
        "https://api.helsingborg.se/event/json/wp/v2/event/?_embed&per_page=100"
        );

        const events = firebase.database().ref("events");
        const dataHbg = await apiCallHelsignborg.json();
        
        console.log(
            dataHbg
        );
        ref.child('helsingborg').on('value',function (snapshot){
            helsingborgSnapshot = snapshot.val();
               });
        if(helsingborgSnapshot === dataHbg  ){ref.child('helsinborg').set(dataHbg,console.log);}
        
        ref.child("helsinborg").on("value", function(snapshot) {
        helsingborgDataDb = snapshot.val();
        console.log('click555');
        console.log(helsingborgDataDb[0], "aaaaaaaaaaaa");
        helsingborgDataDb.forEach((element, item, index) => {
            
            if (
            helsingborgDataDb[item]._embedded.location &&
            helsingborgDataDb[item]._embedded.location[0].country &&
            helsingborgDataDb[item]._embedded.location[0].country &&
            helsingborgDataDb[item].content.rendered &&
            helsingborgDataDb[item].featured_media
            ) {
            events
                .child('hbg').child(item)
                .set({
                city: helsingborgDataDb[item]._embedded.location[0].city,
                country: helsingborgDataDb[item]._embedded.location[0].country,
                description: helsingborgDataDb[item].content.plain_text,
                title: helsingborgDataDb[item].title.plain_text,
                id: helsingborgDataDb[item].id,
                image: helsingborgDataDb[item].featured_media.source_url
                });
            } else if (
            helsingborgDataDb[item]._embedded.location &&
            !helsingborgDataDb[item]._embedded.location[0].country &&
            helsingborgDataDb[item].featured_media
            ) {
            events
            .child('hbg').child(item)
                .set({
                city: 'helsingborgDataDb[item]._embedded.location[0].city',
                country: "emptyValue",
                description: helsingborgDataDb[item].content.plain_text,
                title: helsingborgDataDb[item].title.plain_text,
                id: helsingborgDataDb[item].id,
                image: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
                });
            } else {
            events
                .child('hbg').child(item)
                .set({
                city: "emptyCity",
                country: "emptyCountry",
                description: "empty",
                id: "empty",
                image: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
                });
            }
           
        });
        
        
        return helsingborgDataDb;
        });
          events.child('hbg').limitToFirst(this.state.numbersOfItems).on("value", function(snapshot) {
            eventsData = snapshot.val();
            
        });
        selfreference = this;
        console.log("[+] Save self-reference");

        setTimeout(function(e) {
        console.log("[~] Setting up state");

        if (!helsingborgDataDb) {
            console.log("[-] Empty DB reply!");
            return;
        }
        
         
        selfreference.setState({
            data: eventsData,
            place: helsingborgDataDb[5]["location"]["city"],
            country: helsingborgDataDb[5]["location"]["country"]
        });
        }, 4000);
       
        
       
    }
    
   getEvents = async (e) => {
        e.preventDefault();
       this.setState({city:e.target.elements.city.value.toLowerCase()}) 
        console.log('click',);
        // let firebasedb = firebase.initializeApp(DB_CONFIG);
        console.log('click111', );
        const ref = firebase.database().ref("greatApp");
        console.log('click222');
       
        console.log('click333');
        let callFunction = () => {
        this.setState({ mode: "edit" });
        };
        callFunction();
        if(this.state.city > 1  ){
            console.log('if this.state.city > 1');
        const filteredData = this.state.data.filter((i,n)=> { 
            console.log('if this.state.city > 3');  
             let cityLowerCase = i.city.toLowerCase() ;
             console.log(cityLowerCase,'oioioi');
             return cityLowerCase
             
        });
        
        console.log(filteredData,'Its filtered')
        }
        
    };
    componentDidMount(){
        this.pushEvents();
    }
    
     getMoreEvents = (e)=>{
        e.preventDefault();
        
        this.state.itemsToShow < this.state.numbersOfItems ? ( 
            this.setState({itemsToShow: this.state.itemsToShow += 6, expanded: true})
        ) : (
            this.setState ({itemsToShow: 3, expanded : false})
        )
        console.log(this.state.itemsToShow,'item', this.state.data,88888);
    }
    
    render() {
        console.log("[~] Start render...", this.state.city);
        
        if (this.state.mode === "view") {
        return (
            <div >
            <Titles  /> 
            <Forms  getEvents={this.getEvents} />
            <Weather />
            <p> </p>
            <h1>YA VIJU</h1>
            <EventCards />
            </div>
        );
        } else if (this.state.mode === "edit" && this.state.city <1 ) {
        return (
            <div>
            <Titles />
            <Forms  getEvents={this.getEvents} />
            <Weather />
            <p> </p>
            <h1>YA VIJU</h1>
            <EventCards />
             
                    
            <div className="eventcards container-fluid">
            
            <ul className="row d-flex">
                {this.state.data.slice(0,this.state.itemsToShow).map((key,i) => (
                <li key={i} className="col-md-3">
                    <h4>{key.title}</h4>
                    <span>{'id: ' + key.id}</span>
                    <div className="image-event-container"> <img src={key.image} alt=""/> </div>
                    <p>{'Location ' + key.city + ',  ' + key.country}</p>
                    <p className="shorter">{key.description}</p>
                    
                </li>
                ))}
            </ul>
            
            
            </div>
            <div><a className="btn btn-primary" onClick={this.getMoreEvents} href="#">
                {this.state.numbersOfItems <= this.state.itemsToShow ? (
                    <span>Show less</span>
                ) : (
                    <span>Show more</span>
                )}
                </a></div>
            </div>
        );
        }else{
            return  <div>
            <Titles />
            <Forms  getEvents={this.getEvents} />
            <Weather />
            <p> </p>
            <h1>GoodNeews</h1>
            <EventCards />
            </div>    
    }
        
    }
    }

    export default App;
