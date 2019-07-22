package ir.piana.tech.business.data.entity;

import ir.piana.tech.business.enums.GenderType;
import ir.piana.tech.core.enums.RoleType;
import lombok.Data;

import javax.persistence.*;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/14/2019 2:28 PM
 **/
@Entity
@Table(name = "users")
@Data
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String email;
    @Column
    private String password;
    @Column
    private boolean verified;
    @Column
    @Enumerated(EnumType.STRING)
    private GenderType gender;
    @Enumerated(EnumType.STRING)
    @Column(name = "role_name")
    private RoleType roleType;

    public UserEntity() {
    }

    public UserEntity(String email) {
        this.email = email;
    }

    public UserEntity(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
