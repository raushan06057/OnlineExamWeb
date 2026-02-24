import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HRSettingsPage } from './hr-settings.page';
import { HRSettingsRoutingModule } from './hr-settings-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HRSettingsRoutingModule
    ],
    declarations: [HRSettingsPage]
})
export class HRModule { }
