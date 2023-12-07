import { ChangeDetectorRef, Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-optimization-page',
  templateUrl: './optimization-page.component.html',
  styleUrls: ['./optimization-page.component.css'],
})
export class OptimizationPageComponent {
  public matrix: number[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  public variables: string[] = ['00', '01', '02', '11', '12', '22'];

  public form: FormGroup = this.fb.group({});

  constructor(private cdr: ChangeDetectorRef, private fb: FormBuilder) {}

  generateDynamicForm(numVariables: number): FormGroup {
    const formControls: {
      [key: string]: [
        string,
        (control: AbstractControl<any, any>) => ValidationErrors | null
      ];
    } = {};

    for (let i = 1; i <= numVariables; i++) {
      const controlName = `variable${i}`;
      formControls[controlName] = ['', Validators.required];
    }

    return this.fb.group(formControls);
  }

  onKeyPress(
    value: string,
    id: string,
    toVector: boolean,
    input: HTMLInputElement
  ): void {
    if (!value) return;

    const n: string[] = id.split('');
    if (toVector) {
      const currentValue = parseInt(value);
      const newValue = currentValue / 2;
      console.log(newValue);

      this.matrix[parseInt(n[0])][parseInt(n[1])] = newValue;
      this.matrix[parseInt(n[1])][parseInt(n[0])] = newValue;
      return;
    }

    // TODO: hacerlo bidireccional
    console.log('Current value:', input.value);
    input.value = (parseInt(value) * 2).toString();
    console.log('Updated value:', input.value);

    this.matrix[parseInt(n[0])][parseInt(n[1])] = parseInt(value);
    this.matrix[parseInt(n[1])][parseInt(n[0])] = parseInt(value);
    this.cdr.detectChanges();
  }

  changeVector(variables: string[]): void {
    this.variables = variables;
  }

  changeMatrix(matrix: number[][]): void {
    this.matrix = matrix;
  }
}
