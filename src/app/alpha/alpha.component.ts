import { Component, OnInit } from "@angular/core";
import { DataService } from "../services/data.service";
import { Observable } from "rxjs";
import { IPersonalData } from "../models/IPersonalData";

@Component({
  selector: "app-alpha",
  providers: [DataService],
  templateUrl: "./alpha.component.html",
  styleUrls: ["./alpha.component.scss"],
})
export class AlphaComponent implements OnInit {
  constructor(public dataService: DataService) {}
  ngOnInit(): void {
    this.personalData$.subscribe((p) => console.log(p));
  }

  get personalData$(): Observable<IPersonalData> {
    return this.dataService.getPersonalData();
  }
}
