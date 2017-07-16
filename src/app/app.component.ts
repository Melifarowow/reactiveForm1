import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  userForm: FormGroup
  formErrors = {
    'email': '',
    'name': '',
    'secondName': '',
    'phone': '',
    'adress': ''
  };
  requiredMessage = 'Это обязательное поле'
  validationMessages = {
        email: {
            required: this.requiredMessage,
            pattern: 'Не верный формат email'
        },
        name: {
            required: this.requiredMessage,
            pattern: 'Только буквы и числа. Длина от 2-х до 25 знаков'
        },
        secondName: {
            required: this.requiredMessage,
            pattern: 'Только буквы и числа. Длина от 2-х до 25 знаков'
        },
        phone: {
            required: this.requiredMessage,
            pattern: 'Не верный формат телефона'
        },
        adress: {
          required: this.requiredMessage,
          minlength: 'Не менее 2-х символов!',
          maxlength: 'Не более 200 символов!'
        }
}
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildUserForm()
  }

  buildUserForm() {
    this.userForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')
      ]],
      name: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]{2,25}$')
      ]],
      secondName: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]{2,25}$')
      ]],
      phone: [ '', [
        Validators.required,
        Validators.pattern('[0-9]{7,9}$')
        
      ]],
      adress: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(200)
      ]],
    })
    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data))
  }

  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
 
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  submit() {
    console.log(this.userForm)
  }
}
