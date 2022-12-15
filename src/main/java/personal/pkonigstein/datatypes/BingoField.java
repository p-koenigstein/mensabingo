package personal.pkonigstein.datatypes;

import java.util.Collections;
import java.util.List;

public class BingoField {
    private BingoCell[][] field;

    public BingoField(List<BingoCell> fields) {
        //randomize for good measure
        Collections.shuffle(fields);
        this.field = new BingoCell[5][5];
        for(int row=0; row<this.field.length; row++){
            for(int col=0; col<this.field[row].length; col++){
                this.field[row][col] = fields.remove(0);
            }
        }
    }

    public BingoCell[][] getField() {
        return field;
    }

    public boolean hasBingo(){
        //TODO: check if bingo occured
        return false;
    }

    public String[][] toStringField() {
        String[][] stringField = new String[5][5];
        for(int row =0 ; row<field.length; row++){
            for(int col=0; col< field[row].length; col++){
                stringField[row][col] = field[row][col].toString();
            }
        }
        return stringField;
    }
}
