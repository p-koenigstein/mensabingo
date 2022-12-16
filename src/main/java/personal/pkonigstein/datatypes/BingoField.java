package personal.pkonigstein.datatypes;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

public class BingoField {
    private BingoCell[][] field;
    private List<BingoCell> cells;

    public BingoField(List<BingoCell> fields) {
        //randomize for good measure
        Collections.shuffle(fields);
        this.field = new BingoCell[5][5];
        this.cells = new ArrayList<>();
        for(int row=0; row<this.field.length; row++){
            for(int col=0; col<this.field[row].length; col++){
                BingoCell currentCell = fields.remove(0);
                this.field[row][col] = currentCell;
                this.cells.add(currentCell);
            }
        }
    }

    public BingoCell[][] getField() {
        return field;
    }

    public boolean checkBingo(){
        //Check bingo via cells list
        for(int i=0; i<5; i++){
            boolean rowBingo = true;
            boolean colBingo = true;
            for(int j=0;j<5;j++){
                //next element in row
                BingoCell nextRowElem = field[i][j];
                rowBingo = rowBingo && nextRowElem.isHappened();
                //next element in col
                BingoCell nextColElem = field[j][i];
                colBingo = colBingo && nextColElem.isHappened();
            }
            if(rowBingo || colBingo){
                return true;
            }
        }
        return false;
    }


    public void acceptCell(BingoCell cell) {
        Optional<BingoCell> foundCell = cells.stream().filter(c -> c.getId()==cell.getId()).findFirst();
        foundCell.ifPresent(bingoCell -> bingoCell.setHappened(true));
        //TODO: do sth with this output:
        System.out.println("Bingo?: "+checkBingo());
    }
}
