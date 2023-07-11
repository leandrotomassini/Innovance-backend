Tengo un componente padre que se llama CourseLayoutComponent y dentro de su html muestra  <app-course-form></app-course-form>, desde CourseLayoutComponent  se lee la url, esta tiene dos posibilidades o dice 'nuevo-curso' o tiene una ruta de un curso llamada slug dentro de las propiedades de un curso. El problema que tengo es que cuando creo un nuevo curso haciendo clic en '+ Crear nuevo curso' desde el componente CourseLayoutComponent me lleva al app-course-form y completo todo el form y toco en 'guardar' de ahi quiero que me lleve a otra ves el componente app-course-form pero ahora con el slug del curso y quisiera que el boton de guardar del form en este caso te lleve a un metodo updateCourse que llame al metodo del servicio 'CoursesService' que se llama updateById y recibe el id del curso y los datos del curso a actualizar. lo mismo si voy desde el componente CourseLayoutComponent y toco en un curso de la tabla me tiene que llevar a editar un curso y no a crear nuevo. Tambien quiero que cuando estoy llendo a editar un curso y solo cuando estoy editando un curso osea que la url debe ser distinta a 'nuevo-curso' y va a tener el slug del curso, quiero que el form este con todos los inputs llenos con los valores del curso que estoy editando. necesito que me entreges el codigo fuente completo y correjido, y por favor no te olvides de nada de lo que te pedi chequea que hallas cumplido todo tal como te pido con total precicion. Angular 16 y Angular material.
course-layout.component.html:
<div class="grid p-3">

  <div class="col-12 md:col-12 lg:col-6">
    <mat-card>
      <mat-card-header class="p-3 d-flex align-items-center justify-content-center">
        <div class="mr-2">
          <mat-icon matListItemIcon [fontSet]="'material-icons-outlined'">price_change</mat-icon>
        </div>
        <div>
          <mat-card-title>Curso:</mat-card-title>
        </div>
      </mat-card-header>
      <mat-card-content>
        <app-course-form></app-course-form>
      </mat-card-content>
    </mat-card>
  </div>

  <div class="col-12 md:col-12 lg:col-6">
    <mat-card>
      <mat-card-header class="p-3 d-flex align-items-center justify-content-center">
        <div class="mr-2">
          <mat-icon matListItemIcon [fontSet]="'material-icons-outlined'">price_change</mat-icon>
        </div>
        <div>
          <mat-card-title>Instructores:</mat-card-title>
        </div>
      </mat-card-header>
      <mat-card-content>
        <app-course-instructors></app-course-instructors>
      </mat-card-content>
    </mat-card>

    <div class="col-12 md:col-12 lg:col-6">
      <mat-card>
        <mat-card-header class="p-3 d-flex align-items-center justify-content-center">
          <div class="mr-2">
            <mat-icon matListItemIcon [fontSet]="'material-icons-outlined'">price_change</mat-icon>
          </div>
          <div>
            <mat-card-title>Secciones:</mat-card-title>
          </div>
        </mat-card-header>
        <mat-card-content>
          <app-course-sections></app-course-sections>
        </mat-card-content>
      </mat-card>
    </div>
  </div>


</div>

course-layout.component.ts:
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-course-layout',
  templateUrl: './course-layout.component.html',
  styleUrls: ['./course-layout.component.css']
})
export class CourseLayoutComponent implements OnInit {



  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.snapshot.params['slug'] == 'nuevo-curso'
  }

}
course-form.component.html:
<div class="title-course-container">
  <img [src]="courseForm.get('logo')?.value" *ngIf="courseForm.get('logo')?.value !==''" alt="Foto" class="course-logo-img">
  <h2 mat-dialog-title>
    {{ courseForm.get('title')?.value ? courseForm.get('title')?.value : 'Nuevo curso' }}
  </h2>
</div>

<div mat-dialog-content>
  <form (ngSubmit)="saveCourse()" [formGroup]="courseForm">

    <mat-form-field class="full-width">
      <mat-label>Título del curso:</mat-label>
      <input matInput placeholder="Título para el curso..." formControlName="title">
      <mat-error *ngIf="courseForm.get('title')?.invalid && courseForm.get('title')?.touched">Ingrese un título válido</mat-error>
    </mat-form-field>

    <mat-form-field class="full-width">
      <mat-label>Breve descripción del curso:</mat-label>
      <textarea matInput placeholder="Descripción para el curso..." formControlName="description"></textarea>
      <mat-error *ngIf="courseForm.get('description')?.invalid && courseForm.get('description')?.touched">Ingrese una descripción válida</mat-error>
    </mat-form-field>

    <mat-form-field class="full-width">
      <mat-label>Slug:</mat-label>
      <input matInput placeholder="URL para el curso, sin la barra diagonal '/', por ejemplo: 'historia-dinero'." formControlName="slug">
      <mat-error *ngIf="courseForm.get('slug')?.invalid && courseForm.get('slug')?.touched">Ingrese un slug válido</mat-error>
      <mat-hint *ngIf="courseForm.get('slug')?.touched && !courseForm.get('slug')?.invalid">Use solo letras normales y guiones (-)</mat-hint>
    </mat-form-field>

    <mat-form-field class="full-width">
      <mat-label>Logo url:</mat-label>
      <input matInput placeholder="Puedes subir el logo del curso en este enlace (<https://imgur.com/>)..." formControlName="logo">
      <mat-error *ngIf="courseForm.get('logo')?.invalid && courseForm.get('logo')?.touched">Ingrese una URL válida</mat-error>
      <mat-hint *ngIf="courseForm.get('logo')?.touched && !courseForm.get('logo')?.invalid">Ingrese una URL válida</mat-hint>
    </mat-form-field>

    <div class="button-row">
      <button mat-button color="primary" type="submit" [disabled]="courseForm.invalid">Guardar curso</button>
    </div>
  </form>
</div>
course-form.component.ts:
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CoursesService } from '../../services';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit{

  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private courseService: CoursesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      slug: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\\\\\\\\-]+$/)]],
      logo: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
   
  }

  saveCourse() {
    this.courseService.create(this.courseForm.value).subscribe(() => {
      this.router.navigateByUrl(`/studio/cursos/${this.courseForm.get('slug')?.value}`);
    });
  }

}

course.service.ts:
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from 'src/app/auth/services/auth.service';
import { enviroment } from 'src/environments/environments';
import { Course } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

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
    const url = `${this.baseUrl}/course`;
    return this.http.get<Course[]>(url);
  }

  findById(id: string) {
    const url = `${this.baseUrl}/course/${id}`;
    return this.http.get<Course>(url);
  }

  create(newCourse: Course) {
    const url = `${this.baseUrl}/course`;
    const headers = this.getHeaders();
    return this.http.post<Course>(url, newCourse, { headers });
  }

  updateById(id: string, updateCourse: Course) {
    const url = `${this.baseUrl}/course/${id}`;
    const headers = this.getHeaders();
    return this.http.patch<Course>(url, updateCourse, { headers });
  }

  removeById(id: string) {
    const url = `${this.baseUrl}/course/${id}`;
    const headers = this.getHeaders();
    return this.http.delete(url, { headers });
  }

}