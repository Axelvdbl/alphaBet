import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

	letters = [];

	date: any;
	monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
	'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  constructor(
		public alertCtrl: AlertController,
		public data: DataService,
	) {}

	ngOnInit() {
		this.getLetters() ;
		var fullDate = new Date();
		var year = fullDate.getFullYear();
		var day = fullDate.getDate();
		this.date = day+" "+(this.monthNames[fullDate.getMonth()])+" "+year;
	}

	async pressed(letter, i) {
		let alert = await this.alertCtrl.create({
      message: "Valider la lettre " + letter.name.toUpperCase() + " ?",
			buttons: [
			 {
				 text: 'ANNULER',
				 role: 'cancel'
			 }, {
				 text: 'OK',
				 handler: () => {
					 letter.count++;
					 if (!letter.date)
					 	letter.date = this.date;
					 this.putLetter(letter, i);
				 }
			 }
		 ]
    });
    await alert.present();
	}

	getLetters() {
		this.data.getLetters()
							.subscribe(
								success => {
									this.letters = success.body;
								},
								error => {
									console.log(error);
								}
							)
	}

	putLetter(letter, i) {
		this.data.putLetter(letter)
							.subscribe(
								success => {
								},
								error => {
									console.log(error);
								}
							)
	}
}
