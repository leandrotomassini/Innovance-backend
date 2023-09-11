Un curso luce asi:

export interface Course {
  idCourse?: string;
  title: string;
  description: string;
  slug: string;
  logo: string;
}


tengo un componente CourseFormComponent que tiene un formulario courseForm que si la ruta es nuevo-curso crea un cuerso nuevo y si no es porque estoy reutilizando el  CourseFormComponent pero esta vez para editar.

componente padre course-layout.component.html:
<div class="grid p-3">

  <div class="col-12 md:col-12 lg:col-6">
    <mat-card>
      <mat-card-header class="p-3 d-flex">
        <div class="mr-2 arrow-back" (click)="arrowBack()">
          <mat-icon matListItemIcon [fontSet]="'material-icons-outlined'">
            arrow_back
          </mat-icon>
          Ver todos los cursos
        </div>
      </mat-card-header>
      <mat-card-content>
        <app-course-form [courseSlug]="courseSlug"></app-course-form>
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
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-course-layout',
  templateUrl: './course-layout.component.html',
  styleUrls: ['./course-layout.component.css']
})
export class CourseLayoutComponent implements OnInit {

  courseSlug: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.courseSlug = this.activatedRoute.snapshot.params['slug'];
  }

  arrowBack() {
    this.router.navigate(['/studio/cursos/']);
  }

}

componente hijo course-form.component.ts:
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CoursesService } from '../../services';
import { Course } from '../../interfaces';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  @Input() courseSlug: string = '';

  courseForm: FormGroup;
  course!: Course;

  constructor(
    private fb: FormBuilder,
    private courseService: CoursesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      slug: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\\\\\\\\\\\\\\\\-]+$/)]],
      logo: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.courseSlug !== 'nuevo-curso') {
      this.courseService.findBySlug(this.courseSlug)
        .subscribe((course) => {
          this.course = course;
          this.courseForm.patchValue(course);
        });
    }
  }

  saveCourse() {
    const courseData = this.courseForm.value;
    if (this.courseSlug !== 'nuevo-curso') {
      this.courseService.updateById(this.courseSlug, courseData)
        .subscribe(() => {
          this.router.navigate([`/studio/cursos/${this.courseSlug}`]);
        });
    } else {
      this.courseService.create(courseData)
        .subscribe((newCourse) => {
          this.router.navigateByUrl(`/studio/cursos/${newCourse.slug}`)
            .then(() => {
              window.location.reload();
            });
        });
    }
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
      <button mat-button color="primary" type="submit" [disabled]="courseForm.invalid">{{ courseSlug === 'nuevo-curso' ? 'Crear curso' : 'Actualizar curso' }}</button>
    </div>
  </form>
</div>

Quiero que tengas en cuenta que el slug de un curso no es el id del curso, yo utilizo el slug por un tema de que queda lindo a la vista y es amigable para el seo, pero por el solo hecho de que al editar busque el curso por el slug no signifca que sea el ID, es unico, pero es solo un slug nada mas.

Entonces lo que yo necesito es que cuando un usuario este editando un curso en un formulario, lo que siginifica que le curso ya existe y por lo tanto ya tiene su id, mostrar el id de ese curso en un console log al editar un curso presionando el boton de 'Actualizar curso'. Puntualmente estamos hablando de mostrar el valor de 'idCourse?: string;' de Course. 

Entregame el codigo fuente completo y correjido de course-form. Para que tengas mas contexto esta creado con Angular y Angular material. Y el service es este:

course.service.ts:
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from 'src/app/auth/services/auth.service';
import { enviroment } from '../../../environments/environments';
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

  findBySlug(slug: string) {
    const url = `${this.baseUrl}/course/slug/${slug}`;
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

Tambien quiero que ese idCourse venga de una variable Course asi como  course!: Course;, por lo tanto al cargar el componente editar deberia de tener esa variable curso con todos los datos del curso que estoy editando, y la variable idCourse, asique quiero que en el console.log al guardar un curso que estoy editando se muestre la variable idCourse que viene directamente de this.course y que verdaderamente este esa idCourse ya cargada ahi con todos los valores de course desde que cargo la pagina.