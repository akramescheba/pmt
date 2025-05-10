package fr.app.pmt.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import fr.app.pmt.models.Tasks;
import fr.app.pmt.services.TaskService;

@RestController
@CrossOrigin(origins = { "http://localhost:4200"},  allowedHeaders = "*")
public class taskController {
	
	@Autowired
	private TaskService taskService;
	
	@GetMapping("/taches")
	public List<Tasks> findAll(){
		return taskService.findAll();	
	}

	@GetMapping("/tache/{id}")
	public Tasks findById(@PathVariable("id") int id) {
		Tasks task =  taskService.findById(id);
		
		if(task==null) {
			
		}return task;
	}
	@PostMapping("/tache")
	@ResponseStatus(code = HttpStatus.CREATED)
	public int create (@RequestBody Tasks task) {
		return taskService.create(task);
		
	}
}

