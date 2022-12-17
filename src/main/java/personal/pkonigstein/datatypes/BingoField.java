package personal.pkonigstein.datatypes;

import org.springframework.data.util.Pair;

import java.util.*;
import java.util.stream.Collectors;

public class BingoField {

    private static int[][][] bingoAxes;
    private BingoCell[][] field;
    private List<BingoCell> cells;
    private boolean thisBingoFinished = false;
    private List<BingoCell> finishedBingoCells;

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
        this.finishedBingoCells = new ArrayList<>();
        if(bingoAxes==null){
            int[][][] axes = new int[12][5][2];
            // row bingos
            for(int i =0; i<5;i++){
                for(int j=0;j<5;j++){
                    axes[i][j][0] = i;
                    axes[i][j][1] = j;
                }
            }
            // col bingos
            for(int i =0; i<5;i++){
                for(int j=0;j<5;j++){
                    axes[5+i][j][0] = j;
                    axes[5+i][j][1] = i;
                }
            }
            // diag bingos
            for(int i=0;i<5;i++){
                axes[11][i][0]=i;
                axes[11][i][1]=i;
                axes[10][i][0]=4-i;
                axes[10][i][1]=i;
            }
            bingoAxes = axes;
        }
    }


    public void checkBingo() {
        bingoLoop:
        for(int[][] currentlyCheckedFields : bingoAxes){
            for(int[] currentlyCheckedField : currentlyCheckedFields){
                if(!this.field[currentlyCheckedField[0]][currentlyCheckedField[1]].isHappened()){
                    continue bingoLoop;
                }
            }
            this.thisBingoFinished=true;
            this.finishedBingoCells = Arrays.stream(currentlyCheckedFields).map(pos -> this.field[pos[0]][pos[1]]).collect(Collectors.toList());
        }
    }


    public void acceptCell(BingoCell cell) {
        Optional<BingoCell> foundCell = cells.stream().filter(c -> c.getId()==cell.getId()).findFirst();
        foundCell.ifPresent(bingoCell -> bingoCell.setHappened(true));
        checkBingo();
    }

    public BingoCell[][] getField() {
        return field;
    }

    public boolean isThisBingoFinished() {
        return thisBingoFinished;
    }

    public List<BingoCell> getFinishedBingoCells() {
        return finishedBingoCells;
    }
}
