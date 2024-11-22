package com.bezkoder.spring.security.postgresql.payload.response;

import com.bezkoder.spring.security.postgresql.models.Address;

import java.time.LocalDate;

public class JwtResponse {
  private String token;
  private String type = "Bearer";
  private Long id;
  private String username;
  private String email;
  private String interests;
  private LocalDate dateOfBirth;
  private Address address;

  public JwtResponse(String accessToken, Long id, String username, String email, String interests, LocalDate dateOfBirth, Address address) {
    this.token = accessToken;
    this.id = id;
    this.username = username;
    this.email = email;
    this.interests = interests;
    this.dateOfBirth = dateOfBirth;
    this.address = address;
  }

  public String getAccessToken() {
    return token;
  }

  public void setAccessToken(String accessToken) {
    this.token = accessToken;
  }

  public String getTokenType() {
    return type;
  }

  public void setTokenType(String tokenType) {
    this.type = tokenType;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getInterests() {
    return interests;
  }

  public Address getAddress() {
    return address;
  }

  public void setInterests(String interests) {
    this.interests = interests;
  }

  public LocalDate getDateOfBirth() {
    return dateOfBirth;
  }

  public void setDateOfBirth(LocalDate dateOfBirth) {
    this.dateOfBirth = dateOfBirth;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }
}
