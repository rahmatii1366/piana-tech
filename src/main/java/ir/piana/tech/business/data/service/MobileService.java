package ir.piana.tech.business.data.service;

import ir.piana.tech.api.dto.MeDto;
import ir.piana.tech.api.dto.RoleEnum;
import ir.piana.tech.api.dto.RuleEnum;
import ir.piana.tech.business.data.entity.MobileEntity;
import ir.piana.tech.business.data.repository.MobileRepository;
import ir.piana.tech.business.enums.GenderType;
import ir.piana.tech.business.helper.EmailHelper;
import ir.piana.tech.business.helper.JwtHelper;
import ir.piana.tech.core.enums.RoleType;
import ir.piana.tech.core.enums.RuleType;
import ir.piana.tech.core.exception.PianaHttpException;
import ir.piana.tech.core.exception.UserRelatedException;
import ir.piana.tech.core.model.MeModel;
import ir.piana.tech.core.secuity.PianaAuthenticationService;
import ir.piana.tech.core.util.PianaDigester;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/14/2019 2:45 PM
 **/
@Service
public class MobileService {
    @Autowired
    private MobileRepository mobileRepository;

    @Autowired
    private HttpSession session;

    @Autowired
    private EmailHelper emailHelper;

    @Autowired
    private PianaAuthenticationService authenticationService;

    @Autowired
    private JwtHelper jwtHelper;

//    @Autowired
//    private HazelcastInstance instance;

    @Autowired
    private CacheManager cacheManager;

    @Value("${piana.email.link.prefix}")
    private String linkPrefix;

    @Autowired
    private Random random;

    private Map<String, String> loginMap = new LinkedHashMap<>();

    @Autowired
    @Qualifier("getPianaDigester")
    private PianaDigester pianaDigester;

    @Transactional
    public MeModel signup(String mobile, String password) throws PianaHttpException {
        MobileEntity mobileEntity = null;
        mobileEntity = createEntityIfNotRegistered(mobile, password);

//        emailHelper.sendEmail(mobile, "کد فعالسازی", code);

//        return MeModel.builder().email(email).role(RoleType.GUEST).rule(RuleType.VERIFY_EMAIL).build();
        return authenticationService.authenticateMe(mobileEntity);
    }

    public MeModel login(String mobile, String password) throws UserRelatedException {
        Example<MobileEntity> mobileEntityExample = Example.of(new MobileEntity(mobile, pianaDigester.digest(password)));
        Optional<MobileEntity> one = mobileRepository.findOne(mobileEntityExample);
        return authenticationService.authenticateMe(
                one.orElseThrow(() -> new UserRelatedException("Mobile number or Password are incorrect")));
    }

    public String forgetPassword(String mobile, String newPassword) throws UserRelatedException {
        Optional<MobileEntity> one = mobileRepository.findByMobile(mobile);
        MobileEntity mobileEntity = one.orElseThrow(
                () -> new UserRelatedException("Mobile number not registered"));
        String code = null;
        Cache cache = cacheManager.getCache("verify-mobile");
        Cache.ValueWrapper valueWrapper = cache.get(mobile);
        if(valueWrapper != null) {
            code = (String) valueWrapper.get();
        } else {
            code = getRandomNumberString();
        }
        cache.evict(mobile);
        cache.put(mobile, code);
        return code;
    }

    @Transactional
    public MeModel verify(String code) throws PianaHttpException {
        MobileEntity mobileEntity = authenticationService.getMobileEntity();
        Cache cache = cacheManager.getCache("verify-mobile");
        Cache.ValueWrapper valueWrapper = cache.get(mobileEntity.getMobile());
        if(valueWrapper != null) {
            String orgCode = (String) valueWrapper.get();
            if(!code.equalsIgnoreCase(orgCode))
                throw new UserRelatedException("code invalid!");
            cache.evict(mobileEntity.getMobile());
        } else
            throw new UserRelatedException("not found any request for verify mobile number!");
        mobileEntity.setMobileVerified(true);
        mobileEntity.setRuleType(RuleType.FREE);
        mobileRepository.save(mobileEntity);
        return authenticationService.authenticateMe(mobileEntity);
    }

    @Transactional
    public MobileEntity createEntityIfNotRegistered(String mobile, String password) throws PianaHttpException {
        Example<MobileEntity> mobileEntityExample = Example.of(new MobileEntity(mobile));
        Optional<MobileEntity> one = mobileRepository.findOne(mobileEntityExample);
        if (one.isPresent())
            throw new UserRelatedException("this mobile already registered");
        MobileEntity mobileEntity = new MobileEntity();
        mobileEntity.setMobile(mobile);
        mobileEntity.setPassword(pianaDigester.digest(password));
        mobileEntity.setMobileVerified(false);
        mobileEntity.setEmailVerified(false);
        mobileEntity.setRuleType(RuleType.FREE);
        mobileEntity.setRoleType(RoleType.USER);
        return mobileRepository.save(mobileEntity);
    }

    private MeDto createMeDto(String email, RoleEnum roleEnum, RuleEnum ruleEnum) {
        if(email == null || email.isEmpty())
            throw new UserRelatedException("email is null");
        MeDto meDto = new MeDto();
        meDto.setEmail(email);
        meDto.setRole(roleEnum == null ? RoleEnum.GUEST : roleEnum);
        meDto.setRule(ruleEnum == null ? RuleEnum.FREE : ruleEnum);
        return meDto;
    }

    public String getRandomNumberString() {
        // It will generate 6 digit random Number.
        // from 0 to 999999
        int number = random.nextInt(999999);

        // this will convert any number sequence into 6 character.
        return String.format("%06d", number);
    }

}
