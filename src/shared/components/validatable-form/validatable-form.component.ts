import { FormGroup } from '@angular/forms';

export class ValidatableFormComponent {
  form: FormGroup;

  validate(): boolean {
    Object.keys(this.form.controls).forEach(k => {
      this.form.get(k).markAsTouched();
      // this.form.get(k).updateValueAndValidity();
    });

    return this.form.valid;
  }
}
