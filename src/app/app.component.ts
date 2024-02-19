import { Component, OnInit } from '@angular/core';
import { Employee } from './Employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Front_end_EmployeeManagement';

  public employees : Employee[];

  constructor(private employeeService : EmployeeService ) {}

  ngOnInit(): void {
      this.getEmployees();
  }

  public getEmployees() : void {

    this.employeeService.getAllEmployees().subscribe(
      (response : Employee[]) => {
        console.log(response);
        this.employees = response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
    
  }
}
