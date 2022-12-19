package personal.pkonigstein;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class LobbyManager {

    private static Map<String,BingoManager> lobbies = new HashMap<>();

    public static BingoManager getLobby(String lobbyName){
        if(!lobbies.containsKey(lobbyName)){
            lobbies.put(lobbyName, new BingoManager(lobbyName));
        }
        return lobbies.get(lobbyName);
    }

    public static List<String> getLobbyNames(){
        return new ArrayList<>(lobbies.keySet());
    }

    public static void createLobby(String lobbyName){
        lobbies.put(lobbyName, new BingoManager(lobbyName));
    }

}
