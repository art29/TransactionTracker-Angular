import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import config from '../../envVariables';

const API_URL = `${config.API_URL}/transactions`;

export enum Currencies {
  CAD = 'CAD',
  EUR = 'EUR',
  USD = 'USD',
  GBP = 'GBP',
  CNY = 'CNY',
  AUD = 'AUD',
  CHF = 'CHF',
  HKD = 'HKD',
  SGD = 'SGD',
  SEK = 'SEK',
  NOK = 'NOK',
  DKK = 'DKK',
  CZK = 'CZK',
  AED = 'AED',
  TRY = 'TRY',
  MSX = 'MXN',
}

export interface Transaction {
  id: number;
  user_id: number;
  category_id: number;
  name: string;
  date: string;
  original_price: number;
  original_currency: Currencies;
  final_price: number;
  final_currency: Currencies;
  ignore_from_calculations: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategorySum {
  category_id: number;
  category_name: string;
  sum: number;
}

export interface QuickCreate {
  name: string;
  original_price: number;
  original_currency: string;
  category_id: number;
}

export interface MonthlyTransactions {
  quick_create: QuickCreate[];
  sum_per_category: CategorySum[];
  total_expenses: number;
  total_income: number;
  total_sum: number;
  transactions: Transaction[];
}

export interface ChartsDatasets {
  label: string;
  data: number[];
}

export interface SearchResult {
  name: string;
  category_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactionsToUpdate = new Subject<number | null>();

  constructor(private http: HttpClient) {}

  fetchTransactions$(): Observable<Transaction[]> {
    return this.transactionsToUpdate.pipe(
      startWith(null as unknown),
      switchMap(() => {
        return this.http.get<Transaction[]>(API_URL).pipe(map((res) => res));
      })
    );
  }

  fetchMonthlyTransactions$(
    month: number | null,
    year: number | null
  ): Observable<MonthlyTransactions> {
    return this.transactionsToUpdate.pipe(
      startWith(null as unknown),
      switchMap(() => {
        return this.http.get<MonthlyTransactions>(
          `${API_URL}/month?year=${year}${month ? `&month=${month}` : ''}`
        );
      })
    );
  }

  fetchChartsDatasets$(
    year: number,
    category_ids?: number[] | null
  ): Observable<ChartsDatasets[]> {
    return this.transactionsToUpdate.pipe(
      startWith(null as unknown),
      switchMap(() => {
        return this.http.get<ChartsDatasets[]>(`${API_URL}/charts`, {
          params: {
            year: year,
            ...(category_ids &&
              category_ids.length > 0 &&
              category_ids[0] !== 0 && {
                'category_ids[]': category_ids,
              }),
          },
        });
      })
    );
  }

  searchTransactions$(searchTerm: string): Observable<SearchResult[]> {
    return this.http.get<SearchResult[]>(
      `${API_URL}/search?query=${searchTerm}`
    );
  }

  updateTransaction$(id: number, transaction: Transaction): Observable<number> {
    return this.http.put<number>(`${API_URL}/${id}`, transaction).pipe(
      tap(() => this.transactionsToUpdate.next(id)),
      map((res) => res)
    );
  }
  createTransaction$(transaction: Transaction): Observable<number> {
    return this.http.post<number>(API_URL, transaction).pipe(
      tap(() => this.transactionsToUpdate.next(null)),
      map((res) => res)
    );
  }

  deleteTransaction$(transaction_id: number): Observable<number> {
    return this.http.delete<number>(`${API_URL}/${transaction_id}`).pipe(
      tap(() => this.transactionsToUpdate.next(null)),
      map((res) => res)
    );
  }

  importTransactions$(csvFile: File) {
    let formData: FormData = new FormData();
    formData.append('csv_file', csvFile, csvFile.name);

    return this.transactionsToUpdate.pipe(
      startWith(null as unknown),
      switchMap(() => {
        return this.http.post<Record<string, string>>(
          `${API_URL}/import`,
          formData
        );
      })
    );
  }
}
