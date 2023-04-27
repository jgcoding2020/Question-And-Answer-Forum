package cogent.infotech.com.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cogent.infotech.com.entities.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer>{
	Question findByTopic(String topic);
}
