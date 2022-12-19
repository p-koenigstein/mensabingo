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

    private String lobbyName;
    private Map<String, BingoField> fieldsByPlayer;

    public BingoManager(String lobbyName) {
        this.lobbyName = lobbyName;
        this.fieldsByPlayer = new HashMap<>();
    }

    public BingoField getField(String playerName){
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

    private BingoField generateField(String playerName){
        List<DataEntry> entries = MongoConnector.getBingoField(playerName);
        assert entries != null;
        return new BingoField(entries.stream().map(BingoCell::new).collect(Collectors.toList()));
    }

    public BingoField acceptCell(String name, BingoCell cell) {
        fieldsByPlayer.get(name).acceptCell(cell);
        return fieldsByPlayer.get(name);
    }
}
