import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PathInfo } from '../pathInfo.model';
import { Column, Row } from '../Matrix.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent implements OnInit {

  private currentRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly GRID_SIZE: number = 25;
  rows: Row[] = [];
  start: number[] = [0, 0];
  finish: number[] = [24, 24];
  nodeToMove: string = undefined;
  pathInfoTable: PathInfo[] = [];
  searching: boolean = false;
  showReset: boolean = false;

  ngOnInit(): void {
    this.onReset();
  }
  
  onSearch() {
    if(this.searching) {
      return
    }

    this.searching = true;
    this.currentRoute.url.subscribe(([url]) => {
      const { path } = url;
      console.log(url)
      console.log(path)
      switch(path) {
        case 'dijkstra':
            this.onStartDijkstra();
          break;
        case 'astar':
            this.onstartAStar();
          break;
      }

    });
  }

  onReset(): void {
    this.rows = [];
    this.start = [0, 0];
    this.finish = [24, 24];
    this.nodeToMove = undefined;
    this.pathInfoTable = [];
    this.searching = false;
    this.showReset = false;

    for (let i = 0; i < this.GRID_SIZE; i++) {
      const matrixRow = new Row();
      matrixRow.index = i;
      matrixRow.columns = [];

      for (let j = 0; j < this.GRID_SIZE; j++) {

        if (i === 0 && j === 0) {
          matrixRow.columns.push(new Column(j, 0));
        } else {
          matrixRow.columns.push(new Column(j, 1));
        }

        const vertex = new PathInfo();
        vertex.vertex = i + "-" + j;
        vertex.distanceFromOrigin = Infinity;
        vertex.previousVertex = null;
        this.pathInfoTable.push(vertex);
      }

      this.rows.push(matrixRow);
    }

  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }
  
  onDragStart(event): void {
    const element = event.target as HTMLElement;
    this.nodeToMove = element.id;
    event.dataTransfer.setData("text", event.target.id);
  }

  onStopMousePropagation(event: MouseEvent): void {
    event.stopPropagation();
  }

  onDrop(event): void {
    const element = event.target as HTMLElement;
    event.preventDefault();

    if (
      !element.classList.contains("wall") &&
      element.id !== "start" &&
      element.id !== "finish"
    ) {

      if (this.nodeToMove === "start") {
        this.rows[this.start[0]].columns[this.start[1]].value = 1;
        this.start = element.id.split("-").map((x) => parseInt(x));
        this.rows[this.start[0]].columns[this.start[1]].value = 0;
      } else if (this.nodeToMove === "finish") {
        this.finish = element.id.split("-").map((x) => parseInt(x));
      }

      this.nodeToMove = undefined;
      const data = event.dataTransfer.getData("text");
      if (data && data.length > 0) {
        const span = document.getElementById(data) as HTMLElement;
        event.target.appendChild(span);
      }

    }
  }

  onCreateWall(event): void {
    const element = event.target as HTMLElement;
    const fromElement = event.fromElement as HTMLElement;

    if ( event.buttons === 1 
      && element.childElementCount === 0 
      && (!fromElement || fromElement.id !== 'start' && fromElement.id !== 'finish')
    ) {
      element.classList.add("wall");
      const indeces = element.id.split("-").map((index) => parseInt(index));
      this.rows[indeces[0]].columns[indeces[1]].value = null;
    }
  }

  private onStartDijkstra() {
    let visited: string[] = [];
    const startVertex = this.start.join("-");
    this.pathInfoTable.find((x) => x.vertex === startVertex).distanceFromOrigin = 0;

    const dijInterval = setInterval(() => {
      visited = this.checkVertices(visited, false);

      let unvisited: PathInfo[] = this.pathInfoTable.filter(
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
        visited.forEach((vertex) => { (document.getElementById(vertex) as HTMLElement).style.backgroundColor = "#fff"; });
        this.showShortestPath();
      } else {
        unvisited = unvisited.sort((a, b) => a.distanceFromOrigin - b.distanceFromOrigin);
        const nextOrigin = unvisited[0].vertex;
        this.start = nextOrigin.split("-").map((x) => parseInt(x));
        const element = visited[visited.length - 1];
        (document.getElementById(element) as HTMLElement).style.backgroundColor = "#1ec5fc";
      }

    }, 10);
  }

  private onstartAStar() {
    this.searching = true;
    let visited: string[] = [];
    const startVertex = this.start.join("-");

    this.pathInfoTable.find((x) => x.vertex === startVertex).distanceFromOrigin = 0;

    const dijInterval = setInterval(() => {
      visited = this.checkVertices(visited, true);

      let unvisited: PathInfo[] = this.pathInfoTable.filter(
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
        visited.forEach((vertex) => { (document.getElementById(vertex) as HTMLElement).style.backgroundColor = "#fff"; });
        this.showShortestPath();
      } else {
        unvisited = unvisited.sort((a, b) => a.distanceFromOrigin - b.distanceFromOrigin);
        let nextOrigin = unvisited[0].vertex;
        this.start = nextOrigin.split("-").map((x) => parseInt(x));
        let elId = visited[visited.length - 1];
        (document.getElementById(elId) as HTMLElement).style.backgroundColor = "#1ec5fc";
      }
    }, 10);
  }

  private checkVertices(visited: string[], astar: boolean): string[] {

    // Top
    if (this.start[0] - 1 >= 0) {
      let top = [this.start[0] - 1, this.start[1]];
      if (this.rows[top[0]].columns[top[1]].value !== null) {
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
      if (this.rows[right[0]].columns[right[1]].value !== null) {
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
      if (this.rows[bottom[0]].columns[bottom[1]].value !== null) {
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
      if (this.rows[left[0]].columns[left[1]].value !== null) {
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
  
  private calcDistance(previous: number[]): number {
    let distance = 0;
    while (previous && previous.length > 0) {
      distance += 1;
      const previousString = previous.join("-");
      const previousVertex = this.pathInfoTable.find((pathInfo) => pathInfo.vertex === previousString);
      previous = previousVertex.previousVertex 
        ? previousVertex.previousVertex.split("-").map((vertex) => parseInt(vertex))
        : undefined;
    }
    return distance;
  }

  private calcEuclideanDistance(vertex1: number[], vertex2: number[]): number {
    return Math.abs(vertex1[0] - vertex2[0]) + Math.abs(vertex1[1] - vertex2[1]);
  }

  private showShortestPath() {
    const path = [];

    let step = this.pathInfoTable.find(
      (x) => x.vertex === this.finish.join("-")
    );

    path.push(step.vertex);
    while (step.previousVertex) {
      step = this.pathInfoTable.find((x) => x.vertex === step.previousVertex);
      path.push(step.vertex);
    }

    path.pop();

    const showPathInterval = setInterval(() => {
      if (path.length > 0) {
        const vertex = path.pop();
        (document.getElementById(vertex) as HTMLElement).style.backgroundColor = "#1ec5fc";
      } else {
        clearInterval(showPathInterval);
        this.showReset = true;;
        this.searching = false;
      }
    }, 100);
  }
}
