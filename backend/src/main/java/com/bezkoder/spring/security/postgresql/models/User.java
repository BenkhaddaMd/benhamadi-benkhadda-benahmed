package com.bezkoder.spring.security.postgresql.models;

import java.time.LocalDate;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table( name = "users",
        indexes = @Index(name = "idx_username", columnList = "username"),
        uniqueConstraints = { 
          @UniqueConstraint(columnNames = "username"),
          @UniqueConstraint(columnNames = "email") 
        })
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(max = 20)
  public String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @Column(name = "date_of_birth")
  private LocalDate dateOfBirth;

  @Column(name = "interests")
  private String interests;

  @ManyToOne
  @JoinColumn(name = "address_id", nullable = true)
  private Address address;

  @NotBlank
  @Size(max = 120)
  private String password;

  public User() {
  }


  public User(String username, String email, String encode) {
  }

  public User(String username, String email, String interests, LocalDate dateOfBirth, Address address, String password) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.interests = interests;
    this.dateOfBirth = dateOfBirth;
    this.address = address;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public Address getAddress() {
    return address;
  }

  public void setAddress(Address address) {
    this.address = address;
  }

  public LocalDate getDateOfBirth() {
    return dateOfBirth;
  }

  public void setDateOfBirth(LocalDate dateOfBirth) {
    this.dateOfBirth = dateOfBirth;
  }

  public String getInterests() {
    return interests;
  }

  public void setInterests(String interests) {
    this.interests = interests;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

}
