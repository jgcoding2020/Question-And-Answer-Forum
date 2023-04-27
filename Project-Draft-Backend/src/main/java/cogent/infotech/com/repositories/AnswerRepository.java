package cogent.infotech.com.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cogent.infotech.com.entities.Answer;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Integer>{

}
