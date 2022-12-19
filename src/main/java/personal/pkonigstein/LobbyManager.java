package personal.pkonigstein;

import java.util.HashMap;
import java.util.Map;

public class LobbyManager {

    private static Map<String,BingoManager> lobbies = new HashMap<>();

    public static BingoManager getLobby(String lobbyName){
        if(!lobbies.containsKey(lobbyName)){
            lobbies.put(lobbyName, new BingoManager(lobbyName));
        }
        return lobbies.get(lobbyName);
    }


}
