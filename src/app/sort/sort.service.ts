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
    for (let i = 0; i < 100; i++) {
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
      }, i * 50);
    }
  }

  // Sorts the array with Bubble Sort Algorithm
  onBubbleSort() {
    let barCount = this.arrayToSort.length;
    // Loop through the whole array once
    for (let i = 0; i < barCount - 1; i++) {
      setTimeout(() => {
        // within its iteration of the outer loop, through the array again starting from index 0 always until
        // length of the array minus the current value of i to avoid sorting the last part (already sorted, biggest values are pushed to the end)
        for (let j = 0; j < barCount - i - 1; j++) {
          setTimeout(() => {
            // Compare the value of current index j to the one next to it and swap if value of current index j is greater than the next value
            if (this.arrayToSort[j] > this.arrayToSort[j + 1]) {
              let temp = this.arrayToSort[j];
              this.arrayToSort[j] = this.arrayToSort[j + 1];
              this.arrayToSort[j + 1] = temp;
              this.generateBars("bubble");
            }
          }, i * 2);
        }
      }, i);
    }
  }

  onInsertionSort() {
    let barCount = this.arrayToSort.length;
    for (let i = 1; i < barCount; i++) {
      setTimeout(() => {
        let key = this.arrayToSort[i];
        let j = i - 1;

        while (j >= 0 && this.arrayToSort[j] > key) {
          this.arrayToSort[j + 1] = this.arrayToSort[j];
          j -= 1;
          this.generateBars("insertion");
        }
        this.arrayToSort[j + 1] = key;
        this.generateBars("insertion");
      }, i);
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
      case "insertion": {
        sortButton.addEventListener("click", this.onInsertionSort.bind(this));
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

  languageSelect(language, sortType) {
    let languageUrl = "";
    let languages = document.querySelectorAll(".language");
    languages.forEach((language) => {
      (language as HTMLElement).style.borderBottom = "none";
    });

    switch (language) {
      case "cplusplus": {
        languageUrl =
          "../../../assets/sample_code/sort/" + sortType + "/cplusplus.PNG";
        let el = document.querySelector("#cplusplus") as HTMLElement;
        el.style.borderBottom = "4px solid #3f51b5";
        break;
      }
      case "c": {
        languageUrl = "../../../assets/sample_code/sort/" + sortType + "/c.PNG";
        let el = document.querySelector("#c") as HTMLElement;
        el.style.borderBottom = "4px solid #3f51b5";
        break;
      }
      case "python": {
        languageUrl =
          "../../../assets/sample_code/sort/" + sortType + "/python.PNG";
        let el = document.querySelector("#python") as HTMLElement;
        el.style.borderBottom = "4px solid #3f51b5";
        break;
      }
      case "java": {
        languageUrl =
          "../../../assets/sample_code/sort/" + sortType + "/java.PNG";
        let el = document.querySelector("#java") as HTMLElement;
        el.style.borderBottom = "4px solid #3f51b5";
        break;
      }
      case "csharp": {
        languageUrl =
          "../../../assets/sample_code/sort/" + sortType + "/csharp.PNG";
        let el = document.querySelector("#csharp") as HTMLElement;
        el.style.borderBottom = "4px solid #3f51b5";
        break;
      }
      case "php": {
        languageUrl =
          "../../../assets/sample_code/sort/" + sortType + "/php.PNG";
        let el = document.querySelector("#php") as HTMLElement;
        el.style.borderBottom = "4px solid #3f51b5";
        break;
      }
    }
    return languageUrl;
  }
}
