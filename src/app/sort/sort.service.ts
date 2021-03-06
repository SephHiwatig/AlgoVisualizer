import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SortService {
  arrayToSort = [];
  timeOuts = [];
  intervals = [];

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
          let temp = this.arrayToSort[minIndex];
          this.arrayToSort[minIndex] = this.arrayToSort[i];
          this.arrayToSort[i] = temp;
          this.generateBars("selection");
          if(i === barCount - 2) {
            this.showReset();
          }
        }, i * 50)
      );
    }
  }

  // Sorts the array with Bubble Sort Algorithm
  onBubbleSort() {
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
                  this.generateBars("bubble");
                }

                if(i === barCount - 2) {
                  this.showReset();
                }

              }, i * 2)
            );
          }
        }, i)
      );
    }
  }

  onInsertionSort() {
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
            // this.generateBars("insertion");
          }
          this.arrayToSort[j + 1] = key;
          this.generateBars("insertion");
          insertionTracker++;
          if(insertionTracker === barCount)  {
            clearInterval(inserttionInterval);
            this.killAnimation();
            this.showReset();
          }
        }, insertionTracker * 200)
      );
    }, 100)

    // for (let i = 1; i < barCount; i++) {
    //   this.timeOuts.push(
    //     setTimeout(() => {
    //       let key = this.arrayToSort[i];
    //       let j = i - 1;

    //       while (j >= 0 && this.arrayToSort[j] > key) {
    //         this.arrayToSort[j + 1] = this.arrayToSort[j];
    //         j -= 1;
    //         this.generateBars("insertion");
    //       }
    //       this.arrayToSort[j + 1] = key;
    //       this.generateBars("insertion");
    //     }, i)
    //   );
    //  }
  
  }

  onQuickSort(low: number, high: number) {
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
              this.generateBars("quick");
            }
          }
          let temp1 = this.arrayToSort[i + 1];
          this.arrayToSort[i + 1] = this.arrayToSort[high];
          this.arrayToSort[high] = temp1;
          this.generateBars("quick");
          i = i + 1;

          this.onQuickSort(low, i - 1);
          this.onQuickSort(i + 1, high);
        } else {
          this.showReset();
        }
      })
    );
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
    sortButton.classList.add("sort-btn");
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
      case "quick": {
        sortButton.addEventListener(
          "click",
          this.onQuickSort.bind(this, 0, this.arrayToSort.length - 1)
        );
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
      let width = Math.ceil((visualContainer.clientWidth - 200) / 100);
      bar.style.width = width + "px";
      bar.setAttribute("class", "bar");
      visualContainer.appendChild(bar);
    });
  }

  killAnimation() {
    this.timeOuts.forEach((timeOut) => {
      clearTimeout(timeOut);
    });
    this.intervals.forEach((timeOut) => {
      clearInterval(timeOut);
    });
  }

  languageSelect(language, sortType) {
    let languageUrl = "";
    let languages = document.querySelectorAll(".language");
    languages.forEach((language) => {
      // (language as HTMLElement).style.borderBottom = "none";
      (language as HTMLElement).classList.remove("active-menu");
    });

    switch (language) {
      case "cplusplus": {
        languageUrl =
          "../../../assets/sample_code/sort/" + sortType + "/cplusplus.PNG";
        let el = document.querySelector("#cplusplus") as HTMLElement;
        el.classList.add("active-menu");
        break;
      }
      case "c": {
        languageUrl = "../../../assets/sample_code/sort/" + sortType + "/c.PNG";
        let el = document.querySelector("#c") as HTMLElement;
        el.classList.add("active-menu");
        break;
      }
      case "python": {
        languageUrl =
          "../../../assets/sample_code/sort/" + sortType + "/python.PNG";
        let el = document.querySelector("#python") as HTMLElement;
        el.classList.add("active-menu");
        break;
      }
      case "java": {
        languageUrl =
          "../../../assets/sample_code/sort/" + sortType + "/java.PNG";
        let el = document.querySelector("#java") as HTMLElement;
        el.classList.add("active-menu");
        break;
      }
      case "csharp": {
        languageUrl =
          "../../../assets/sample_code/sort/" + sortType + "/csharp.PNG";
        let el = document.querySelector("#csharp") as HTMLElement;
        el.classList.add("active-menu");
        break;
      }
      case "php": {
        languageUrl =
          "../../../assets/sample_code/sort/" + sortType + "/php.PNG";
        let el = document.querySelector("#php") as HTMLElement;
        el.classList.add("active-menu");
        break;
      }
    }
    return languageUrl;
  }

  private showReset() {
    const visualContainer = document.querySelector(
      ".algo-visual"
    ) as HTMLElement;
    let resetContainer = document.createElement("div");
    resetContainer.style.margin = "auto";
    resetContainer.style.top = "35%";
    resetContainer.style.position = "absolute";
    resetContainer.style.zIndex = "999";
    resetContainer.style.background = "#fff";
    resetContainer.style.border = "1px solid grey";
    resetContainer.style.padding = "10px";
    resetContainer.style.borderRadius = "4px";
    resetContainer.style.textAlign = "center";
    resetContainer.style.minWidth = "100px";

    let found = document.createElement("p");
    found.innerHTML =
      "Reset";
    let resetBtn = document.createElement("button");
    resetBtn.innerHTML = "Reset";
    resetBtn.style.borderRadius = "4px";
    resetBtn.style.padding = "5px";
    resetBtn.style.background = "#1fa638";
    resetBtn.style.border = "none";
    resetBtn.style.cursor = "pointer";
    resetBtn.addEventListener("click", () => {
      window.location.reload();
    });
    resetContainer.appendChild(found);
    resetContainer.appendChild(resetBtn);

    visualContainer.appendChild(resetContainer);
  }
}
