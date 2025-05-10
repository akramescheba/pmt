package fr.app.pmt.dao;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import fr.app.pmt.models.Tasks;
import fr.app.pmt.services.impl.TaskServiceImpl;

@DataJpaTest
@ActiveProfiles("test")
public class TaskRepositoryTest {
	@Autowired
	private TaskServiceImpl taskServiceImpl;
	@Test
	void shouldTaskFinAll() {
		List<Tasks> tasks = taskServiceImpl.findAll();
		assertEquals(1, tasks.size());
	}
	@Test
	void shouldGetTaskById() {
		Tasks task = taskServiceImpl.findById(1);
		assertEquals("Ameliorer l authentification en utilisant JWT.", task.getTitre());
		
	};
	
	@Test
	void shouldPostTask() {
		Tasks newTask = new Tasks();
		newTask.setId(2);
		newTask.setTitre("Test de post de titre de task");
		newTask.setDescription("Test de post d'une tâche");
		assertEquals("Test de post de titre de task", newTask.getTitre());
		
	};


}
