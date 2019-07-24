import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../environments/environment'

@Injectable()
export class demoForm {
  tempList: any;
  temp: any;

  constructor(private http: Http) { }

  addData(value) {
    return this.http.post(environment.apiUrl + "form/", value);
  }

  updateData(id, value) {
    return this.http.put(environment.apiUrl + "update/" + id, value);
  }

  listData() {
    return this.http.get(environment.apiUrl + "list");
  }

  deleteData(id) {
    return this.http.get(environment.apiUrl + "delete/" + id);
  }

  editData(id) {
    return this.http.get(environment.apiUrl + "edit/" + id);
  }
}