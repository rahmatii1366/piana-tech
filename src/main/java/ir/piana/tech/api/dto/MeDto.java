package ir.piana.tech.api.dto;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import ir.piana.tech.api.dto.RoleEnum;
import ir.piana.tech.api.dto.RuleEnum;
import java.io.Serializable;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * MeDto
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-08-04T17:46:56.145+04:30")

public class MeDto  implements Serializable {
  private static final long serialVersionUID = 1L;

  @JsonProperty("email")
  private String email = null;

  @JsonProperty("role")
  private RoleEnum role = null;

  @JsonProperty("rule")
  private RuleEnum rule = null;

  public MeDto email(String email) {
    this.email = email;
    return this;
  }

  /**
   * Get email
   * @return email
  **/
  @ApiModelProperty(value = "")


  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public MeDto role(RoleEnum role) {
    this.role = role;
    return this;
  }

  /**
   * Get role
   * @return role
  **/
  @ApiModelProperty(value = "")

  @Valid

  public RoleEnum getRole() {
    return role;
  }

  public void setRole(RoleEnum role) {
    this.role = role;
  }

  public MeDto rule(RuleEnum rule) {
    this.rule = rule;
    return this;
  }

  /**
   * Get rule
   * @return rule
  **/
  @ApiModelProperty(value = "")

  @Valid

  public RuleEnum getRule() {
    return rule;
  }

  public void setRule(RuleEnum rule) {
    this.rule = rule;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    MeDto meDto = (MeDto) o;
    return Objects.equals(this.email, meDto.email) &&
        Objects.equals(this.role, meDto.role) &&
        Objects.equals(this.rule, meDto.rule);
  }

  @Override
  public int hashCode() {
    return Objects.hash(email, role, rule);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class MeDto {\n");
    
    sb.append("    email: ").append(toIndentedString(email)).append("\n");
    sb.append("    role: ").append(toIndentedString(role)).append("\n");
    sb.append("    rule: ").append(toIndentedString(rule)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

