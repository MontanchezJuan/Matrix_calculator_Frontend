import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { OptimizationServiceService } from '../../../shared/services/optimization-service.service';

import katex from 'katex';
import Swal from 'sweetalert2';

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

  constructor(
    private fb: FormBuilder,
    private os: OptimizationServiceService
  ) {}

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

  optimize() {
    const body = { matriz: this.matrix };

    this.os.optimizar(body).subscribe({
      next: (response) => {
        Swal.fire({
          color: '#0F0F0F',
          confirmButtonColor: '#0F0F0F',
          icon: 'success',
          iconColor: '#0F0F0F',
          text: `${response.valor_propio_dominante}`,
          title: 'Valor propio dominante',
        }).then(() => {
          Swal.fire({
            color: '#0F0F0F',
            confirmButtonColor: '#0F0F0F',
            icon: 'success',
            iconColor: '#0F0F0F',
            text: `[${response.vector_propio_dominante}]`,
            title: 'Vector propio dominante',
          });
        });
      },
      error: (error) => {
        Swal.fire({
          color: '#0F0F0F',
          confirmButtonColor: '#0F0F0F',
          icon: 'error',
          iconColor: '#0F0F0F',
          text: error.message,
          title: 'Error',
        });
      },
    });
  }

  quadratic(number: string): string {
    const split = number.split('');
    return katex.renderToString(`x^${split[0]} x^${split[1]}`);
    // return `<span class="katex"><span class="katex-inner">x</span><sup>${split[0]}</sup></span> <span class="katex"><span class="katex-inner">x</span><sup>${split[1]}</sup></span>`;
  }
}
