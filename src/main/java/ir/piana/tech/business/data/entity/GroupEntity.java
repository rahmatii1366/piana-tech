package ir.piana.tech.business.data.entity;

import ir.piana.tech.business.data.converter.InvitedUsersConverter;
import ir.piana.tech.core.enums.AgeLevelType;
import ir.piana.tech.core.model.InvitedUserModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/14/2019 2:28 PM
 **/
@Entity
@Table(name = "user_group")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GroupEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @Column(name = "invited_users", columnDefinition = "json")
    @Convert(attributeName = "invitedUserModels", converter = InvitedUsersConverter.class)
    private List<InvitedUserModel> invitedUserModels;

    @ManyToMany(mappedBy = "groups")
    private List<UserEntity> members;

    @Column
    private String name;

    @Column
    private Double latitude;

    @Column
    private Double longitude;

    @Column(columnDefinition = "varchar(4)")
    private String imageExtension;

    @Column
    @Enumerated(EnumType.STRING)
    private AgeLevelType ageLevel;

    public void addInvitedUserModel(InvitedUserModel invitedUserModel) {
        if (invitedUserModels == null)
            invitedUserModels = new ArrayList<>();
        invitedUserModels.add(invitedUserModel);
    }

    public void addMember(UserEntity userEntity) {
        if (members == null)
            members = new ArrayList<>();
        members.add(userEntity);
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
