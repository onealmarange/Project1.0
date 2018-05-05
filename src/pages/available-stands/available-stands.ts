import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Museum } from '../../models/museum';
import { StandDetailsPage } from '../stand-details/stand-details';
import { MapViewPage } from '../map-view/map-view';

@IonicPage()
@Component({
  selector: 'page-available-stands',
  templateUrl: 'available-stands.html',
})
export class AvailableStandsPage {
  standsList = [];
  filteredStands = [];
  isFiltered = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    this.http.get<any>('assets/data/museum.json')
      .subscribe(data => {
        this.standsList = data.museums;
      },
        err => {
          console.log(err);
        });
  }

  searchStands(event) {
    if (event.target.value.length > 2) {
      let filtered = this.standsList.filter(function (row) {
        if (row.state.indexOf(event.target.value) != -1) {
          return true;
        } else {
          return false;
        }
      });
      this.isFiltered = true;
      this.filteredStands = this.filteredStands;
    }
  }

  itemTapped(event, stand) {
    this.navCtrl.push(StandDetailsPage, {
      stand: stand
    });
  }

  allStandsMap() {
    this.navCtrl.push(MapViewPage, {
      standsList: this.standsList
    });
  }
}