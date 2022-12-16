package personal.pkonigstein;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import personal.pkonigstein.datatypes.BingoCell;
import personal.pkonigstein.datatypes.BingoField;
import personal.pkonigstein.datatypes.DataEntry;
import personal.pkonigstein.datatypes.MongoConnector;

@RestController
public class PromptController {

    @PostMapping(value="/addEntry")
    public int addEntry(@RequestBody DataEntry entry){
        MongoConnector.save(entry);
        return 0;
    }

    @GetMapping(value="/getBingoField")
    public BingoField getBingofield(){
        return BingoManager.getField();
    }

    @PostMapping(value="/acceptField")
    public BingoField acceptCell(@RequestBody BingoCell cell){
        return BingoManager.acceptCell(cell);
    }

}
