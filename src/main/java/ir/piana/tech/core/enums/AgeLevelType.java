package ir.piana.tech.core.enums;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 8/10/2019 10:25 AM
 **/
public enum AgeLevelType {
    FREE("FREE", "FREE", "آزاد"),
    LESS_THAN_5("LESS_THAN_5","LESS THAN 5", "زیر 5 سال"),
    LESS_THAN_10("LESS_THAN_10","LESS THAN 10", "زیر 10 سال"),
    LESS_THAN_15("LESS_THAN_15","LESS THAN 15", "زیر 15 سال"),
    LESS_THAN_20("LESS_THAN_20","LESS THAN 20", "زیر 20 سال"),
    LESS_THAN_30("LESS_THAN_30","LESS THAN 30", "زیر 30 سال"),
    LESS_THAN_40("LESS_THAN_40","LESS THAN 40", "زیر 40 سال"),
    LESS_THAN_50("LESS_THAN_50","LESS THAN 50", "زیر 50 سال"),
    LESS_THAN_60("LESS_THAN_60","LESS THAN 60", "زیر 60 سال"),
    GREATER_THAN_60("GREATER_THAN_60","GREATER THAN 60", "بالای 60 سال");

    private String value;
    private String enTitle;
    private String faTitle;

    AgeLevelType(String value, String enTitle, String faTitle) {
        this.value = value;
        this.enTitle = enTitle;
        this.faTitle = faTitle;
    }

    public String getValue() {
        return value;
    }

    public String getEnTitle() {
        return enTitle;
    }

    public String getFaTitle() {
        return faTitle;
    }

    public static AgeLevelType fromValue(String value) {
        for (AgeLevelType ageLevelType : AgeLevelType.values()) {
            if(ageLevelType.getValue().equalsIgnoreCase(value))
                return ageLevelType;
        }
        return null;
    }
}
