export class Row {
  index: number;
  columns: Column[]
}

export class Column {
    
  index: number;
  value: number
    
  constructor(index: number, value: number) {
    this.index = index;
    this.value = value;
  }
}