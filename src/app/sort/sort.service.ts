import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SortService {
  arrayToSort = [];

  constructor() {}

  // Repopulate the arrayToSort variable
  // with random values
  populateArray() {
    this.arrayToSort = [];
    for (let i = 0; i < 75; i++) {
      this.arrayToSort.push(Math.ceil(Math.random() * 100));
    }
  }

  // Sorts the array with Selection Sort Algorithm
  onSelectionSort() {
    let barCount = this.arrayToSort.length;
    // loop thorugh the length of the array to be sorted
    // setTimeouts are used to show the animation on screen
    for (let i = 0; i < barCount - 1; i++) {
      setTimeout(() => {
        // the current index i will be treated as the lowest value
        let minIndex = i;

        setTimeout(() => {
          // Compare each value after minIndex to value of minIndex
          // if value of minIndex is greater than the value to be compared
          // changed the minIndex to the index of the value to be compared (Confusing @.@)
          for (let j = i + 1; j < barCount; j++) {
            if (this.arrayToSort[j] < this.arrayToSort[minIndex]) {
              minIndex = j;
            }
          }
          // swap the value of the minIndex to the value of current i
          let temp = this.arrayToSort[minIndex];
          this.arrayToSort[minIndex] = this.arrayToSort[i];
          this.arrayToSort[i] = temp;
          this.generateBars("selection");
        }, i * 60);
      }, i * 50);
    }
  }

  onBubbleSort() {
    console.log("executing bubble");
    let barCount = this.arrayToSort.length;
    for (let i = 0; i < barCount - 1; i++) {
      setTimeout(() => {
        for (let j = 0; j < barCount - i - 1; j++) {
          setTimeout(() => {
            if (this.arrayToSort[j] > this.arrayToSort[j + 1]) {
              let temp = this.arrayToSort[j];
              this.arrayToSort[j] = this.arrayToSort[j + 1];
              this.arrayToSort[j + 1] = temp;
              this.generateBars("bubble");
            }
          }, i * 30);
        }
      }, i * 20);
    }
  }

  generateBars(sortType) {
    // get the element that will contain the algorithm animation
    const visualContainer = document.querySelector(
      ".algo-visual"
    ) as HTMLElement;
    // Clear the elements inside
    // This is needed because this function will be called in each iteration of the sort
    visualContainer.innerHTML = "";
    // Add the sort button
    var sortButton = document.createElement("button");
    sortButton.innerHTML = "Sort";
    sortButton.style.position = "absolute";
    sortButton.style.top = "5px";
    sortButton.style.left = "5px";
    sortButton.style.border = "none";
    sortButton.style.backgroundColor = "#428df5";
    sortButton.style.color = "#fff";
    sortButton.style.padding = "10px";
    sortButton.style.borderRadius = "4px";
    sortButton.style.cursor = "pointer";
    // Determine the type of sort that the button will execute
    switch (sortType) {
      case "selection": {
        sortButton.addEventListener("click", this.onSelectionSort.bind(this));
        break;
      }
      case "bubble": {
        sortButton.addEventListener("click", this.onBubbleSort.bind(this));
        break;
      }
    }
    visualContainer.appendChild(sortButton);
    // Loop through the array to sort and create a div element
    // based on the random value
    this.arrayToSort.forEach((size) => {
      const bar = document.createElement("div");
      bar.style.height =
        Math.floor((size / 100) * visualContainer.clientHeight) + "px";
      bar.style.width = "10px";
      bar.style.marginLeft = "2px";
      bar.style.marginRight = "2px";
      bar.style.backgroundColor = "#428df5";
      bar.setAttribute("class", "bar");
      visualContainer.appendChild(bar);
    });
  }
}
