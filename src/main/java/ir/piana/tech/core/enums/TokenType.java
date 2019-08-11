package ir.piana.tech.core.enums;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 8/10/2019 10:25 AM
 **/
public enum TokenType {
    MOBILE("MOBILE"),

    PASSWORD("PASSWORD"),

    EMAIL("EMAIL");

    private String value;

    TokenType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }


    @Override
    public String toString() {
        return value;
    }
}
