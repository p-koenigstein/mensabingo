export {BingoCell, BingoField}
class BingoCell {

  name: string;
  action: string;
  happened : boolean;
  id :number;

  constructor(id: number, name?: string, action?: string, happened?: boolean) {
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
  }


}

class BingoField {
  field : BingoCell[][];
  thisBingoFinished: boolean;

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
  }
}
