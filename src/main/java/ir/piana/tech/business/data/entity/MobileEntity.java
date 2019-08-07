package ir.piana.tech.business.data.entity;

import ir.piana.tech.business.enums.GenderType;
import ir.piana.tech.core.enums.RoleType;
import ir.piana.tech.core.enums.RuleType;
import lombok.Data;

import javax.persistence.*;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/14/2019 2:28 PM
 **/
@Entity
@Table(name = "mobile")
@Data
public class MobileEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String email;
    @Column
    private String mobile;
    @Column
    private String password;
    @Column
    private Boolean mobileVerified;
    @Column
    private Boolean emailVerified;
    @Column
    @Enumerated(EnumType.STRING)
    private GenderType gender;
    @Enumerated(EnumType.STRING)
    @Column(name = "role_name")
    private RoleType roleType;

    @Enumerated(EnumType.STRING)
    @Column(name = "rule_name")
    private RuleType ruleType;

    public MobileEntity() {
    }

    public MobileEntity(String mobile) {
        this.mobile = mobile;
    }

    public MobileEntity(String mobile, String password) {
        this.mobile = mobile;
        this.password = password;
    }
}
