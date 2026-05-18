import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {

  constructor(private toastCtrl: ToastController) {}

  async ngOnInit() {
    const toast = await this.toastCtrl.create({
      message: 'Welcome to the Star Wars Wiki App!',
      duration: 3000,
      position: 'bottom',
      color: 'dark'
    });
    await toast.present();
  }
}
