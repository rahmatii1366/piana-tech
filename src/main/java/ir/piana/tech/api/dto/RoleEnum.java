package ir.piana.tech.api.dto;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonValue;
import java.io.Serializable;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonCreator;

/**
 * Gets or Sets RoleEnum
 */
public enum RoleEnum {
  
  UNKNOWN("UNKNOWN"),
  
  GUEST("GUEST"),
  
  USER("USER"),
  
  SUSPENDED("SUSPENDED"),
  
  ADMIN("ADMIN");

  private String value;

  RoleEnum(String value) {
    this.value = value;
  }

  @Override
  @JsonValue
  public String toString() {
    return String.valueOf(value);
  }

  @JsonCreator
  public static RoleEnum fromValue(String text) {
    for (RoleEnum b : RoleEnum.values()) {
      if (String.valueOf(b.value).equals(text)) {
        return b;
      }
    }
    return null;
  }
}

