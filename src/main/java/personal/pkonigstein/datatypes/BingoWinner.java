package personal.pkonigstein.datatypes;

import java.util.List;

public class BingoWinner {

    private String name;
    private List<BingoCell> cells;

    public BingoWinner(String name, List<BingoCell> cells) {
        this.name = name;
        this.cells = cells;
    }

    public String getName() {
        return name;
    }

    public List<BingoCell> getCells() {
        return cells;
    }
}
