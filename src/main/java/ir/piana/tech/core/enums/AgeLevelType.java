package ir.piana.tech.core.enums;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 8/10/2019 10:25 AM
 **/
public enum AgeLevelType {
    FREE("FREE", "آزاد"),
    LESS_THAN_5("LESS THAN 5", "زیر 5 سال"),
    LESS_THAN_10("LESS THAN 10", "زیر 10 سال"),
    LESS_THAN_15("LESS THAN 15", "زیر 15 سال"),
    LESS_THAN_20("LESS THAN 20", "زیر 20 سال"),
    LESS_THAN_30("LESS THAN 30", "زیر 30 سال"),
    LESS_THAN_40("LESS THAN 40", "زیر 40 سال"),
    LESS_THAN_50("LESS THAN 50", "زیر 50 سال"),
    LESS_THAN_60("LESS THAN 60", "زیر 60 سال"),
    GREATER_THAN_60("GREATER THAN 60", "بالای 60 سال");

    private String value;
    private String faValue;

    AgeLevelType(String value, String faValue) {
        this.value = value;
        this.faValue = faValue;
    }

    public String getValue() {
        return value;
    }

    public String getFaValue() {
        return faValue;
    }
}
