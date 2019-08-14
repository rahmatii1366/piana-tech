package ir.piana.tech;

import ir.piana.tech.api.dto.GroupDto;
import ir.piana.tech.business.data.entity.GroupEntity;
import ir.piana.tech.business.data.entity.UserEntity;
import ir.piana.tech.core.enums.AgeLevelType;
import ir.piana.tech.core.mapper.GroupMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.event.EventListener;

@SpringBootApplication()
@EnableCaching
public class PianaTechApplication {
	@Autowired
	GroupMapper groupMapper;

	public static void main(String[] args) {
		SpringApplication.run(PianaTechApplication.class, args);
	}

	@EventListener(ApplicationReadyEvent.class)
	public void start() {
		UserEntity userEntity = new UserEntity();
		userEntity.setUsername("kk");
		GroupEntity entity = new GroupEntity();
		entity.setUserEntity(userEntity);
		entity.setAgeLevel(AgeLevelType.FREE);
		entity.setName("ali");
		entity.setLatitude(53.0);
		entity.setLongitude(35.0);
		GroupDto groupDto = groupMapper.toGroupDto(entity);
		System.out.println(groupDto.getAgeLevel());

	}
}
