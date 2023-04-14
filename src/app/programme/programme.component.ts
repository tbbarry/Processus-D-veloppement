import {Component, NgZone} from '@angular/core';
import {Module} from "../entity/module";
import {Programme} from "../entity/programme";
import {AuthServiceService} from "../services/auth-service.service";
import {HttpClient} from "@angular/common/http";
import {GoogleSheetService} from "../services/google-sheet.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-programme',
  templateUrl: './programme.component.html',
  styleUrls: ['./programme.component.css']
})
export class ProgrammeComponent {
  fullName : string = "Amirou";
  modules: Module[] = [];
  lien: string = "";
  lienForm: FormGroup = new FormGroup({});
  programmes: Programme[] = [];
  send = false;
  ngOnInit() {
    this.initForm();
  }
  constructor(public authService: AuthServiceService, public httpClient: HttpClient, public googleService: GoogleSheetService, public router: Router, public zone: NgZone, public fb: FormBuilder) {
    this.authService.userSession.subscribe((res: any) => {
      console.log("utilisateur");
      this.fullName = res;
      console.log(this.fullName);
    });

  }
  getProgrammes (id: string) {
    this.googleService.getProgrammes(id).subscribe((res) => {
      let rowData1 = res.sheets[1].data[0].rowData;
      for (let i=1; i< rowData1.length; i++) {
        let values = rowData1[i].values;
        console.log(rowData1[i]);
        this.programmes.push(new Programme(values[0].formattedValue, values[1].formattedValue, values[2].formattedValue, values[3].formattedValue));
        console.log(this.programmes);
      }
      this.send = true;
    });
  }

  showModules(lien: string) {

    console.log(lien);
    const splitUrl = lien.split("/");
    const id = splitUrl[5];
    this.lien = id;

 this.zone.run(() => {

   this.router.navigate(["/modules/"+this.lien]);
 })
    console.log(id);
  }

  onSubmit(lienForm: FormGroup) {
    let lien = lienForm.value["lien"];
    const splitUrl = lien.split("/");
    const id = splitUrl[5];
    this.getProgrammes(id);
  }
  initForm(): void {
    this.lienForm = this.fb.group({
        lien: new FormControl("", [Validators.required, Validators.min(5)])
    });

  }
}
