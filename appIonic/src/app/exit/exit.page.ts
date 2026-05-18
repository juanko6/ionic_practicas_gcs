import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-exit',
  templateUrl: 'exit.page.html',
  styleUrls: ['exit.page.scss'],
  standalone: false,
})
export class ExitPage {

  constructor(private router: Router, private alertCtrl: AlertController) {}

  async confirmExit() {
    const alert = await this.alertCtrl.create({
      header: 'Closing app',
      message: 'You have chosen to exit the app.',
      buttons: ['OK']
    });
    await alert.present();
  }

  goToWiki() {
    this.router.navigateByUrl('/tabs/wiki');
  }
}
