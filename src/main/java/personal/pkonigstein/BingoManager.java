package personal.pkonigstein;

import personal.pkonigstein.datatypes.BingoCell;
import personal.pkonigstein.datatypes.BingoField;
import personal.pkonigstein.datatypes.DataEntry;
import personal.pkonigstein.datatypes.MongoConnector;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class BingoManager {

    private static Map<String, BingoField> fieldsByPlayer = new HashMap<>();
    private static BingoField field;

    public static BingoField getField(String playerName){
        if(fieldsByPlayer == null){
            fieldsByPlayer = new HashMap<>();
        }
        if(!fieldsByPlayer.containsKey(playerName)){
            BingoField newField = generateField(playerName);
            fieldsByPlayer.put(playerName, newField);
            return newField;
        }
        return fieldsByPlayer.get(playerName);
    }

    public static BingoField getField() {
        if (field == null){
            field = generateField();
        }
        return field;
    }

    private static BingoField generateField(String playerName){
        //TODO: filter Entries by playerName
        List<DataEntry> entries = MongoConnector.getBingoField();
        assert entries != null;
        return new BingoField(entries.stream().map(BingoCell::new).collect(Collectors.toList()));
    }

    private static BingoField generateField() {
        List<DataEntry> entries = MongoConnector.getBingoField();
        assert entries != null;
        return new BingoField(entries.stream().map(BingoCell::new).collect(Collectors.toList()));
    }

    public static BingoField acceptCell(BingoCell cell) {
        field.acceptCell(cell);
        return field;
    }
}
