package ir.piana.tech.core.enums;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/20/2019 11:55 AM
 **/
public enum RoleType {
    UNKNOWN(0, "UNKNOWN"),
    GUEST(1, "GUEST"),
    USER(2, "USER"),
    VERIFIED_MOBILE(3, "VERIFIED_MOBILE"),
    VERIFIED(4, "VERIFIED"),
    ADMIN(5, "ADMIN"),
    SUSPENDED(6, "SUSPENDED");

    private int code;
    private String name;

    RoleType(int code, String name) {
        this.code = code;
        this.name = name;
    }

    public static RoleType fromCode(int code) {
        for (RoleType g : RoleType.values()) {
            if(g.code == code)
                return g;
        }
        return RoleType.UNKNOWN;
    }

    public static RoleType fromName(String name) {
        for (RoleType g : RoleType.values()) {
            if(g.name.equals(name))
                return g;
        }
        return RoleType.UNKNOWN;
    }

    public int getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public String getRole() {
        return "ROLE_" + name;
    }
}
