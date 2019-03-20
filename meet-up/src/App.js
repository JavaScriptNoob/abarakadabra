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
        numbersOfItems:11
    };
    
    pushEvents = async () => {
        // e.preventDefault();
        this.App = firebase.initializeApp(DB_CONFIG);
        const ref = firebase.database().ref("greatApp");
        
        const apiCallHelsignborg = await fetch(
        "https://api.helsingborg.se/event/json/wp/v2/event/?_embed&per_page=100"
        );

        
        const dataHbg = await apiCallHelsignborg.json();
        
        console.log(
            dataHbg
        );
        ref.child('helsingborg').on('value',function (snapshot){
            helsingborgSnapshot = snapshot.val();
               });
        if(helsingborgSnapshot === dataHbg  ){ref.child('helsinborg').set(dataHbg,console.log);}
        
        
       
        
       
    }
    
    getEvents = async e => {
        e.preventDefault();
        console.log('click');
        // let firebasedb = firebase.initializeApp(DB_CONFIG);
        console.log('click111');
        const ref = firebase.database().ref("greatApp");
        console.log('click222');
        const events = firebase.database().ref("events");
        console.log('click333');
        let callFunction = () => {
        this.setState({ mode: "edit" });
        };
        callFunction();
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
                img: helsingborgDataDb[item].featured_media.source_url
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
                
                });
            } else {
            events
                .child('hbg').child(item)
                .set({
                city: "emptyCity",
                country: "emptyCountry",
                description: "empty",
                id: "empty",
                image: "empty"
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
        console.log(selfreference);
        // 
        selfreference.setState({
            data: eventsData,
            place: helsingborgDataDb[5]["location"]["city"],
            country: helsingborgDataDb[5]["location"]["country"]
        });
        }, 4000);
    };
     getMoreEvents = (e)=>{
        e.preventDefault();
        
        console.log(88888);
        this.setState({
            numbersOfItems: 15
        }, ()=> console.log(this.state.numbersOfItems))
         
    }
    
    render() {
        console.log("[~] Start render...", this.state.data);
        this.pushEvents();
        if (this.state.mode === "view") {
        return (
            <div>
            <Titles />
            <Forms  getEvents={this.getEvents} />
            <Weather />
            <p> </p>
            <h1>YA VIJU</h1>
            <EventCards />
            </div>
        );
        } else {
        return (
            <div>
            <Titles />
            <Forms  getEvents={this.getEvents} />
            <Weather />
            <p> </p>
            <h1>YA VIJU</h1>
            <EventCards />
             
                    
            <div className="eventcards container-fluid">
            
            <ul className="row">
                {this.state.data.map((key,i) => (
                <li key={i} className="col-md-3">
                    <h4>{key.title}</h4>
                    <span>{'id: ' + key.id}</span>
                    <div className="image-event-container"> <img src={key.img} alt=""/> </div>
                    <p>{'Location ' + key.city + ',  ' + key.country}</p>
                    <p className="shorter">{key.description}</p>
                    
                </li>
                ))}
            </ul>
            <button className="moreItems" onClick={this.getMoreEvents}>Get More Events</button>
            </div>
            </div>
        );
        }
    }
    }

    export default App;
