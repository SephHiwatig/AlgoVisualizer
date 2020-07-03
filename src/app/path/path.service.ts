import { Injectable } from "@angular/core";
import { parse } from "querystring";
import { PathInfo } from "./dijkstra.model";

@Injectable({
  providedIn: "root",
})
export class PathService {
  matrix = [];
  start = [0, 0];
  finish = [24, 24];
  nodeToMove;
  pathInfoTable: PathInfo[] = [];
  GRID_SIZE = 25;

  constructor() {}

  generateGrid() {
    this.matrix = [];
    this.start = [0, 0];
    this.finish = [this.GRID_SIZE - 1, this.GRID_SIZE - 1];
    this.nodeToMove = undefined;
    this.pathInfoTable = [];
    const visualContainer = document.querySelector(
      ".algo-visual"
    ) as HTMLElement;
    visualContainer.style.flexDirection = "column";
    // create 10 rows
    for (let i = 0; i < this.GRID_SIZE; i++) {
      let row = document.createElement("div");
      row.style.width = "100%";
      row.style.display = "flex";
      row.style.flex = "1";
      row.draggable = false;
      let matrixRow = [];
      // create 10 columns
      for (let j = 0; j < this.GRID_SIZE; j++) {
        let col = document.createElement("div");
        col.style.flex = "1";
        col.style.backgroundColor = "#fff";
        col.style.borderRadius = "4px";
        col.style.margin = "1px";
        col.style.border = "1px solid #fff";
        col.setAttribute("class", "col");
        col.setAttribute("id", i + "-" + j);
        col.style.cursor = "pointer";
        col.style.display = "flex";
        col.draggable = false;

        col.addEventListener("drop", (event) => {
          this.drop(event);
        });
        col.addEventListener("dragover", (event) => {
          this.allowDrop(event);
        });
        col.addEventListener("mouseenter", (event) => {
          if (event.buttons === 1) {
            const el = event.target as HTMLElement;
            if (el.childElementCount === 0) {
              let indeces = el.id.split("-").map((x) => parseInt(x));
              this.matrix[indeces[0]][indeces[1]] = null;
              el.style.backgroundColor = "#2b2b2b";
              el.classList.add("wall");
            }
          }
        });
        col.addEventListener("mousedown", (event) => {
          const el = event.target as HTMLElement;
          if (el.childElementCount === 0) {
            let indeces = el.id.split("-").map((x) => parseInt(x));
            this.matrix[indeces[0]][indeces[1]] = null;
            el.style.backgroundColor = "#2b2b2b";
            el.classList.add("wall");
          }
        });

        if (i === 0 && j === 0) {
          matrixRow.push(0);
          let img = document.createElement("img");
          img.style.maxWidth = "100%";
          img.style.maxHeight = "100%";
          img.style.margin = "auto";
          img.setAttribute("src", "./assets/imgs/start.png");
          img.setAttribute("id", "start");
          img.draggable = true;
          img.addEventListener("dragstart", (event) => {
            this.drag(event);
          });
          img.addEventListener("mousedown", (event) => {
            event.stopPropagation();
          });
          col.appendChild(img);
        } else {
          matrixRow.push(1);
        }

        if (i === this.GRID_SIZE - 1 && j === this.GRID_SIZE - 1) {
          let img = document.createElement("img");
          img.style.maxWidth = "100%";
          img.style.maxHeight = "100%";
          img.style.margin = "auto";
          img.setAttribute("src", "./assets/imgs/finish.png");
          img.setAttribute("id", "finish");
          img.addEventListener("dragstart", (event) => {
            this.drag(event);
          });
          img.addEventListener("mousedown", (event) => {
            event.stopPropagation();
          });
          col.appendChild(img);
        }
        row.appendChild(col);

        const vertex = new PathInfo();
        vertex.vertex = i + "-" + j;
        vertex.distanceFromOrigin = Infinity;
        vertex.previousVertex = null;
        this.pathInfoTable.push(vertex);
      }
      this.matrix.push(matrixRow);
      visualContainer.appendChild(row);
    }
  }

