package com.bezkoder.spring.security.postgresql.security.services;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import java.util.Objects;
import java.time.LocalDate;

import com.bezkoder.spring.security.postgresql.models.Address;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.bezkoder.spring.security.postgresql.models.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDetailsImpl implements UserDetails {
  private static final long serialVersionUID = 1L;

  private Long id;

  private String username;

  private String email;

  private String interests;

  private LocalDate dateOfBirth;

  private Address address;

  @JsonIgnore
  private String password;

  public UserDetailsImpl(Long id, String username, String email, String interests, LocalDate dateOfBirth, Address address, String password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.interests = interests;
    this.dateOfBirth = dateOfBirth;
    this.address = address;
  }

  public static UserDetailsImpl build(User user) {
    return new UserDetailsImpl(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getInterests(),
            user.getDateOfBirth(),
            user.getAddress(),
            user.getPassword());
  }

  public Long getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  public LocalDate getDateOfBirth() {
    return dateOfBirth;
  }

  public String getInterests() {
    return interests;
  }

  public Address getAddress() {
    return address;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    // Assigning a static role to all users
    return Collections.singleton(new SimpleGrantedAuthority("USER_ROLE"));
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    UserDetailsImpl user = (UserDetailsImpl) o;
    return Objects.equals(id, user.id);
  }
}
