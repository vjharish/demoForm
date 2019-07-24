import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { demoForm } from '/home/ameex/orbita/demoForm/src/app/demoForm.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'form-root',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class formComponent implements OnInit {
  id: string;
  data: any;
  profileForm = this.fb.group({
    fname: ['', Validators.required],
    lname: [''],
    uphone: ['', Validators.required],
    ugender: ['', Validators.required],
    udob: ['', Validators.required],
    uactive: [''],
  });

  constructor(private fb: FormBuilder, public _demoFrom: demoForm, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['uid']) {
        this.id = params['uid'];
        this._demoFrom.editData(this.id).subscribe(res => {
          this.data = res.json();
          this.data = this.data.result;
          this.profileForm.setValue({
            fname: this.data[0].firstName,
            lname: this.data[0].lastName,
            uphone: this.data[0].phone,
            ugender: this.data[0].gender,
            udob: this.data[0].dob,
            uactive: this.data[0].active,
          });
        });
      }
    });
  }

  genders: object[] = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
    { value: 'other', viewValue: 'Other' }
  ];

  submit(value) {
    if (this.id) {
      this.update(value);
      return;
    }
    this._demoFrom.addData(value).subscribe(res => {
      this.router.navigate(['/List']);
    });
  }

  update(value) {
    this._demoFrom.updateData(this.id, value).subscribe(res => {
      this.router.navigate(['/List']);
    });
  }
}
