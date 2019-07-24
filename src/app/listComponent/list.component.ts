import { Component, OnInit, ViewChild } from '@angular/core';
import { demoForm } from '/home/ameex/orbita/demoForm/src/app/demoForm.service';
import { Router } from '@angular/router';
import { Response } from '@angular/http'
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'list-root',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class listComponent implements OnInit {
  list: any = [];
  dataSource: any;
  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'gender', 'dob', 'active', 'edit', 'delete'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private _getData: demoForm, private router: Router) { }

  ngOnInit() {
    this._getData.listData().subscribe((res: Response) => {
      this.list = res.json();
      this.list = this.list.result;
      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.sort = this.sort;
    });
  }

  deleteData(id: any) {
    if (confirm("Data will get deleted permanently!")) {
      this._getData.deleteData(id).subscribe((res: Response) => {
        var delData = res.json();
        delData = delData.result;
        this.list = this.list.filter(function (x) {
          return x._id !== delData._id;
        })
        this.dataSource = new MatTableDataSource(this.list);
        this.dataSource.sort = this.sort
      });
    }
  }

  editData(id: any) {
    this.router.navigate(['/Edit/' + id]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}