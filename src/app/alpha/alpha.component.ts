import { Component, OnInit } from "@angular/core";
import { DataService } from "../services/data.service";
import { BehaviorSubject, Observable, map, switchMap } from "rxjs";
import { Contact, IPersonalData } from "../models/IPersonalData";
import { Company } from "../models/ICompanies";

@Component({
  selector: "app-alpha",
  providers: [DataService],
  templateUrl: "./alpha.component.html",
  styleUrls: ["./alpha.component.scss"],
})
export class AlphaComponent implements OnInit {
  private contactSubject: BehaviorSubject<Contact[]>;
  constructor(public dataService: DataService) {
    this.contactSubject = new BehaviorSubject<Contact[]>([]);
  }
  get contacts(): Contact[] {
    return this.contactSubject.value;
  }

  ngOnInit(): void {
    this.personalData$
      .pipe(
        map((p) => {
          this.contactSubject.next(p.contact);
        }),
        switchMap((e) => {
          return this.experienceData$;
        })
      )
      .subscribe((e) => {
        console.log(e);
      });
  }

  get personalData$(): Observable<IPersonalData> {
    return this.dataService.getPersonalData();
  }

  get experienceData$(): Observable<Company[]> {
    return this.dataService.getExperienceData();
  }
}
