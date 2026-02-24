import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
  standalone:false
})
export class DashboardPage implements OnInit {
  ngOnInit(): void {
  }
  constructor(private renderer: Renderer2) {
    this.addJsToElement("assets/js/app.js");
    // this.addJsToElement("https://cdn.fusioncharts.com/fusioncharts/latest/fusioncharts.js");
    // this.addJsToElement("https://cdn.fusioncharts.com/fusioncharts/latest/themes/fusioncharts.theme.fusion.js");
   }

  addJsToElement(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.renderer.appendChild(document.body, script);
    return script;
  }
}