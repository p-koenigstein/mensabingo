package personal.pkonigstein.datatypes;

import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class MongoConnector {

    private static DataEntryRepository dataEntryRepository;

    public MongoConnector(@Qualifier("mongoRepository") DataEntryRepository repository) {
        dataEntryRepository = repository;
    }

    public static void save(DataEntry entry){
        dataEntryRepository.save(entry);
    }

    /**
     * Returns the bingo Field in form of a List containing 25 Elements.
     * @return
     */
    public static List<DataEntry> getBingoField(){
        if (dataEntryRepository.count()<25){
            // not enough data points available
            return null;
        }
        List<DataEntry> allEntries = dataEntryRepository.findAll();
        Collections.shuffle(allEntries);
        return allEntries.subList(0,25);
    }
}
