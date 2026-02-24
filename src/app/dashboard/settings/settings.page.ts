import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
  standalone:false
})
export class SettingsPage implements OnInit {

  constructor(private router: Router,private alertController: AlertController, private toastService: ToastService) { 
  }
  ngOnInit(): void {
  }
}