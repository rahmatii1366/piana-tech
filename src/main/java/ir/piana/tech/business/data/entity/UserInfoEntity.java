package ir.piana.tech.business.data.entity;

import ir.piana.tech.business.enums.ZoneType;
import ir.piana.tech.core.enums.PlayerPositionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/14/2019 2:28 PM
 **/
@Entity
@Table(name = "user_info")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String username;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private String nationalCode;

    @Column(columnDefinition = "varchar(4) default 'NONE'")
    @Enumerated(EnumType.STRING)
    private PlayerPositionType positionType;

    @Column
    @Enumerated(EnumType.STRING)
    private ZoneType zoneType;

    @Column
    private String abbreviatedCity;

    @Column(columnDefinition = "varchar(4)")
    private String imageExtension;

    @OneToOne
    @MapsId
    private UserEntity userEntity;

    @Override
    public String toString() {
        return super.toString();
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }
}
