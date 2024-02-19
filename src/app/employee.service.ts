import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee } from './Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8080/employee';

  constructor(private http : HttpClient) { }

  public getAllEmployees() : Observable<Employee[]>{

    return this.http.get<Employee[]>(`${this.baseUrl}/all`);
  }

  public updateEmployee(employeeId : number, employee : Employee) :Observable<Employee>{

    return this.http.put<Employee>(`${this.baseUrl}/update/${employeeId}`,employee);
  }

  public addEmployee(employee : Employee) : Observable<Employee>{

    return this.http.post<Employee>(`${this.baseUrl}/create`,employee);
  }

  public deleteEmployee(employeeId : number) : Observable<void>{

    return this.http.delete<void>(`${this.baseUrl}/${employeeId}`);
  }




}
