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
let eventBriteDataDb;
let ticketMasterDataDb;
let place;


console.clear()

navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
});

var geohash = require("ngeohash");
setTimeout(function(params) {
    geohashValue = geohash.encode(lat, long);
    // console.log(geohashValue,1)
}, 5000);

var selfreference;

class App extends React.Component {
    state = {
    data: undefined,
    place: undefined,
    country: undefined
    };

    pushEvents = async e => {
        e.preventDefault();
        this.App = firebase.initializeApp(DB_CONFIG);
        const ref = firebase.database().ref("greatApp");
        const apiKeyTicketMaster = "OCovzlLJGE2VUk2YuheH8Nm0b9YNAC6v";
        const apiEventBrite = "https://www.eventbriteapi.com/v3/events/search/?";
        const eventBriteAcessToken = "4VKAXBYN7RWY7C237LXP";
        const eventBriteApiCall =
        apiEventBrite +
            `sort_by=date&location.latitude=56.04673&location.longitude=12.69437&token=${eventBriteAcessToken}`;
        // const city = e.target.elements.city.value;
        // const country = e.target.elements.country.value;
        const apiCallHelsignborg = await fetch(
            "https://api.helsingborg.se/event/json/wp/v2/event/?_embed&per_page=100"
        );

    const apiCallTicketMaster = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?&geoPoint=${geohashValue}&apikey=${apiKeyTicketMaster}`
    );
    const apiCallEventBrite = await fetch(eventBriteApiCall);
    const dataHbg = await apiCallHelsignborg.json();
    const dataTM = await apiCallTicketMaster.json();
    const dataEB = await apiCallEventBrite.json();
    console.log(
        apiCallTicketMaster,
        dataTM,
        dataEB,
        apiCallEventBrite,
        dataHbg
    );
    
    ref.on("value", function(snapshot) {
        snapshot.val();
        console.log(snapshot, 9);
    });
    ref.child("ticketmaster").set(dataTM);
    ref.child("eventbrite").set(dataEB);
    ref.child("helsinborg").set(dataHbg);
    // data.forEach((element,index) => {
    //     console.log(data[index].location);
    // });
    // console.log(lat, 11111);
    // console.log(long,2222);
    };
    getEvents = async  e => {
        e.preventDefault();
        this.App = firebase.initializeApp(DB_CONFIG);
        const ref = firebase.database().ref("greatApp");

        ref.child("helsinborg").on("value", function(snapshot) {
            helsingborgDataDb = snapshot.val();
            for (var key in helsingborgDataDb[0]) {
                //console.log(key, ":", helsingborgDataDb[0][key]);
                if (key === "location") {
                    console.log("[+] Get DB reply!")
                }
            }
            //console.log(helsingborgDataDb[0]);

            return helsingborgDataDb;
        });


        selfreference  = this;
        console.log("[+] Save self-reference");

        setTimeout(function (e) {
            console.log("[~] Setting up state")

            if (!helsingborgDataDb) {
                console.log("[-] Empty DB reply!")
                return;
            }
            console.log(selfreference);
            selfreference.setState({
                    data: helsingborgDataDb[0]["date"],
                    place: helsingborgDataDb[0]["location"]["city"],
                    country: helsingborgDataDb[0]["location"]["country"]
            })
        }, 4000);
        
    };

    render() {
            console.log("[~] Start render...")
            return (
                <div>
                    <Titles/>
                    <Forms pushEvents={this.pushEvents} getEvents={this.getEvents} />
                    <Weather />
                    <p> </p>
                    <h1>YA VIJU</h1>
                    <EventCards date={this.state.data} />
                </div>
            );
    }
}

export default App;



