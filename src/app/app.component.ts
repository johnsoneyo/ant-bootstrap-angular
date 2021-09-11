import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NzUploadFile} from "ng-zorro-antd/upload";
import {of} from "rxjs";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {UploadService} from "./upload.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'awin-cvuploader';
  fileList: NzUploadFile[] = [];
  uploadStatus?: string;
  showSpinner: boolean = false;

  uploadForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required, Validators.min(3)]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    resume: new FormControl(),
    jobTitle: new FormControl(null, [Validators.required]),
    source: new FormControl(null, [Validators.required])
  });

  constructor(private service: UploadService) {
  }


  async submitForm() {

    this.showSpinner = true;
    for (const i in this.uploadForm.controls) {
      if (this.uploadForm.controls.hasOwnProperty(i)) {
        this.uploadForm.controls[i].markAsDirty();
        this.uploadForm.controls[i].updateValueAndValidity();
      }
    }
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('resume')?.value);
    formData.append('firstname', this.uploadForm.get('firstName')?.value);
    formData.append('lastname', this.uploadForm.get('lastName')?.value);
    formData.append('email', this.uploadForm.get('email')?.value);
    formData.append('jobtitle', this.uploadForm.get('jobTitle')?.value);
    formData.append('source', this.uploadForm.get('source')?.value);

    try {
      this.uploadStatus = await this.service.uploadResume(formData).toPromise();
    } catch (e) {
      console.log(e);
      this.uploadStatus = e;
    } finally {
      this.showSpinner = false;
    }

  }

  handleUpload = (item: any) => {

    this.fileList = [
      {
        uid: item.file.uid,
        name: item.file.name,
        status: 'done',
        response: 'Success'
      }
    ];

    this.uploadForm.get('resume')?.setValue(item.file);
    var observable = of((observer: any) => {
      observer.next();
    });
    return observable.subscribe((x: any) => {
    });
  }


}
