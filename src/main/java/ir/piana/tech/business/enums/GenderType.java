package ir.piana.tech.business.enums;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/15/2019 1:49 PM
 **/
public enum GenderType {
    UNKNOWN(0),
    MALE(1),
    FEMALE(2);

    private int code;

    GenderType(int code) {
        this.code = code;
    }

    public static GenderType fromCode(int code) {
        for (GenderType g : GenderType.values()) {
            if(g.code == code)
                return g;
        }
        return GenderType.UNKNOWN;
    }

    public int getCode() {
        return code;
    }
}
