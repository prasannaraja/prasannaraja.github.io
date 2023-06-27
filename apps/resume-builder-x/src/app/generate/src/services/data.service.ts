import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IPersonalData } from '../models/IPersonalData';
import { IExperience } from '../models/IExperience';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    constructor(private http: HttpClient) { }

    public getPersonalData(): Observable<IPersonalData> {
        return this.http.get<IPersonalData>('assets/sample.personal.data.json');
    }

    public getExperienceData(): Observable<IExperience> {
        return this.http.get<IExperience>('assets/sample.experience.data.json');
    }
}
