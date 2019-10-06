package ir.piana.tech.business.enums;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/15/2019 1:49 PM
 **/
public enum ZoneType {
    NONE("NONE", "not selected", "انتخاب نشده"),
    C("C", "center", "مرکز"),
    N("N", "north", "شمال"),
    S("S", "south", "جنوب"),
    E("E", "east", "شرق"),
    W("W", "west", "غرب"),
    NE("NE", "north east", "شمال شرقی"),
    NW("NW", "north west", "شمال غربی"),
    SE("SE", "south east", "جنوب شرقی"),
    SW("SW", "south west", "جنوب غربی");

    private String value;
    private String enTitle;
    private String faTitle;

    ZoneType(String value, String enTitle, String faTitle) {
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

    public static ZoneType fromValue(String value) {
        for (ZoneType zoneType : ZoneType.values()) {
            if(zoneType.getValue().equalsIgnoreCase(value))
                return zoneType;
        }
        return NONE;
    }
}
