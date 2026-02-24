import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
    providedIn: 'any'
})
export class ToastService {
    constructor(public toastController: ToastController) { }

    async presentToast(message: string, color: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 5000, // Duration in milliseconds (2 seconds in this example)
            position: 'bottom', // You can change the position (top, middle, bottom)
            color: color
        });
        toast.present();
    }

    displayToast(message: any, color: string) {
        this.presentToast(message,color);
    }
}