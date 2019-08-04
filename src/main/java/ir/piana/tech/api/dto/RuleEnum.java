package ir.piana.tech.api.dto;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonValue;
import java.io.Serializable;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonCreator;

/**
 * Gets or Sets RuleEnum
 */
public enum RuleEnum {
  
  FREE("FREE"),
  
  VERIFY_EMAIL("VERIFY_EMAIL"),
  
  REGISTER_MOBILE("REGISTER_MOBILE"),
  
  VERIFY_MOBILE("VERIFY_MOBILE");

  private String value;

  RuleEnum(String value) {
    this.value = value;
  }

  @Override
  @JsonValue
  public String toString() {
    return String.valueOf(value);
  }

  @JsonCreator
  public static RuleEnum fromValue(String text) {
    for (RuleEnum b : RuleEnum.values()) {
      if (String.valueOf(b.value).equals(text)) {
        return b;
      }
    }
    return null;
  }
}

