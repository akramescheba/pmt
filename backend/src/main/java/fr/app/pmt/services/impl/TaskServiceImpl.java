package fr.app.pmt.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.app.pmt.dao.TaskRepository;
import fr.app.pmt.exeption.EntityDontExistExeption;
import fr.app.pmt.models.Tasks;
import fr.app.pmt.services.TaskService;

@Service
public class TaskServiceImpl implements TaskService{
	
	@Autowired
	private TaskRepository taskRepository;


	@Override
	public List<Tasks> findAll() {
		List<Tasks> tasks = new ArrayList<Tasks>();
		taskRepository.findAll().forEach(tasks::add);;
		return tasks;
	}


	@Override
	public Tasks findById(int id) {
		Optional<Tasks> task = taskRepository.findById(id);
		if(task.isPresent()) {
			return task.get();
		}
		throw new EntityDontExistExeption();
		
	}


	@Override
	public int create(Tasks task) {
		return taskRepository.save(task).getId();
	}

}
