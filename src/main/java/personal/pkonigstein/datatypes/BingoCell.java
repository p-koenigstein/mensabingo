package personal.pkonigstein.datatypes;

import java.text.SimpleDateFormat;
import java.util.Date;

public class BingoCell extends DataEntry{

    private static long idCounter= 0;
    private boolean happened;
    private long id;

    private String anyoneWho = "";

    private String happenedTime;

    public BingoCell() {
    }

    public BingoCell(DataEntry entry){
        this.id = idCounter++;
        this.action = entry.action;
        this.name = entry.name;
        this.happened = false;
        this.anyoneWho = "";
    }

    public BingoCell(String name, String action) {
        super(name, action);
        this.id = idCounter++;
        this.happened = false;
        this.anyoneWho = "";
    }

    public boolean isHappened() {
        return happened;
    }

    public void setHappened(boolean happened) {
        this.happened = happened;
        this.happenedTime = new SimpleDateFormat("HH:mm:ss").format(new Date());
    }

    public long getId() {
        return id;
    }

    public String getHappenedTime() {
        return happenedTime;
    }

    public String getAnyoneWho() {
        return anyoneWho;
    }
}
