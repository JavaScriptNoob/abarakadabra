import React from "react";
import Titles from "./components/titles";
import Forms from "./components/forms";

import firebase from "firebase";
import EventCards from "./components/eventcards";
import Auth from "./components/auth";
import {BrowserRouter as Router, Route} from "react-router-dom"
import { DB_CONFIG } from "./components/config";

// console.log = function() {};
let helsingborgDataDb;
let eventsData;
let helsingborgSnapshot;
console.clear();
var selfreference;
let convert;
let element;
class App extends React.Component {
  state = {
    data: [" "],
    country: " ",
    mode: "view",
    numbersOfItems: 100,
    itemsToShow: 3,
    expanded: false,
    city: " ",
    parsedData: " ",
    date: " "
  };

  pushEvents = async () => {
    console.log("loop");
    // e.preventDefault();
    if (!firebase.apps.length) {
      firebase.initializeApp(DB_CONFIG);
      console.log("object");
    }
    const ref = firebase.database().ref("greatApp");

    const events = firebase.database().ref("events");

    const selfreference = this;
    events
      .limitToFirst(this.state.numbersOfItems)
      .on("value", function(snapshot) {
        eventsData = snapshot.val();
        console.log(eventsData, "lllllllllll");
        selfreference.setState({
          data: eventsData
        });
      });

    this.setState({ data: eventsData });

    console.log("[+] Save self-reference");

    setTimeout(function(e) {
      console.log("[~] Setting up state");

      // if (!helsingborgDataDb) {
      //   console.log("[-] Empty DB reply!");
      //   return;
      // }

      // selfreference.setState({
      //   data: eventsData
      // });
    }, 6000);
  };

  getEvents = async e => {
    e.preventDefault();
    // this.setState({ city: e.target.elements.city.value.toLowerCase() });
    // console.log("click");
    // let firebasedb = firebase.initializeApp(DB_CONFIG);
    // console.log("click111");
    const ref = firebase.database().ref("greatApp");
    // console.log("click222");

    // console.log("click333");
    let callFunction = () => {
      this.setState({ mode: "edit" });
    };
    callFunction();
  };
  componentDidMount() {
    this.pushEvents();
  }

