package ir.piana.tech.core.enums;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 8/10/2019 10:25 AM
 **/
public enum PlayerPositionType {
    NONE("NONE", "not selected", "انتخاب نشده"),
    G("G", "goal keeper", "گلر"),
    CB("CB","center backfield", "دفاع وسط"),
    LB("LB","left backfield", "دفاع چپ"),
    RB("RB","right backfield", "دفاع راست"),
    CM("CM","center midfielder", "هافبک وسط"),
    DM("DM","defensive midfielder", "هافبک دفاعی"),
    LM("LM","left midfielder", "هافبک چپ"),
    RM("RM","right midfielder", "هافبک راست"),
    CF("CF","center midfielder", "مهاجم");

    private String value;
    private String enTitle;
    private String faTitle;

    PlayerPositionType(String value, String enTitle, String faTitle) {
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

    public static PlayerPositionType fromValue(String value) {
        for (PlayerPositionType playerPositionType : PlayerPositionType.values()) {
            if(playerPositionType.getValue().equalsIgnoreCase(value))
                return playerPositionType;
        }
        return NONE;
    }
}