  startDijkstra() {
    let visited = [];
    // let unvisited = this.matrix.map((row) => {
    //   return row.filter((col) => col !== null);
    // });
    const startVertex = this.start.join("-");
    this.pathInfoTable.find(
      (x) => x.vertex === startVertex
    ).distanceFromOrigin = 0;

    let dijInterval = setInterval(() => {
      visited = this.checkVertices(visited, false);
      let unvisited = this.pathInfoTable.filter(
        (x) =>
          x.distanceFromOrigin !== 0 &&
          x.previousVertex !== null &&
          x.distanceFromOrigin !== Infinity &&
          !visited.includes(x.vertex)
      );
      if (
        !unvisited ||
        unvisited.length === 0 ||
        visited.includes(this.finish.join("-"))
      ) {
        clearInterval(dijInterval);
        visited.forEach((vertex) => {
          (document.getElementById(
            vertex
          ) as HTMLElement).style.backgroundColor = "#fff";
        });
        this.showShortestPath();
      } else {
        unvisited = unvisited.sort(
          (a, b) => a.distanceFromOrigin - b.distanceFromOrigin
        );
        let nextOrigin = unvisited[0].vertex;
        this.start = nextOrigin.split("-").map((x) => parseInt(x));
        let elId = visited[visited.length - 1];
        (document.getElementById(elId) as HTMLElement).style.backgroundColor =
          "#1ec5fc";
      }
    }, 10);
  }

  startAStar() {
    let visited = [];
    // let unvisited = this.matrix.map((row) => {
    //   return row.filter((col) => col !== null);
    // });
    const startVertex = this.start.join("-");
    this.pathInfoTable.find(
      (x) => x.vertex === startVertex
    ).distanceFromOrigin = 0;

    let dijInterval = setInterval(() => {
      visited = this.checkVertices(visited, true);
      let unvisited = this.pathInfoTable.filter(
        (x) =>
          x.distanceFromOrigin !== 0 &&
          x.previousVertex !== null &&
          x.distanceFromOrigin !== Infinity &&
          !visited.includes(x.vertex)
      );
      if (
        !unvisited ||
        unvisited.length === 0 ||
        visited.includes(this.finish.join("-"))
      ) {
        clearInterval(dijInterval);
        visited.forEach((vertex) => {
          (document.getElementById(
            vertex
          ) as HTMLElement).style.backgroundColor = "#fff";
        });
        this.showShortestPath();
      } else {
        unvisited = unvisited.sort(
          (a, b) => a.distanceFromOrigin - b.distanceFromOrigin
        );
        let nextOrigin = unvisited[0].vertex;
        this.start = nextOrigin.split("-").map((x) => parseInt(x));
        let elId = visited[visited.length - 1];
        (document.getElementById(elId) as HTMLElement).style.backgroundColor =
          "#1ec5fc";
      }
    }, 10);
  }

  private showShortestPath() {
    let path = [];
    let step = this.pathInfoTable.find(
      (x) => x.vertex === this.finish.join("-")
    );
    path.push(step.vertex);
    while (step.previousVertex) {
      step = this.pathInfoTable.find((x) => x.vertex === step.previousVertex);
      path.push(step.vertex);
    }
    path.pop();
    let showPathInterval = setInterval(() => {
      if (path.length > 0) {
        let vertex = path.pop();
        (document.getElementById(vertex) as HTMLElement).style.backgroundColor =
          "#1ec5fc";
      } else {
        clearInterval(showPathInterval);
      }
    }, 100);
  }