  getMoreEvents = e => {
    e.preventDefault();

    this.state.itemsToShow < this.state.numbersOfItems
      ? this.setState({
          itemsToShow: (this.state.itemsToShow += 6),
          expanded: true
        })
      : this.setState({ itemsToShow: 3, expanded: false });
    console.log(this.state.itemsToShow, "item", this.state.data, 88888);
  };
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };
  render() {
    const { city, date } = this.state;
    const values = { city, date };
   
    console.log("[~] Start render...", this.state.city);

    if (this.state.mode === "view") {
      return (
        <div>
          <Titles />
          <Router>
           
            <Route exact path="/" component={Auth} />
            <Route exact path="/main" render = {() => <Forms  getEvents={this.getEvents}
              handleChange={this.handleChange}
              values={values} /> }/>
            <p> </p>
          </Router>
        </div>
      );
    } else if (this.state.mode === "edit" && this.state.city < 1) {
      return (
        <div>
          <Titles />
          <Forms getEvents={this.getEvents} handleChange={this.handleChange} />
          <p> </p>
          <h1>YA VIJU</h1>
          <EventCards />
          <div className="eventcards container-fluid">
            <ul className="row d-flex">
              {this.state.data
                .slice(0, this.state.itemsToShow)
                .map((key, i) => (
                  <li
                    key={i}
                    className="col-md-3"
                    style={{ backgroundImage: "url(" + key.img + ")" }}
                  >
                    <h4>{key.title}</h4>
                    <span>{"id: " + key.id}</span>
                    <div className="image-event-container">
                      {" "}
                      <img src={key.img} alt="" />{" "}
                    </div>
                    <p>{"Location " + key.city}</p>
                    <p className="shorter">{key.description}</p>
                    <p>{"Start " + key.start + ", End " + key.end}</p>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <a
              className="btn btn-primary"
              onClick={this.getMoreEvents}
              href="#"
            >
              {this.state.numbersOfItems <= this.state.itemsToShow ? (
                <span>Show less</span>
              ) : (
                <span>Show more</span>
              )}
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Titles />
          <Forms getEvents={this.getEvents} handleChange={this.handleChange} />

          <p> </p>
          <h1>GoodNeews</h1>

          <EventCards />

          <div className="eventcards container-fluid">
            <ul className="row d-flex">
              {this.state.data
                .slice(0, this.state.itemsToShow)
                .map((key, i) => (
                  <li
                    key={i}
                    className="col-md-3"
                    style={{ backgroundImage: "url(" + key.img + ")" }}
                  >
                    <h4>{key.title}</h4>
                    <span>{"id: " + key.id}</span>
                    <div className="image-event-container">
                      {" "}
                      <img src={key.img} alt="" />{" "}
                    </div>
                    <p>{"Location " + key.city}</p>
                    <p className="shorter">{key.description}</p>
                    <p>{"Start " + key.start + ", End " + key.end}</p>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <a
              className="btn btn-primary"
              onClick={this.getMoreEvents}
              href="#"
            >
              {this.state.numbersOfItems <= this.state.itemsToShow ? (
                <span>Show less</span>
              ) : (
                <span>Show more</span>
              )}
            </a>
          </div>
        </div>
      );
    }
  }
}

export default App;
// const apiCallHelsignborg = await fetch(
//   "https://api.helsingborg.se/event/json/wp/v2/event/?_embed&per_page=100"
// );
// const dataHbg = await apiCallHelsignborg.json();

// console.log(dataHbg.stringify);
// ref.child("helsingborg").on("value", function(snapshot) {
//   helsingborgSnapshot = snapshot.val();
// });
// if (helsingborgSnapshot === dataHbg) {
//   ref.child("helsinborg").set(dataHbg, console.log);
// }

// ref.child("helsinborg").on("value", function(snapshot) {
//   helsingborgDataDb = snapshot.val();
//   // console.log(helsingborgDataDb);
//   // console.log(helsingborgDataDb[0],JSON.stringify(helsingborgDataDb[0]) ,"aaaaaaaaaaaa");
//   function convertObjectValuesRecursive(obj, target, replacement) {
//      obj = {...obj};
//     Object.keys(obj).forEach((key) => {
//       if (obj[key] == target) {
//         obj[key] = replacement;
//       } else if (typeof obj[key] == 'object' && !Array.isArray(obj[key])) {
//         obj[key] = convertObjectValuesRecursive(obj[key], target, replacement);
//       }
//     });
//     convert = obj;
//    return obj

//   }

//   convertObjectValuesRecursive(helsingborgDataDb,null,'null')
//   console.log(convert, 'out function');
//   for (const key in convert) {
//     if (convert.hasOwnProperty(key)) {
//        element = convert[key];
//       //  console.log(element,'LLLLLLLLLLLLLLLLL',key);

//     }if (
//       element._embedded.hasOwnProperty('location')  &&
//       element._embedded.location[0].hasOwnProperty('city')&&
//       element.hasOwnProperty('occasions')  &&
//       element.occasions[0].hasOwnProperty('start_date') &&
//       element.occasions[0].hasOwnProperty('end_date') &&
//       element.hasOwnProperty('title') &&
//       element.title.hasOwnProperty('plain_text') &&
//       element.hasOwnProperty('content') &&
//       element.content.hasOwnProperty('rendered') &&
//       element.hasOwnProperty('id') &&
//       element.hasOwnProperty('featured_media') &&
//       element.featured_media.hasOwnProperty('source_url')

//      ){
//       //  console.log(key,element._embedded.location[0],65656, convert,
//       // element._embedded.location[0].city ,
//       // element.occasions[0].start_date ,
//       // element.occasions[0].end_date,
//       // element.title.plain_text,
//       // element.content.rendered,
//       // element.id,
//       // element.featured_media.source_url

//       //   )
//  events.child(key)
//   .set({
//     city: element._embedded.location[0].city,
//     start: element.occasions[0].start_date,
//     end: element.occasions[0].end_date,
//     img: element.featured_media.source_url,
//     id:element.id,
//     title:element.title.plain_text,
//     description:element.content.rendered,

//   });
// }
// else{
//   console.log(key,',,,,,,,,');
// }
//   }
//   console.log(element)
//   return helsingborgDataDb;
// });
 /* /* <Auth/> */
            /* <Forms
              getEvents={this.getEvents}
              handleChange={this.handleChange}
              values={values}
            /> */