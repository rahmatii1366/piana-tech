package ir.piana.tech;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.event.EventListener;

@SpringBootApplication()
@EnableCaching
public class PianaTechApplication {

	public static void main(String[] args) {
		SpringApplication.run(PianaTechApplication.class, args);
	}
//	@Autowired
//	GroupMapper groupMapper;
//
//	@Autowired
//	InvitedUsersConverter converter;
//
//	@Autowired
//	InvitedMapper invitedMapper;

	@EventListener(ApplicationReadyEvent.class)
	public void start() {
//		UserEntity userEntity = new UserEntity();
//		userEntity.setUsername("kk");
//		GroupEntity entity = new GroupEntity();
//		entity.setUserEntity(userEntity);
//		entity.setAgeLevel(AgeLevelType.FREE);
//		entity.setName("ali");
//		entity.setLatitude(53.0);
//		entity.setLongitude(35.0);
//		GroupDto groupDto = groupMapper.toGroupDto(entity);
//		System.out.println(groupDto.getAgeLevel());

//		List<InvitedUserModel> invitedModels = new ArrayList<>();
//		invitedModels.add(InvitedUserModel.builder().mobile("09197098989").build());
//		invitedModels.add(InvitedUserModel.builder().mobile("09019898765").build());
//		InviteDto inviteDto = invitedMapper.toInviteDto(invitedModels);
//		List<InvitedUserModel> invitedModels2 = invitedMapper.toInvitedModels(inviteDto);
//		String s = converter.convertToDatabaseColumn(invitedModels);
//		System.out.println(s);
//		List<InvitedUserModel> invitedModels1 = converter.convertToEntityAttribute(s);
//		System.out.println(invitedModels1.size());
	}
}
