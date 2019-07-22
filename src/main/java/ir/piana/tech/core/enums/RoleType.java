package ir.piana.tech.core.enums;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/20/2019 11:55 AM
 **/
public enum RoleType {
    UNKNOWN(7, "UNKNOWN"),
    USER(8, "USER"),
    NEED_PASSWORD(9, "NEED_PASSWORD"),
    SUSPENDED(10, "SUSPENDED");

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
