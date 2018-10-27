import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'Lisbon';
  end = 'Porto';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(public navCtrl: NavController,  platform: Platform){
    platform.ready().then(() => {
      this.initMap();
    }) 
  }

  //var Happycode
  initMap(){
    //Inicial Location
    var happycode = {
      lat: 38.736845,
      lng: -9.137990
      };
      //Map Creation - zoom; center: inicial location; 
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 16,
      center: happycode,
      disableDefaultUI: true
    });
    // Marker - center/INLOC
    var marker = new google.maps.Marker({
      position: happycode,
      map: this.map,
      title: 'My Position!'
    });
  }
  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(response);
        } 
        else {
          window.alert('Directions request failed due to ' + status);
        }
        });
  
  }
}
