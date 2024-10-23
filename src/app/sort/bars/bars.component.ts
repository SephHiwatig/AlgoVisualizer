import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bars',
  templateUrl: './bars.component.html',
  styleUrl: './bars.component.css'
})
export class BarsComponent implements OnInit, OnDestroy {
  arrayToSort: number[] = []
  timeOuts = [];
  intervals = [];
  showReset: boolean = false;
  private currentRoute = inject(ActivatedRoute)

  constructor() {}

  ngOnInit(): void {
    this.onReset();
  }

  ngOnDestroy(): void {
    this.killAnimation();
  }

  onSort(): void {
      this.currentRoute.url.subscribe(([url]) => {
        const { path } = url;
  
        switch(path) {
          case 'selection':
            this.onSelectionSort();
            break;
          case 'bubble':
            this.onBubbleSort();
            break;
          case 'insertion':
            this.onInsertionSort();
            break;
          case 'quick':
            this.onQuickSort(0, this.arrayToSort.length - 1);
            break;
          default:
        }
    
      });
  }

  onReset(): void {
    this.arrayToSort = [];
    this.timeOuts = [];
    this.intervals = [];
    for(let i = 0; i < 100; i++) {
      this.arrayToSort.push(Math.ceil(Math.random() * 100));
    }
    this.showReset = false;
  }

  private onSelectionSort() {

    // Check that the sort has not yet executed
    if(this.timeOuts.length > 0) {
      return;
    }

    this.timeOuts = [];
    let barCount = this.arrayToSort.length;

    // loop thorugh the length of the array to be sorted
    // setTimeouts are used to show the animation on screen
    for (let i = 0; i < barCount - 1; i++) {

        this.timeOuts.push(
          setTimeout(() => {

            // the current index i will be treated as the lowest value
            let minIndex = i;
  
            // Compare each value after minIndex to value of minIndex
            // if value of minIndex is greater than the value to be compared
            // changed the minIndex to the index of the value to be compared (Confusing @.@)
            for (let j = i + 1; j < barCount; j++) {
              if (this.arrayToSort[j] < this.arrayToSort[minIndex]) {
                minIndex = j;
              }
            }
            
            // swap the value of the minIndex to the value of current i
            const temp = this.arrayToSort[minIndex];
            this.arrayToSort[minIndex] = this.arrayToSort[i];
            this.arrayToSort[i] = temp;

            if(i === barCount - 2) {
              this.showReset = true;
            }

          }, i * 50)
        );

    }

  }

  private onBubbleSort() {

    // Check that the sort has not yet executed
    if(this.timeOuts.length > 0) {
      return;
    }

    this.timeOuts = [];
    let barCount = this.arrayToSort.length;

    // Loop through the whole array once
    for (let i = 0; i < barCount - 1; i++) {
      this.timeOuts.push(

        setTimeout(() => {

          // within its iteration of the outer loop, through the array again starting from index 0 always until
          // length of the array minus the current value of i to avoid sorting the last part (already sorted, biggest values are pushed to the end)
          for (let j = 0; j < barCount - i - 1; j++) {
            this.timeOuts.push(
              setTimeout(() => {

                // Compare the value of current index j to the one next to it and swap if value of current index j is greater than the next value
                if (this.arrayToSort[j] > this.arrayToSort[j + 1]) {
                  let temp = this.arrayToSort[j];
                  this.arrayToSort[j] = this.arrayToSort[j + 1];
                  this.arrayToSort[j + 1] = temp;
                }

                if(i === barCount - 2) {
                  this.showReset = true;
                }

              }, i * 100)
            );
          }

        }, i)

      );
    }

  }

  private onInsertionSort() {

    this.intervals = [];
    let barCount = this.arrayToSort.length;
    let insertionTracker = 1;

    const inserttionInterval = setInterval(() => {

      this.intervals.push(

        setInterval(() => {

          let key = this.arrayToSort[insertionTracker];
          let j = insertionTracker - 1;

          while (j >= 0 && this.arrayToSort[j] > key) {
            this.arrayToSort[j + 1] = this.arrayToSort[j];
            j -= 1;
          }

          this.arrayToSort[j + 1] = key;
          insertionTracker++;

          if(insertionTracker === barCount)  {
            clearInterval(inserttionInterval);
            this.killAnimation();
            this.showReset = true;
          }

        }, insertionTracker * 200)

      );

    }, 100)

  }

  private onQuickSort(low: number, high: number) {

    this.timeOuts = [];
    this.timeOuts.push(
      setTimeout(() => {
        if (low < high) {
          let pivot = this.arrayToSort[high];
          let i = low - 1;
          for (var j = low; j < high; j++) {
            if (this.arrayToSort[j] < pivot) {
              i++;
              let temp = this.arrayToSort[i];
              this.arrayToSort[i] = this.arrayToSort[j];
              this.arrayToSort[j] = temp;
            }
          }
          let temp1 = this.arrayToSort[i + 1];
          this.arrayToSort[i + 1] = this.arrayToSort[high];
          this.arrayToSort[high] = temp1;
          i = i + 1;
          
          this.timeOuts.push(
            setTimeout(() => {
              this.onQuickSort(low, i - 1);
            }, 100)
          );
          
          this.timeOuts.push(
            setTimeout(() => {
              this.onQuickSort(i + 1, high);
            }, 100)
          )

        } else {
          this.showReset = true;
        }
      })
    );

  }

  private killAnimation() {
    this.timeOuts.forEach((timeOut) => {
      clearTimeout(timeOut);
    });
    this.intervals.forEach((timeOut) => {
      clearInterval(timeOut);
    });
  }
}
