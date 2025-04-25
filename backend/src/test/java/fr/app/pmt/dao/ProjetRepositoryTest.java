package fr.app.pmt.dao;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import fr.app.pmt.models.Projets;
import fr.app.pmt.services.impl.ProjetServiceImpl;


@DataJpaTest
@ActiveProfiles("test")
public class ProjetRepositoryTest {
	
	@Autowired
	private ProjetServiceImpl projetServiceImpl;
	@Test
void shouldProjectFindAll() {
		List<Projets> projets = projetServiceImpl.findAll();
		assertEquals(1, projets.size());
	};

	@Test
void shouldGetProjectById() {
	Projets projet = projetServiceImpl.findById(1);
	assertEquals("En cours", projet.getStatut());
}

@Test

void shouldPostProject() {
	Projets newProjets = new Projets();

	newProjets.setId(10);
	newProjets.setNom("InnotechFusion");
	newProjets.setObjectif("Réaliser une plateforme de vote de l'association Innotech Fusion");
	newProjets.setContext("Nouvelles élections de membres d'administration");
	newProjets.setDescription("Application simple intuitive et sécurisée");
	newProjets.setStatut("Terminé");
	newProjets.setDate_debut(LocalDate.parse("2025-03-15"));
	newProjets.setDate_fin(LocalDate.parse("2025-03-18"));
	assertEquals(10, newProjets.getId());
}
@Test
void shouldDeleteProject() {
	projetServiceImpl.delete(1);

	}

@Test

void shouldPatchProject() {
	Projets projetExistant = projetServiceImpl.findById(1);
	Projets newProject = new Projets();
	newProject.setNom("Terminé");
	projetServiceImpl.updatePartial(1, projetExistant, newProject);};

}

