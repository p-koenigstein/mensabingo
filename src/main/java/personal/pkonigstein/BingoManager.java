package personal.pkonigstein;

import personal.pkonigstein.datatypes.BingoCell;
import personal.pkonigstein.datatypes.BingoField;
import personal.pkonigstein.datatypes.DataEntry;
import personal.pkonigstein.datatypes.MongoConnector;

import java.util.List;
import java.util.stream.Collectors;

public class BingoManager {

    private static BingoField field;

    public static BingoField getField() {
        if (field == null){
            field = generateField();
        }
        return field;
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
