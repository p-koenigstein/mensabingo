
export class BingoCell {

  name: string;
  action: string;
  happened : boolean;

  happenedTime : string;
  id :number;
  anyoneWho:string;

  constructor(id: number, name?: string, action?: string, happened?: boolean, happenedTime?: string, anyoneWho?:string) {
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
      this.happenedTime = "";
    }
    if(anyoneWho){
      this.anyoneWho = anyoneWho;
    }
    else{
      this.anyoneWho ="";
    }
  }


}

export class BingoField {
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

export const anyoneNames=["Irgendwer", "Irgendjemand", "anyone", "Jemand"]

