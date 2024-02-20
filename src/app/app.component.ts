import { Component, OnInit } from '@angular/core';
import { Employee } from './Employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Front_end_EmployeeManagement';

  public employees : Employee[];
  public employee : Employee;
  public editEmployee : Employee;
  public employeeToBeDeleted : Employee;


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


  public addEmployee( addForm : NgForm) : void {
    // get the form value in json representation format and send request to backend
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response : Employee) => {
          this.getEmployees();
          alert(`${addForm.value.firstName} ${addForm.value.lastName} was added successfully!`);
      },
      (error: HttpErrorResponse) => {
        alert("Couldn't add employee, please try again.")
      }
    );

    document.getElementById("add-employee-form")?.click();
    addForm.reset();
  }


  public onUpdateEmployee(employee : Employee) : void {

    this.employeeService.updateEmployee(employee.id,employee).subscribe(
      (response : Employee) => {
        this.getEmployees();
        alert(`${this.editEmployee.firstName} ${this.editEmployee.lastName} has updated!`);
      },
      (error : HttpErrorResponse) => {
        alert("Couldn't update employee, please try again.");
      }
    );
  }


  public deleteEmployee(employeeId : number) : void{

    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response : void) => {
        this.getEmployees();
        alert('Deleted Successfully!');
      },
      (error : HttpErrorResponse) => {
        alert("couldn't delete employee, please try it again.")
      }
    )

  }


  public searchEmployee(key : String){
     const searchResult : Employee[] = [];

     for(let employee of this.employees){
        if(employee.firstName.toLowerCase().includes(key.toLowerCase()) ||
           employee.lastName.toLowerCase().includes(key.toLowerCase()) ||
           employee.email.toLowerCase().includes(key.toLowerCase()) ||
           employee.jobTitle.toLowerCase().includes(key.toLowerCase()) ||
           employee.employeeCode.toLowerCase().includes(key.toLowerCase())){
          searchResult.push(employee);
        }
     }

     this.employees = searchResult;

     if(key.length == 0){
      this.getEmployees();
     }
  }


  public openModal(employee : Employee ,modal : String) : void {

    const mainContainer = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');

    if(modal === 'add'){
      button.setAttribute('data-target','#addEmployeeModal');
    }
    if(modal === 'edit'){
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if(modal === 'delete'){
      this.employeeToBeDeleted = employee;
      button.setAttribute('data-target','#deleteEmployeeModal');
    }

    //add a button to main Container 
    mainContainer?.appendChild(button);
    //click button to show a model
    button.click();
  }
}
