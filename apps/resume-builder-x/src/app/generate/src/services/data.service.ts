import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IPersonalData } from '../models/interfaces/IPersonalData';
import { IExperience } from '../models/interfaces/IExperience';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    constructor(private http: HttpClient) {}

    public getPersonalData(): Observable<IPersonalData> {
        return this.http.get<IPersonalData>('assets/personal.data.json');
    }

    public getExperienceData(): Observable<IExperience> {
        return this.http.get<IExperience>('assets/experience.data.json');
    }
}
