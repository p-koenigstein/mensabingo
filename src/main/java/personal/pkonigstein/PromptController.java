package personal.pkonigstein;


import org.springframework.web.bind.annotation.*;
import personal.pkonigstein.datatypes.*;

import java.util.List;
import java.util.Map;

@RestController
public class PromptController {

    @PostMapping(value="/addEntry")
    public int addEntry(@RequestBody DataEntry entry){
        MongoConnector.save(entry);
        return 0;
    }

    @GetMapping(value="/getLobbyList")
    public List<String> getLobbyList(){
        return LobbyManager.getLobbyNames();
    }

    @GetMapping(value="/getBingoWinner/{lobby}")
    public BingoWinner getLobbyWinner(@PathVariable String lobby){
        return LobbyManager.getLobby(lobby).getWinner();
    }

    @PostMapping(value="/createLobby")
    public List<String> createLobby(@RequestBody Map<String,String> lobbyName){
        LobbyManager.createLobby(lobbyName.get("lobbyName"));
        return LobbyManager.getLobbyNames();
    }

    @GetMapping(value="/getBingoField/{lobbyName}/{name}")
    public BingoField getBingofield(@PathVariable String lobbyName, @PathVariable String name){
        return LobbyManager.getLobby(lobbyName).getField(name);
    }

    @PostMapping(value="/acceptField/{lobbyName}/{name}")
    public BingoField acceptCell(@PathVariable String lobbyName, @PathVariable String name, @RequestBody BingoCell cell){
        return LobbyManager.getLobby(lobbyName).acceptCell(name, cell);
    }

}
