import {Component, NgZone} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Module} from "../../entity/module";
import {Exercice} from "../../entity/exercice";
import {Programme} from "../../entity/programme";
import {AuthServiceService} from "../../services/auth-service.service";
import {GoogleSheetService} from "../../services/google-sheet.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  fullName : string = "Amirou";
  modules: Module[] = [];
  exercices: Exercice[] = [];
  lien: string = "";
  codeModule: string = "";
  lienForm: FormGroup = new FormGroup({});
  programmes: Programme[] = [];
  send = false;
  value = 10;
  constructor(public authService: AuthServiceService, public httpClient: HttpClient, public googleService: GoogleSheetService, public router: Router, public zone: NgZone, public active: ActivatedRoute) {
    this.authService.userSession.subscribe((res: any) => {
      console.log("utilisateur");
      this.fullName = res;
      console.log(this.fullName);
    });

  }
  ngOnInit() {

    this.codeModule = this.active.snapshot.params["titre"];
    this.lien = this.active.snapshot.params["lien"];
    console.log(this.lien)
    console.log(this.codeModule)
    this.getModules();
  }
  getModules () {
    this.googleService.getData(this.lien).subscribe((res)=> {
      console.log(res);
      let rowData = res.sheets[1].data[0].rowData;
      let rowData2 = res.sheets[2].data[0].rowData;
      console.log(rowData2);
      for (let i=1; i< rowData.length; i++) {
        let values = rowData[i].values;
        console.log(rowData[i]);
        if(this.codeModule == values[0].formattedValue ) {
          this.modules.push(new Module(values[0].formattedValue, values[1].formattedValue, values[2].formattedValue, values[3].formattedValue));
        }
      }
      for (let i=1; i< rowData2.length; i++) {
        let values = rowData2[i].values;
        if(this.codeModule == values[1].formattedValue)
          this.exercices.push(new Exercice(
                  values[0].formattedValue,
                  values[1].formattedValue,
                  values[2].formattedValue,
                  values[3].formattedValue,
                  values[4].formattedValue,
                  values[5].formattedValue,
                  values[6].formattedValue,
                  values[7].formattedValue,
                  values[8].formattedValue,
                  values[9].formattedValue,
                  values[10].formattedValue,
                  values[11].formattedValue,
                  values[12].formattedValue,
                  values[13].formattedValue
              )
          );
      }
      console.log(this.exercices);
      console.log(this.modules);
      this.send = true;
    } );

  }

}
