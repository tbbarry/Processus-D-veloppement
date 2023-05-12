import {Component, NgZone} from '@angular/core';
import {Module} from "../entity/module";
import {Programme} from "../entity/programme";
import {AuthServiceService} from "../services/auth-service.service";
import {HttpClient} from "@angular/common/http";
import {GoogleSheetService} from "../services/google-sheet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Exercice} from "../entity/exercice";

@Component({
  selector: 'app-exercice',
  templateUrl: './exercice.component.html',
  styleUrls: ['./exercice.component.css']
})
export class ExerciceComponent {
  fullName : string = "Amirou";
  modules: Module[] = [];
  exercices: Exercice[] = [];
  exercicesCopy: Exercice[] = [];
  lien: string = "";
  codeModule: string = "";
  lienForm: FormGroup = new FormGroup({});
  programmes: Programme[] = [];
  send = false;
  constructor(public authService: AuthServiceService, public httpClient: HttpClient, public googleService: GoogleSheetService, public router: Router, public zone: NgZone, public active: ActivatedRoute) {
    this.authService.userSession.subscribe((res: any) => {
      console.log("utilisateur");
      this.fullName = res;
      console.log(this.fullName);
    });

  }
  ngOnInit() {

    this.codeModule = this.active.snapshot.params["codeModule"];
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
        if(this.codeModule == values[0].formattedValue) {
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
          this.exercicesCopy.push(new Exercice(
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
      }
      console.log(this.exercices);
      console.log(this.modules);
      this.send = true;
    } );

  }
  showDetails(code: string) {

    console.log(code);
    this.zone.run(() => {

      this.router.navigate(["/exercices/details/"+ this.lien+"/"+code]);
    })
  }

  onSearch(event: any) {
    const text = event.target.value;
    if(text.length >= 3) {
      this.exercices = this.exercicesCopy.filter(m => {
        return m.description?.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
          m.titre.toLowerCase().indexOf(text.toLowerCase()) !== -1
      })
    }else {
      this.exercices = this.exercicesCopy;
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
}
