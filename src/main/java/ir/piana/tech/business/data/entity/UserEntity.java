package ir.piana.tech.business.data.entity;

import ir.piana.tech.business.enums.GenderType;
import ir.piana.tech.core.enums.RoleType;
import ir.piana.tech.core.enums.RuleType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/14/2019 2:28 PM
 **/
@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String mobile;

    @Column
    private String email;

    @Column
    private String password;

    @Column(name = "mobile_verified")
    private Boolean mobileVerified;

    @Column(name = "email_verified")
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

    @OneToMany(mappedBy = "userEntity", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<GroupEntity> groupEntities;

    @OneToOne(mappedBy = "userEntity", cascade = CascadeType.ALL)
    private UserInfoEntity userInfoEntity;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "membership",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "group_id"))
    private Set<GroupEntity> groups;

    public UserEntity(String mobile) {
        this.mobile = mobile;
    }

    public UserEntity(String mobile, String password) {
        this.mobile = mobile;
        this.password = password;
    }

    public UserEntity(Long id, String username, String email, String mobile, String password, Boolean mobileVerified, Boolean emailVerified, GenderType gender, RoleType roleType, RuleType ruleType, List<GroupEntity> groupEntities) {
        this.id = id;
        this.email = email;
        this.mobile = mobile;
        this.password = password;
        this.mobileVerified = mobileVerified;
        this.emailVerified = emailVerified;
        this.gender = gender;
        this.roleType = roleType;
        this.ruleType = ruleType;
        this.groupEntities = groupEntities;
    }

    public void addGroupEntity(GroupEntity groupEntity) {
        if (this.groups == null)
            this.groups = new HashSet<>();
        groupEntity.addMember(this);
        this.groups.add(groupEntity);
    }

    @Override
    public String toString() {
        return super.toString();
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }
}
