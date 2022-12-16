export {BingoCell, BingoField}
class BingoCell {

  name: string;
  action: string;
  happened : boolean;

  constructor(name?: string, action?: string, happened?: boolean) {
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

  constructor() {
    this.field = [];
    for(let i=0;i<5;i++){
      let row:BingoCell[] = []
      for(let j=0;j<5;j++){
        row.push(new BingoCell());
      }
      this.field.push(row);
    }
  }
}