  private checkVertices(visited, astar: boolean) {
    // Top
    if (this.start[0] - 1 >= 0) {
      let top = [this.start[0] - 1, this.start[1]];
      if (this.matrix[top[0]][top[1]] !== null) {
        let previous = [top[0] + 1, top[1]];
        let distance = this.calcDistance(previous);
        if (astar) {
          distance += this.calcEuclideanDistance(top, this.finish);
        }
        let pathToUpdate = this.pathInfoTable.find(
          (x) => x.vertex === top.join("-")
        );
        if (distance < pathToUpdate.distanceFromOrigin) {
          pathToUpdate.distanceFromOrigin = distance;
          pathToUpdate.previousVertex = previous.join("-");
        }
      }
    }
    // Right
    if (this.start[1] + 1 <= this.GRID_SIZE - 1) {
      let right = [this.start[0], this.start[1] + 1];
      if (this.matrix[right[0]][right[1]] !== null) {
        let previous = [right[0], right[1] - 1];
        let distance = this.calcDistance(previous);
        if (astar) {
          distance += this.calcEuclideanDistance(right, this.finish);
        }
        let pathToUpdate = this.pathInfoTable.find(
          (x) => x.vertex === right.join("-")
        );
        if (distance < pathToUpdate.distanceFromOrigin) {
          pathToUpdate.distanceFromOrigin = distance;
          pathToUpdate.previousVertex = previous.join("-");
        }
      }
    }
    // Bottom
    if (this.start[0] + 1 <= this.GRID_SIZE - 1) {
      let bottom = [this.start[0] + 1, this.start[1]];
      if (this.matrix[bottom[0]][bottom[1]] !== null) {
        let previous = [bottom[0] - 1, bottom[1]];
        let distance = this.calcDistance(previous);
        if (astar) {
          distance += this.calcEuclideanDistance(bottom, this.finish);
        }
        let pathToUpdate = this.pathInfoTable.find(
          (x) => x.vertex === bottom.join("-")
        );
        if (distance < pathToUpdate.distanceFromOrigin) {
          pathToUpdate.distanceFromOrigin = distance;
          pathToUpdate.previousVertex = previous.join("-");
        }
      }
    }
    // Left
    if (this.start[1] - 1 >= 0) {
      let left = [this.start[0], this.start[1] - 1];
      if (this.matrix[left[0]][left[1]] !== null) {
        let previous = [left[0], left[1] + 1];
        let distance = this.calcDistance(previous);
        if (astar) {
          distance += this.calcEuclideanDistance(left, this.finish);
        }
        let pathToUpdate = this.pathInfoTable.find(
          (x) => x.vertex === left.join("-")
        );
        if (distance < pathToUpdate.distanceFromOrigin) {
          pathToUpdate.distanceFromOrigin = distance;
          pathToUpdate.previousVertex = previous.join("-");
        }
      }
    }
    visited.push(this.start.join("-"));
    return visited;
  }

  private calcDistance(previous: number[]) {
    let distance = 0;
    while (previous && previous.length > 0) {
      distance += 1;
      let previousString = previous.join("-");
      let previousVertex = this.pathInfoTable.find(
        (x) => x.vertex === previousString
      );
      if (previousVertex.previousVertex) {
        previous = previousVertex.previousVertex
          .split("-")
          .map((x) => parseInt(x));
      } else {
        previous = undefined;
      }
    }
    return distance;
  }

  private calcEuclideanDistance(vertex1: number[], vertex2: number[]) {
    return (
      Math.abs(vertex1[0] - vertex2[0]) + Math.abs(vertex1[1] - vertex2[1])
    );
  }

  private allowDrop(ev) {
    ev.preventDefault();
  }

  private drag(ev) {
    let el = ev.target as HTMLElement;
    this.nodeToMove = el.id;
    ev.dataTransfer.setData("text", ev.target.id);
  }

  private drop(ev) {
    let el = ev.target as HTMLElement;
    ev.preventDefault();
    if (
      !el.classList.contains("wall") &&
      el.id !== "start" &&
      el.id !== "finish"
    ) {
      if (this.nodeToMove === "start") {
        this.matrix[this.start[0]][this.start[1]] = 1;
        this.start = el.id.split("-").map((x) => parseInt(x));
        this.matrix[this.start[0]][this.start[1]] = 0;
      } else if (this.nodeToMove === "finish") {
        this.finish = el.id.split("-").map((x) => parseInt(x));
      }
      this.nodeToMove = undefined;
      let data = ev.dataTransfer.getData("text");
      if (data && data.length > 0 && data !== "") {
        let img = document.getElementById(data) as HTMLElement;
        ev.target.appendChild(img);
      }
    }
  }
}
