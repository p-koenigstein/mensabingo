package personal.pkonigstein.datatypes;

import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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
    public static List<DataEntry> getBingoField(String playerName){
        List<DataEntry> allEntries = dataEntryRepository.findAll().stream().filter(entry ->!entry.getName()
                .equals(playerName)).collect(Collectors.toList());
        if (allEntries.size()<25){
            // not enough data points available
            return null;
        }
        Collections.shuffle(allEntries);
        return allEntries.subList(0,25);
    }
}
