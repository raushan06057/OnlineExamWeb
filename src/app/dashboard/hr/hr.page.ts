import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-hr',
  templateUrl: 'hr.page.html',
  styleUrls: ['hr.page.scss'],
})
export class HRPage implements OnInit {

  constructor(private router: Router,private alertController: AlertController, private toastService: ToastService) { 
  }
  ngOnInit(): void {
  }
}