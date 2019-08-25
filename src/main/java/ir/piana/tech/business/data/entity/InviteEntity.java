package ir.piana.tech.business.data.entity;

import ir.piana.tech.business.data.converter.InvitedUsersConverter;
import ir.piana.tech.business.data.converter.InviterGroupsConverter;
import ir.piana.tech.business.enums.GenderType;
import ir.piana.tech.core.enums.RoleType;
import ir.piana.tech.core.enums.RuleType;
import ir.piana.tech.core.model.InvitedUserModel;
import ir.piana.tech.core.model.InviterGroupModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/14/2019 2:28 PM
 **/
@Entity
@Table(name = "invite")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InviteEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "mobile")
    private String mobile;

    @Column(name = "inviter_groups", columnDefinition = "json")
    @Convert(attributeName = "inviterGroupModels", converter = InviterGroupsConverter.class)
    private List<InviterGroupModel> inviterGroupModels;

    public synchronized void addInverterGroup(GroupEntity groupEntity) {
        if(inviterGroupModels == null)
            inviterGroupModels = new ArrayList<>();
        inviterGroupModels.add(InviterGroupModel.builder()
                .groupId(groupEntity.getId())
                .groupName(groupEntity.getName())
                .isSeen(false)
                .build());
    }

//    public synchronized void removeFromInverterGroups(InviterGroupModel inviterGroupModel) {
//        if(inviterGroupModels != null) {
//            for(InviterGroupModel model : inviterGroupModels) {
//                if(model.getGroupId() == inviterGroupModel.getGroupId()){
//                    inviterGroupModel = model;
//                    break;
//                }
//            }
//            inviterGroupModels.remove(inviterGroupModel);
//        }
//    }

    @Override
    public String toString() {
        return super.toString();
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }
}
