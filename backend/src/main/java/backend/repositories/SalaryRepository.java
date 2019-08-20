package backend.repositories;

import backend.models.Salary;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SalaryRepository extends MongoRepository<Salary, String> {
}
