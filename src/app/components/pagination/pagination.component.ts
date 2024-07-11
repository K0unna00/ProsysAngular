import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnChanges {

  @Input() currentPage: number = 0;
  @Input() dataCount: number = 0;
  @Output() pageChanged = new EventEmitter<number>();

  dataCountArray: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataCount']) {
      this.dataCountArray = Array(this.dataCount).fill(0);
    }
  }

  ChangePage(page : number){
    this.currentPage = page;
    this.pageChanged.emit(this.currentPage)
  }

}
