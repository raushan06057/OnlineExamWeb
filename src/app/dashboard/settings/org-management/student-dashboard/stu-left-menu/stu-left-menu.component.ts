import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    selector:'app-stu-left-menu',
    templateUrl:'./stu-left-menu.component.html',
    styleUrls:['./stu-left-menu.component.scss'],
    imports:[RouterModule,CommonModule],
    standalone:true
})
export class StuLeftMenuComponent{

}