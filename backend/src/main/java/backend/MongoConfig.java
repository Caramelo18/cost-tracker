package backend;

import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

import java.util.Arrays;

@Configuration
@EnableMongoAuditing
public class MongoConfig extends AbstractMongoConfiguration {
    @Override
    public MongoClient mongoClient() {
        MongoCredential mongoCredential = MongoCredential.createCredential("admin", "admin", "admin".toCharArray());
        MongoClient mongoClient = new MongoClient(new ServerAddress("mongo", 27017), Arrays.asList(mongoCredential));
        return mongoClient;
    }

    @Override
    protected String getDatabaseName() {
        return "cost-tracker";
    }
}
