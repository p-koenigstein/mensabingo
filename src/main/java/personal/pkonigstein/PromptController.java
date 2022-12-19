package personal.pkonigstein;


import org.springframework.web.bind.annotation.*;
import personal.pkonigstein.datatypes.BingoCell;
import personal.pkonigstein.datatypes.BingoField;
import personal.pkonigstein.datatypes.DataEntry;
import personal.pkonigstein.datatypes.MongoConnector;

import java.util.List;

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

    @PostMapping(value="/createLobby")
    public void createLobby(@RequestBody String lobbyName){
        LobbyManager.createLobby(lobbyName);
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
