import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-select-variable',
  templateUrl: './select-variable.component.html',
  styles: ``,
})
export class SelectVariableComponent {
  public numbers = [4, 5, 6, 7, 8, 9, 10];

  @Output()
  public onMatrix: EventEmitter<number[][]> = new EventEmitter();
  @Output()
  public onVector: EventEmitter<string[]> = new EventEmitter();

  onSelect(value: string): void {
    const number = parseInt(value);
    this.createMatrix(number);
  }

  createMatrix(number: number): void {
    const matrix: number[][] = [];
    let count: number = 0;
    const variables: string[] = [];

    for (let i = 0; i < number; i++) {
      matrix[i] = [];
      for (let j = 0; j < number; j++) {
        matrix[i][j] = 0;
        if (j >= i) {
          variables[count] = `${i}${j}`;
          count = count + 1;
        }
      }
    }
    this.onVector.emit(variables);
    this.onMatrix.emit(matrix);
  }
}
