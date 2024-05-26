import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsDialogComponent } from './transactions-dialog.component';
import { TransactionService } from '../transactions.service';
import { CategoriesService } from '../../categories/categories.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyConverterService } from '../../components/shared/currency-converter.service';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [TransactionsDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
  ],
  exports: [TransactionsDialogComponent],
  providers: [TransactionService, CategoriesService, CurrencyConverterService],
})
export class TransactionsDialogModule {}
