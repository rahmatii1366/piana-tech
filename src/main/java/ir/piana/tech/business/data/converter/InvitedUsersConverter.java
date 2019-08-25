package ir.piana.tech.business.data.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import ir.piana.tech.core.config.BeanUtil;
import ir.piana.tech.core.exception.ServerRelatedException;
import ir.piana.tech.core.model.InvitedUserModel;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 8/21/2019 11:43 AM
 **/
@Converter(autoApply = true)
public class InvitedUsersConverter implements AttributeConverter<List<InvitedUserModel>, String> {
    @Override
    public String convertToDatabaseColumn(List<InvitedUserModel> attribute) {
        try {
            if(attribute == null || attribute.isEmpty())
                return null;
            ObjectMapper objectMapper = BeanUtil.getBean(ObjectMapper.class);
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new ServerRelatedException("an error occurred during register invitation");
        }
    }

    @Override
    public List<InvitedUserModel> convertToEntityAttribute(String dbData) {
        try {
            if(dbData == null)
                return new ArrayList<>();
            ObjectMapper objectMapper = BeanUtil.getBean(ObjectMapper.class);
            return Arrays.asList(objectMapper.readValue(dbData, InvitedUserModel[].class));
        } catch (IOException e) {
            throw new ServerRelatedException("error on fetch invited list");
        }
    }
}
