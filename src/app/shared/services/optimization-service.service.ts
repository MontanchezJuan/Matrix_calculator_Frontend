import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OptimizationResponse } from '../interfaces/optimization-response.interface';

interface Body {
  matriz: number[][];
}

@Injectable({
  providedIn: 'root',
})
export class OptimizationServiceService {
  private backend = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  optimizar(matrix: Body): Observable<OptimizationResponse> {
    return this.http.post<OptimizationResponse>(
      `${this.backend}/valor_propio_dominante`,
      matrix
    );
  }
}
