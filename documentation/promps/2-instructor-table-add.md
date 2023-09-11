basado en esto:
<mat-form-field class="full-width">
  <div class="search-input">
    <input type="text" matInput placeholder="Buscar instructor..." class="search-text" [(ngModel)]="filterValue" (input)="applyFilter()">
    <button mat-icon-button class="search-icon" aria-label="Buscar">
      <mat-icon>search</mat-icon>
    </button>
  </div>
</mat-form-field>

<button mat-stroked-button aria-label="Agregar nuevo instructor" (click)="openModal('')" class="mb-2">
  <mat-icon>add</mat-icon> Crear nuevo instructor
</button>



<table mat-table [dataSource]="filteredInstructors" class="mat-elevation-z8">
  <!-- Definición de columnas -->
  <ng-container *ngFor="let column of displayedColumns" [matColumnDef]="column">
    <th mat-header-cell *matHeaderCellDef>{{ columnLabels[column] }}</th>
    <td mat-cell *matCellDef="let instructor" (click)="openModal(instructor.idInstructor)" class="row-hover">
      <ng-container *ngIf="column === 'imgUrl'">
        <img src="{{ instructor.imgUrl }}" alt="Foto" class="profile-img">
      </ng-container>
      <ng-container *ngIf="column === 'fullName'">
        {{ instructor.user.fullName }}
      </ng-container>
      <ng-container *ngIf="column !== 'imgUrl' && column !== 'fullName'">
        {{ instructor[column] }}
      </ng-container>
    </td>
  </ng-container>

  <!-- Filas de la tabla -->
  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { InstructorService } from '../../services';
import { Instructor } from '../../interfaces';
import { InstructorFormComponent } from '../instructor-form/instructor-form.component';

@Component({
  selector: 'app-instructors-table',
  templateUrl: './instructors-table.component.html',
  styleUrls: ['./instructors-table.component.css']
})
export class InstructorsTableComponent implements OnInit {
  instructorsList: Instructor[] = [];
  filteredInstructors: Instructor[] = [];
  filterValue: string = '';

  columnLabels: { [key: string]: string } = {
    imgUrl: 'Foto',
    fullName: 'Nombre Completo',
    title: 'Título'
  };

  displayedColumns: string[] = Object.keys(this.columnLabels);

  constructor(
    private instructorService: InstructorService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.instructorService.findAll()
      .subscribe((instructors: Instructor[]) => {
        this.instructorsList = instructors;
        this.applyFilter();
      });
  }

  applyFilter(): void {
    const filterText = this.filterValue.trim().toLowerCase();
    if (filterText === '') {
      this.filteredInstructors = this.instructorsList;
    } else {
      this.filteredInstructors = this.instructorsList
        .filter((instructor: Instructor) =>
          instructor.title.toLowerCase().includes(filterText)
        );
    }
  }

  openModal(instructorId: string): void {
    const dialogRef = this.dialog.open(InstructorFormComponent, {
      width: '400px'
    });

    // Asignar instructorId al componente hijo
    dialogRef.componentInstance.instructorId = instructorId;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si se guardó correctamente, actualizar la lista de instructores
        this.instructorService.findAll()
          .subscribe((instructors: Instructor[]) => {
            this.instructorsList = instructors;
            this.applyFilter();
          });
      }
    });
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';
import { enviroment } from 'src/environments/environments';
import { Instructor } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  private readonly baseUrl: string = enviroment.baseUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    if (!token) {
      this.authService.logout();
      throw new Error('Token not found');
    }

    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  findAll() {
    const url = `${this.baseUrl}/instructor`;
    return this.http.get<Instructor[]>(url);
  }

  findById(id: string) {
    const url = `${this.baseUrl}/instructor/${id}`;
    return this.http.get<Instructor>(url);
  }

  create(newInstructor: Instructor) {
    const url = `${this.baseUrl}/instructor`;
    const headers = this.getHeaders();
    return this.http.post<Instructor>(url, newInstructor, { headers });
  }

  updateById(id: string, updateInstructor: Instructor) {
    const url = `${this.baseUrl}/instructor/${id}`;
    const headers = this.getHeaders();
    return this.http.patch<Instructor>(url, updateInstructor, { headers });
  }

  removeById(id: string) {
    const url = `${this.baseUrl}/instructor/${id}`;
    const headers = this.getHeaders();
    return this.http.delete(url, { headers });
  }
}



export interface Instructor {
  idInstructor?: string;
  imgUrl:       string;
  title:        string;
  status:       boolean;
  user?:        any;
}

css:.full-width {
  width: 100%;
}

.search-input {
  display: flex;
  align-items: center;
}

.search-text {
  flex: 1;
  border: none;
  box-shadow: none;
}

.search-icon {
  margin-left: 8px;
}

.row-hover:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}

.profile-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}


Yo necesito que mi componente app-instructors-course-list-add que es hijo de otro componente, muestre una tabla con todos los instructores que existen, que se puedan buscar en tiempo real, pero con la diferencia que no necesito ningun modal, solamente la tabla y el buscador.

import { Component } from '@angular/core';

@Component({
  selector: 'app-instructors-course-list-add',
  templateUrl: './instructors-course-list-add.component.html',
  styleUrls: ['./instructors-course-list-add.component.css']
})
export class InstructorsCourseListAddComponent {

}


<p>instructors-course-list-add works!</p>

dame el codigo fuente completo y correjido de app-instructors-course-list-add