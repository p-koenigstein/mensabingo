package personal.pkonigstein.datatypes;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "prompts")
public class DataEntry{
    protected String name;
    protected String action;

    public DataEntry(String name, String action) {
        this.name = name;
        this.action = action;
    }

    public DataEntry() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    @Override
    public String toString(){
        return name+" "+action;
    }
}
