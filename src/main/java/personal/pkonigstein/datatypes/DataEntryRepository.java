package personal.pkonigstein.datatypes;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository("mongoRepository")
public interface DataEntryRepository extends MongoRepository<DataEntry, String> {
}
