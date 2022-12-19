package personal.pkonigstein;

import personal.pkonigstein.datatypes.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class BingoManager {

    private String lobbyName;
    private Map<String, BingoField> fieldsByPlayer;
    private BingoWinner winner;

    public BingoManager(String lobbyName) {
        this.lobbyName = lobbyName;
        this.fieldsByPlayer = new HashMap<>();
        this.winner = null;
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
        if(fieldsByPlayer.get(name).checkBingo()){
            this.winner = new BingoWinner(name, fieldsByPlayer.get(name).getFinishedBingoCells());
            for(Map.Entry<String,BingoField> player : fieldsByPlayer.entrySet()){
                player.getValue().setHasFinished(true);
            }
        }
        return fieldsByPlayer.get(name);
    }

    public BingoWinner getWinner() {
        return winner;
    }
}
