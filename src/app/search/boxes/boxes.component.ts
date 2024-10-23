import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrl: './boxes.component.css'
})
export class BoxesComponent implements OnInit, OnDestroy {
  
  private currentRoute:ActivatedRoute = inject(ActivatedRoute);
  arrayToSearch: number[] = [];
  valueToSearch: number;
  searchValueIndex?: number;
  timeOuts = [];
  numOfBoxes: number;
  showReset: boolean = false;
  searching: boolean = false;

  ngOnInit(): void {
    this.onReset();
  }

  ngOnDestroy(): void {
    
  }

  onSearch() {
    this.searching = true;
    this.currentRoute.url.subscribe(([url]) => {
      const { path } = url;

      switch(path) {
        case 'linear':
            this.onLinearSearch();
          break;
        case 'binary':
            this.onBinarySearch();
          break;
        case 'jump':
            this.onJumpSearch();
          break;
      }

    });
  }

  onReset(): void {
    this.currentRoute.url.subscribe(([url]) => {

        const { path } = url;
        const sorted = path !== 'linear';
        this.numOfBoxes = 20;
        this.arrayToSearch = [];
        this.timeOuts = [];
        this.searchValueIndex = undefined;
        this.showReset = false;
        const multiplier = Math.ceil(Math.random() * 5);
        
        for (let i = 0; i < 20; i++) {
          if(sorted)
            this.arrayToSearch.push(i * multiplier);
          else
            this.arrayToSearch.push(Math.ceil(Math.random() * 100));
        }
        
        const randomIndex = Math.ceil(Math.random() * 20) - 1;
        this.valueToSearch = this.arrayToSearch[randomIndex];
        const boxes = document.querySelectorAll(".box");
        boxes.forEach(box => (box as HTMLElement).style.backgroundColor = "#428df5")
      });
  }

  private onLinearSearch() {
    const boxCount = this.arrayToSearch.length;
    const boxes = document.querySelectorAll(".box");
    for (let i = 0; i < boxCount; i++) {
      this.timeOuts.push(
        setTimeout(() => {
          (boxes[i] as HTMLElement).style.backgroundColor = "#e91e63";
          if (i > 0) {
            (boxes[i - 1] as HTMLElement).style.backgroundColor = "#428df5";
          }
          if (this.arrayToSearch[i] === this.valueToSearch) {
            this.killAnimation();
            (boxes[i] as HTMLElement).style.backgroundColor = "green";
            this.searchValueIndex = i;
            this.showReset = true;
            this.searching = false;
          }
        }, i * 1000)
      );
    }
  }

  private onBinarySearch() {
    const boxes = document.querySelectorAll(".box");
    let min = 0;
    let max = this.arrayToSearch.length - 1;
    let previousMid;

    for (let i = 0; i < 5; i++) {
      this.timeOuts.push(
        setTimeout(() => {
          if (previousMid) {
            (boxes[previousMid] as HTMLElement).style.backgroundColor = "#000";
          }
          let mid = Math.floor(min + (max - min) / 2);
          previousMid = mid;
          (boxes[mid] as HTMLElement).style.backgroundColor = "#e91e63";
          if (this.arrayToSearch[mid] === this.valueToSearch) {
            (boxes[mid] as HTMLElement).style.backgroundColor = "green";
            this.killAnimation();
            this.showReset = true;
            this.searching = false;
            i = 5;
          }
          if (this.arrayToSearch[mid] < this.valueToSearch) min = mid + 1;
          else max = mid - 1;
        }, i * 1000)
      );
    }
  }
  
  private onJumpSearch() {
    const boxes = document.querySelectorAll(".box");
    const boxCount = this.arrayToSearch.length;
    let step = Math.floor(Math.sqrt(boxCount));
    let prev = 0;
    (boxes[prev] as HTMLElement).style.backgroundColor = "#e91e63";

    let tempInt = setInterval(() => {
      if (
        this.arrayToSearch[Math.min(step, boxCount) - 1] < this.valueToSearch
      ) {
        prev = step;
        (boxes[prev] as HTMLElement).style.backgroundColor = "#e91e63";
        step += Math.floor(Math.sqrt(boxCount));
      } else {
        if (boxes[step]) {
          (boxes[step] as HTMLElement).style.backgroundColor = "#e91e63";
        }
        clearInterval(tempInt);
        let tempInt2 = setInterval(() => {
          if (this.arrayToSearch[prev] < this.valueToSearch) {
            (boxes[prev] as HTMLElement).style.backgroundColor = "#e9a21e";
            prev++;
            if (prev == Math.min(step, boxCount)) {
              clearInterval(tempInt2);
            }
          } else {
            if (this.arrayToSearch[prev] == this.valueToSearch) {
              (boxes[prev] as HTMLElement).style.backgroundColor = "green";
              clearInterval(tempInt2);
              this.showReset = true;
              this.searching = false;
            }
          }
        }, 1000);
      }
    }, 1000);
  }

  private killAnimation() {
    this.timeOuts.forEach((to) => {
      clearTimeout(to);
    });

    this.timeOuts = [];
  }
}
