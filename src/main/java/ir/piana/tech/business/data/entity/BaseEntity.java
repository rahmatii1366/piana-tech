package ir.piana.tech.business.data.entity;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Version;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/24/2019 12:12 PM
 **/
@MappedSuperclass
public abstract class BaseEntity<ID extends Serializable> implements Serializable {
    @NotNull
    @Version
    @Column(name = "VERSION")
    private Long version;

    public abstract ID getId();

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }
}
