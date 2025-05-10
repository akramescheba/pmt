package fr.app.pmt.dao;

import org.springframework.data.repository.CrudRepository;

import fr.app.pmt.models.Tasks;

public interface TaskRepository extends CrudRepository<Tasks, Integer> {}
