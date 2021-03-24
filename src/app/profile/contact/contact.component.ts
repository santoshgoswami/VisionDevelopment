import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { SnotifyService } from 'ng-snotify';
import { environment } from '../../../environments/environment';
import { NgForm } from '@angular/forms';
import { Contact } from 'src/app/shared/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  
  snotifyConfig = environment.snotifyConfig;
  //model: any = {};
  model: Contact= new Contact();

  constructor(
    private profile: ProfileService,
    private snotify: SnotifyService
  ){}

  ngOnInit() {
  }

  resetForm(form: NgForm) {
    form.form.reset();
  }

  onSubmitForm(form: NgForm) {
    this.contact(form);
  }

  contact(form: NgForm) {
    this.profile.contactus(this.model).subscribe(data => {
      if (data.status) {
        this.snotify.success(data.message, 'Success', this.snotifyConfig);
      } else {
        this.snotify.warning(data.message, 'Warning', this.snotifyConfig);
      }
    }, err => {
      this.snotify.error('Something went wrong. Try again later.', 'Error', this.snotifyConfig);
    });
  }

}
