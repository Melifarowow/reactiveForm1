import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genresForm: FormGroup
  ageCheckForm: FormGroup  
  questionForm: FormGroup
  genres: Array<string> = [
    'Комедия',
    'Мультфильмы',
    'Ужасы'
  ]
  restricted: boolean
  success: boolean
  message: string
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildGenresForm()
  }

  buildGenresForm() {
    this.genresForm = this.fb.group({
      genre: ['', [
        Validators.required
      ]],
    })
    this.genresForm.valueChanges.subscribe(genre => {
      if(genre.genre === 'Ужасы') {
        this.genresForm = undefined
        this.buildAgeCheckForm()
      } else {
        this.success = true
        this.message = 'Доступ разрешен'
        this.genresForm = undefined
      }
    })
  }

  buildAgeCheckForm() {
    this.ageCheckForm = this.fb.group({
      age: ['', [
        Validators.required
      ]]
    })
  }

  ageSubmit() {
    console.log(this.ageCheckForm)
    if(this.ageCheckForm.value.age < 18) {
      this.restricted = true
      this.message = 'Вы не можете просматривать этот контент'
    } else {
      this.ageCheckForm = undefined
      this.buildQuestionForm()
    }
  }

  buildQuestionForm() {
    this.questionForm = this.fb.group({
      vhs: ['', Validators.required]
    })
    this.questionForm.valueChanges.subscribe(answer => {
      if(answer.vhs === 'video') {
        this.success = true
        this.message = 'Вы прошли проверку'
      } else {
        this.restricted = true
        this.message = 'Ваш возраст не подтвержден'
      }
    })
  }
}
