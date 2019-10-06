package ir.piana.tech.business.helper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.xml.bind.DatatypeConverter;
import java.io.*;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 9/23/2019 2:56 PM
 **/
@Component
public class ImageHelper {
    private Logger logger = LoggerFactory.getLogger(ImageHelper.class);

    public String saveByBase64ImageString(String base64ImageString, String path, String name) {
        String[] strings = base64ImageString.split(",");
        String extension;
        switch (strings[0]) {//check image's extension
            case "data:image/jpeg;base64":
                extension = "jpeg";
                break;
            case "data:image/png;base64":
                extension = "png";
                break;
            default://should write cases for more images types
                extension = "jpg";
                break;
        }
        //convert base64 string to binary data
        byte[] data = DatatypeConverter.parseBase64Binary(strings[1]);
        String abstractPath = path.concat("/").concat(name).concat(".").concat(extension);
        File file = new File(abstractPath);
        try (OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(file))) {
            outputStream.write(data);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return extension;
    }
}
