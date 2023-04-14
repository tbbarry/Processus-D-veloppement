import { Component } from '@angular/core';
import {Module} from "../entity/module";
import {AuthServiceService} from "../services/auth-service.service";
import {HttpClient} from "@angular/common/http";
import {GoogleSheetService} from "../services/google-sheet.service";
import {Programme} from "../entity/programme";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent {
  fullName : string = "Amirou";
  modules: Module[] = [];
  programmes: Programme[] = [];
  send = false;
  lien: string ="";
  constructor(public authService: AuthServiceService, public httpClient: HttpClient, public googleService: GoogleSheetService, public activeRoute: ActivatedRoute) {
    this.authService.userSession.subscribe((res: any) => {
      console.log("utilisateur");
      this.fullName = res;
      console.log(this.fullName);
    });

  }
  ngOnInit() {

    this.lien = this.activeRoute.snapshot.params["lien"];
    this.getModules();
  }
  getModules () {
    this.googleService.getData(this.lien).subscribe((res)=> {
      console.log(res);
      let rowData = res.sheets[1].data[0].rowData;
      for (let i=1; i< rowData.length; i++) {
        let values = rowData[i].values;
        console.log(rowData[i]);
        this.modules.push(new Module(values[0].formattedValue, values[1].formattedValue, values[2].formattedValue, values[3].formattedValue));
      }
      console.log(this.modules);
      this.send = true;
    } );

  }
}
