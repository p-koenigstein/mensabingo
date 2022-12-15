package personal.pkonigstein.datatypes;

public class BingoCell extends DataEntry{

    private boolean happened;

    public BingoCell(DataEntry entry){
        this.action = entry.action;
        this.name = entry.name;
        this.happened = false;
    }

    public BingoCell(String name, String action) {
        super(name, action);
        this.happened = false;
    }

    public boolean hasHappened() {
        return happened;
    }

    public void setHappened(boolean happened) {
        this.happened = happened;
    }
}
