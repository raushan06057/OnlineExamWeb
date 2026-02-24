import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: 'main-dashboard.page.html',
  styleUrls: ['main-dashboard.page.scss'],
  standalone: false
})
export class MainDashboardPage implements OnInit {

  constructor(private router: Router) { 
  }
  ngOnInit(): void {

  }
}