package fr.app.pmt.models;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Table(name="historique")
@Entity

public class History  {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String action;
	private String username;
	private String role;
	

	@JsonFormat(pattern = " HH:mm , dd-MM-yyyy")
	
	private LocalDateTime date_history;
	public LocalDateTime getDate_history() {
		return date_history;
	}


	public void setDate_history(LocalDateTime date_history) {
		this.date_history = date_history;
	}

	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getAction() {
		return action;
	}


	public void setAction(String action) {
		this.action = action;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getRole() {
		return role;
	}


	public void setRole(String role) {
		this.role = role;
	}	
}
