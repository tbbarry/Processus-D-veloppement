import {Component, NgZone} from '@angular/core';
import {Module} from "../entity/module";
import {AuthServiceService} from "../services/auth-service.service";
import {HttpClient} from "@angular/common/http";
import {GoogleSheetService} from "../services/google-sheet.service";
import {Programme} from "../entity/programme";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent {
  fullName : string = "Amirou";
  modules: Module[] = [];
  modulesCopy: Module[] = [];
  programmes: Programme[] = [];
  send = false;
  lien: string ="";
  constructor(public authService: AuthServiceService, public httpClient: HttpClient, public googleService: GoogleSheetService, public activeRoute: ActivatedRoute,public router: Router, public zone: NgZone) {
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
        this.modulesCopy.push(new Module(values[0].formattedValue, values[1].formattedValue, values[2].formattedValue, values[3].formattedValue));

      }
      console.log(this.modules);
      this.send = true;
    } );

  }

  onSearch(event: any) {
    const text = event.target.value;
    if(text.length >= 3) {
      this.modules = this.modulesCopy.filter(m => {
        return m.libelle.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
            m.nom.toLowerCase().indexOf(text.toLowerCase()) !== -1
      })
    }else {
      this.modules = this.modulesCopy;
    }
    /*
    this.patients = this.patientsOriginaux.filter(patient => {
      return patient.nom.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
          patient.prenom.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
          patient.code.toLowerCase().indexOf(text.toLowerCase()) !== -1;

    });
    this.patientsChunk = this.chunk(this.patients, 3);

     */
  }
  showExercice(code: string) {

    console.log(code);
    this.zone.run(() => {

      this.router.navigate(["/exercices/"+ this.lien+"/"+code]);
    })
  }
}
