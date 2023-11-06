import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Observable, catchError, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  displayedColumns = ['_id','name', 'category','actions'];

  constructor(private coursesService: CoursesService,public dialog: MatDialog,private router:Router,private route:ActivatedRoute) {
    this.courses$ = this.coursesService.list().pipe(
      catchError(error => {
        this.onError('Erro ao Carregar os Cursos')
        return of([])
      })
    );
  }

  onError(errorMsg:string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {

  }

  onAdd(){
    this.router.navigate(['new'],{relativeTo:this.route}) //pega a rota atual
  }
}
