package nl.acme.wandelen.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
public class Wandeling implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String name;
	private String start;
	private String finish;
	private String review;


	public long getId(){ 
		return this.id;
	}

	public void setId(long id){ 
		this.id=id;
	}

	public String getName(){ 
		return this.name;
	}

	public void setName(String name){ 
		this.name=name;
	}

	public String getStart(){ 
		return this.start;
	}

	public void setStart(String start){ 
		this.start=start;
	}

	public String getFinish(){ 
		return this.finish;
	}

	public void setFinish(String finish){ 
		this.finish=finish;
	}

	public String getReview(){ 
		return this.review;
	}

	public void setReview(String review){ 
		this.review=review;
	}

}
