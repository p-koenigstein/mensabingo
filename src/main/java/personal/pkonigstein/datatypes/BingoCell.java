package personal.pkonigstein.datatypes;

public class BingoCell extends DataEntry{

    private static long idCounter= 0;
    private boolean happened;
    private long id;

    public BingoCell() {
    }

    public BingoCell(DataEntry entry){
        this.id = idCounter++;
        this.action = entry.action;
        this.name = entry.name;
        this.happened = false;
    }

    public BingoCell(String name, String action) {
        super(name, action);
        this.id = idCounter++;
        this.happened = false;
    }

    public boolean isHappened() {
        return happened;
    }

    public void setHappened(boolean happened) {
        this.happened = happened;
    }

    public long getId() {
        return id;
    }
}
