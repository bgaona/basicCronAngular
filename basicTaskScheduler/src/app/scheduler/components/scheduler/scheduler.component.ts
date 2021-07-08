import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Jobs } from 'src/app/models/jobs';
import { SchedulerApiService } from 'src/app/services/scheduler-api.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RequestCronHeader } from 'src/app/models/requestCronHeader';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  httpPattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  cronPattern = '(((\\d+,)+\\d+|(\\d+(\\/|-)\\d+)|\\d+|\\*) ?){5,7}';
  //cronPattern = '(@(annually|yearly|monthly|weekly|daily|hourly|reboot))|(@every (\d+(ns|us|µs|ms|s|m|h))+)|(((\\d+,)+\\d+|(\\d+(\\/|-)\\d+)|\\d+|\\*) ?){5,7}';
  availableJobs: Observable<Jobs[]>;
  selectedJob: Jobs = null;
  error: string = null;
  cronPingHeader: RequestCronHeader;
  pingResult: any;
  schedulerStatus: string;

  constructor(
    private fb: FormBuilder,
    private scheduler: SchedulerApiService
  ) {
  }

  ngOnInit(): void {
    this.availableJobs = this.scheduler.getAvailableJobsFromScheduler();
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      url: ['', Validators.compose([Validators.required, Validators.pattern(this.httpPattern)])],
      cron: ['', Validators.compose([Validators.required, Validators.pattern(this.cronPattern)])]
    });
  }

  checkUrl() {
    if (this.form.valid) {
      this.cronPingHeader = { url: this.form.value.url, cronExpression: this.form.value.cron };
      this.scheduler.getHeaderInformation(this.cronPingHeader).subscribe(res => {
        this.pingResult = res;
      }, error => {
        this.error = error;
      });
    }
  }

  startSchedule() {
    this.scheduler.setCronOfUrl(this.cronPingHeader).subscribe((res: any) => {
      this.schedulerStatus = res.status;
    }, (error) => this.error = error);
  }
}
