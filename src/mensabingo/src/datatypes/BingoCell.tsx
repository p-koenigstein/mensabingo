export {BingoCell, BingoField}
class BingoCell {

  name: string;
  action: string;
  happened : boolean;

  happenedTime : Date;
  id :number;

  constructor(id: number, name?: string, action?: string, happened?: boolean, happenedTime?: Date) {
    this.id = id;
    if(name){
      this.name = name;
    }
    else{
      this.name ="";
    }
    if(action){
      this.action = action;
    }
    else{
      this.action = "";
    }
    if(happened){
      this.happened = happened;
    }
    else{
      this.happened = false;
    }
    if(happenedTime) {
      this.happenedTime = happenedTime;
    }
    else{
      this.happenedTime = new Date(0);
    }
  }


}

class BingoField {
  field : BingoCell[][];
  thisBingoFinished: boolean;
  finishedBingoCells : BingoCell[];

  constructor() {
    this.field = [];
    for(let i=0;i<5;i++){
      let row:BingoCell[] = []
      for(let j=0;j<5;j++){
        row.push(new BingoCell(-1));
      }
      this.field.push(row);
    }
    this.thisBingoFinished = false;
    this.finishedBingoCells = [];
  }
}
