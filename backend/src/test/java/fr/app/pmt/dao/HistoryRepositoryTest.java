package fr.app.pmt.dao;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import fr.app.pmt.models.History;
import fr.app.pmt.services.impl.HistoryServiceImpl;

@DataJpaTest
@ActiveProfiles("test")
public class HistoryRepositoryTest {
	
	@Autowired
	
	private HistoryServiceImpl historyServiceImpl;
	
	@Test
	void shoulGetAllHistory() {
		List<History> history = historyServiceImpl.findAll();
		assertEquals(2, history.size());			
	}
@Test
void shouldGetById() {
	History history = historyServiceImpl.findById(1);
	assertEquals("maj", history.getAction());
}
@Test

void shouldPostHistory() {
	History newHistory = new History();
	
	newHistory.setId(100);
	newHistory.setAction("maj");
	newHistory.setUsername("Bernard Dadié");
	newHistory.setRole("admin");
	newHistory.setDate_history(LocalDateTime.parse("2025-04-24T17:05:00"));
	// historyServiceImpl.create(newHistory)

	assertEquals("Bernard Dadié", newHistory.getUsername());
};

}
