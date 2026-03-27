import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading: HTMLIonLoadingElement | null = null;
  private requestCount = 0;
  private isShowing = false;

  constructor(private loadingController: LoadingController) {}

  async show(message: string = 'Please wait...') {
    this.requestCount++;

    if (this.isShowing) return;

    this.isShowing = true;

    this.loading = await this.loadingController.create({
      message,
      spinner: 'crescent'
    });

    await this.loading.present();
  }

  async hide() {
    this.requestCount--;

    if (this.requestCount > 0) return;

    this.requestCount = 0;

    if (this.loading && this.isShowing) {
      this.isShowing = false;
      await this.loading.dismiss();
      this.loading = null;
    }
  }
}