import { Component, OnInit } from '@angular/core';
import { KeyContants } from 'src/app/shared/constants/key-constants';
import { DataTransferService } from 'src/app/shared/services/data-transfer-service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  standalone: false
})
export class HeaderPage implements OnInit{
username:any;
constructor(private dataTransferService:DataTransferService){}
  ngOnInit(): void {
    this.username = this.dataTransferService.getData(KeyContants.Username)!=null?this.dataTransferService.getData(KeyContants.Username):'N/A';
  }

}
