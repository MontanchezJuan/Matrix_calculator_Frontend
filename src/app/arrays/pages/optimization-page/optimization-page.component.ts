import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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

  public formVector: FormGroup = this.fb.group({
    '00': new FormControl<number>(0),
    '01': new FormControl<number>(0),
    '02': new FormControl<number>(0),
    '11': new FormControl<number>(0),
    '12': new FormControl<number>(0),
    '22': new FormControl<number>(0),
  });

  constructor(private fb: FormBuilder) {}

  onKeyPress(value: string, id: string, fromVector: boolean): void {
    if (!value) return;

    const idSplited: string[] = id.split('');
    const currentValue: number = parseFloat(value);

    if (fromVector) {
      this.changeValueToMatrix(idSplited, currentValue);
    } else {
      this.changeValueToVector(idSplited, id, currentValue);
    }
  }

  changeValueToMatrix(idSplited: string[], value: number) {
    if (parseInt(idSplited[0]) !== parseInt(idSplited[1])) {
      const newValue = value / 2;
      this.matrix[parseInt(idSplited[0])][parseInt(idSplited[1])] = newValue;
      this.matrix[parseInt(idSplited[1])][parseInt(idSplited[0])] = newValue;
      return;
    }

    this.matrix[parseInt(idSplited[0])][parseInt(idSplited[1])] = value;
  }

  changeValueToVector(idSplited: string[], id: string, value: number) {
    let newId: string = id;

    if (!this.formVector.contains(id)) {
      newId = `${idSplited[1]}${idSplited[0]}`;
    }

    if (parseInt(idSplited[0]) !== parseInt(idSplited[1])) {
      this.formVector.controls[newId].setValue(value * 2);
    } else {
      this.formVector.controls[newId].setValue(value);
    }

    this.matrix[parseInt(idSplited[0])][parseInt(idSplited[1])] = value;
    this.matrix[parseInt(idSplited[1])][parseInt(idSplited[0])] = value;
  }

  changeMatrix(matrix: number[][]): void {
    this.matrix = matrix;
  }

  changeFormVector(formVector: FormGroup): void {
    this.formVector = formVector;
  }

  log() {
    console.log(this.matrix);
  }
}
