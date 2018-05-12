import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { Stands } from '../../models/stands';

/**
 * Generated class for the StandManagerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stand-manager',
  templateUrl: 'stand-manager.html',
})
export class StandManagerPage {
  area: any;
  newStand = {} as Stands;
  availableStands: any;
  isEdit = false;
  isManage = false;
  applicants: any;
  selectedArea: string;
  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, private dataService: DataService, public navCtrl: NavController, public navParams: NavParams) {
    this.getStands()
  }

  ionViewDidLoad() {
  }

  addNew() {
    this.dataService.newStands(this.newStand)
  }

  getStands() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.dataService.getNewStandsAreas()
      .valueChanges()
      .subscribe(data => {
        loading.dismiss();
        this.availableStands = data;
      },
        err => {
          loading.dismiss();
        })
  }

  getApplicants(area) {
    this.isManage = true;
    this.isEdit = false;
    this.selectedArea = area;
    this.dataService.getAreaApplicants(area)
      .valueChanges()
      .subscribe(data => {
        this.applicants = data;
      })
  }

  approve(applicant: string, ) {
    let prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Provide a stand number below",
      inputs: [
        {
          name: 'standNumber',
          placeholder: 'Stand Number'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.dataService.assignStandNumber(this.selectedArea, applicant, data);
          }
        }
      ]
    });
    prompt.present();
  }
}