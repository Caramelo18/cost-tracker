package backend;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface BalanceRepository extends MongoRepository<Balance, String> {
}