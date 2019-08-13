package ir.piana.tech.business.data.entity;

import ir.piana.tech.core.enums.AgeLevelType;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/14/2019 2:28 PM
 **/
@Entity
@Table(name = "groups")
@Data
@Builder
public class GroupEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    UserEntity userEntity;
    @Column
    private String name;
    @Column
    private Double latitude;
    @Column
    private Double longitude;
    @Column
    @Enumerated(EnumType.STRING)
    private AgeLevelType ageLevel;

    public GroupEntity() {
    }

    public GroupEntity(String name) {
        this.name = name;
    }

    public GroupEntity(Long id, UserEntity userEntity, String name, Double latitude, Double longitude, AgeLevelType ageLevel) {
        this.id = id;
        this.name = name;
        this.userEntity = userEntity;
        this.latitude = latitude;
        this.longitude = longitude;
        this.ageLevel = ageLevel;
    }
}
