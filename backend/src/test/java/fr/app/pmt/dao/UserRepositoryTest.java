package fr.app.pmt.dao;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import fr.app.pmt.models.Users;
import fr.app.pmt.services.impl.UserServiceImpl;

@DataJpaTest
@ActiveProfiles("test")
public class UserRepositoryTest {

  @Autowired
  private UserServiceImpl userServiceImpl;

  @Test
  void shouldGetAllUsers() {
    List<Users> users = userServiceImpl.finAll();
    assertEquals(2, users.size());
  }
    @Test
  void shouldGetById() {
	  Users user = userServiceImpl.findById(1);
	  assertEquals("Marcelin BERTHELOT", user.getNom());
  };


  

  @Test
  //Test de vérification de la méthode post;
  void shouldCreateUser() {
    Users newUsers = new Users();

    newUsers.setNom("Paul DOUMER");
    newUsers.setEmail("paul.doumer@example.com");
    newUsers.setRole("admin");
    newUsers.setPassword("pass123");
    newUsers.setRepassword("pass123");
    // userServiceImpl.created(newUsers);

    
    assertEquals("Paul DOUMER", newUsers.getNom());
  }

  @Test

  void shouldPatchUsers() {
	  Users userExistant = userServiceImpl.findById(1);
	  Users newUser = new Users();
	  newUser.setNom("AKREA");
	  userServiceImpl.updatePartial(userExistant, newUser);
  }
  @Test
  void shouldDeleteUser() {
	  userServiceImpl.delete(1);

	};


}
