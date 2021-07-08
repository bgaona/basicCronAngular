import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { RequestCronHeader } from "../models/requestCronHeader";
import { Jobs } from "../models/jobs";


@Injectable({
    providedIn: 'root'
})
export class SchedulerApiService {

    constructor(
        private readonly http: HttpClient,
    ) { }

    getAvailableJobsFromScheduler() {
        return this.http.get<Jobs[]>('/api/jobs');
    }

    getHeaderInformation(req: RequestCronHeader) {
        return this.http.post('/api/info', req);
    }

    setCronOfUrl(req: RequestCronHeader) {
        return this.http.post('/api/infoCron', req);
    }
}