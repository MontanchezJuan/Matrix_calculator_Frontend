import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'shared-select-variable',
  templateUrl: './select-variable.component.html',
  styles: ``,
})
export class SelectVariableComponent {
  public numbers = [4, 5, 6, 7, 8, 9, 10];
  public formVector: FormGroup = this.fb.group({});

  @Output()
  public onMatrix: EventEmitter<number[][]> = new EventEmitter();
  @Output()
  public onFormVector: EventEmitter<FormGroup> = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  onSelect(value: string): void {
    const number = parseInt(value);
    this.createMatrix(number);
  }

  createMatrix(number: number): void {
    const matrix: number[][] = [];

    this.formVector = this.fb.group({});

    for (let i = 0; i < number; i++) {
      matrix[i] = [];
      for (let j = 0; j < number; j++) {
        matrix[i][j] = 0;
        if (j >= i) {
          this.formVector.addControl(`${i}${j}`, new FormControl<number>(0));
        }
      }
    }

    this.onMatrix.emit(matrix);
    this.onFormVector.emit(this.formVector);
  }
}
