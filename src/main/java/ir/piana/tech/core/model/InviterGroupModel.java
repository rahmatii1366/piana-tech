package ir.piana.tech.core.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 8/21/2019 11:46 AM
 **/
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InviterGroupModel {
    private long groupId;
    private String groupName;
    private boolean isSeen;
}
