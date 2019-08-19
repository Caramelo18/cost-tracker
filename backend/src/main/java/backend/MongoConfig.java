package backend;

import backend.models.Balance;
import com.mongodb.*;
import com.mongodb.client.MongoDatabase;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.core.CollectionOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.ArrayList;
import java.util.Arrays;

@Configuration
@EnableMongoAuditing
public class MongoConfig extends AbstractMongoConfiguration {
    @Override
    public MongoClient mongoClient() {
        MongoCredential mongoCredential = MongoCredential.createCredential("admin", "admin", "admin".toCharArray());
        MongoClient mongoClient = new MongoClient(new ServerAddress("mongo", 27017), Arrays.asList(mongoCredential));

        MongoDatabase db = mongoClient.getDatabase("cost-tracker");

        Boolean exists = mongoClient.getDatabase("cost-tracker").listCollectionNames().into(new ArrayList<String>()).contains("balance");

        if (!exists){
            initBalance(mongoClient);
        }

        return mongoClient;
    }

    @Override
    protected String getDatabaseName() {
        return "cost-tracker";
    }

    private void initBalance (MongoClient mongoClient) {
        CollectionOptions options = CollectionOptions.empty().capped().size(4096).maxDocuments(1);
        MongoOperations operations = new MongoTemplate(mongoClient, "cost-tracker");
        operations.createCollection("balance", options);
        Balance balance = new Balance();
        balance.setBalance(0.0);
        operations.insert(balance, "balance");
    }
}
