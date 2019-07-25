package ir.piana.tech.core.enums;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/20/2019 11:55 AM
 **/
public enum RuleType {
    FREE(0, "UNKNOWN"),
    VERIFY_EMAIL(1, "VERIFY_EMAIL"),
    REGISTER_MOBILE(1, "REGISTER_MOBILE"),
    VERIFY_MOBILE(1, "VERIFY_MOBILE");

    private int code;
    private String name;

    RuleType(int code, String name) {
        this.code = code;
        this.name = name;
    }

    public static RuleType fromCode(int code) {
        for (RuleType g : RuleType.values()) {
            if(g.code == code)
                return g;
        }
        return RuleType.FREE;
    }

    public static RuleType fromName(String name) {
        for (RuleType g : RuleType.values()) {
            if(g.name.equals(name))
                return g;
        }
        return RuleType.FREE;
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
