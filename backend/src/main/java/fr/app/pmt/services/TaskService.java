package fr.app.pmt.services;

import java.util.List;

import fr.app.pmt.models.Tasks;

public interface TaskService {

	public List<Tasks> findAll();

	public Tasks findById(int id );

	public int create(Tasks task);


}
