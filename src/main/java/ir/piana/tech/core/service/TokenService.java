package ir.piana.tech.core.service;

import ir.piana.tech.business.data.entity.UserEntity;
import ir.piana.tech.core.enums.TokenAction;
import ir.piana.tech.core.enums.TokenType;
import ir.piana.tech.core.exception.*;
import ir.piana.tech.core.model.TokenModel;
import ir.piana.tech.core.secuity.PianaAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 8/10/2019 10:28 AM
 **/
@Service
public class TokenService {
    @Autowired
    private CacheManager cacheManager;

    @Autowired
    private PianaAuthenticationService authenticationService;

    @Autowired
    private KavenegarService kavenegarService;

    public void addToken(String mobile, TokenType tokenType, TokenAction tokenAction, UserEntity related)
            throws TokenRelatedException {
        Cache cache = cacheManager.getCache("verify-token");
        Cache.ValueWrapper valueWrapper = cache.get(mobile);
        TokenModel tokenModel = null;
        if (valueWrapper != null) {
            tokenModel = (TokenModel) valueWrapper.get();
        } else {
            tokenModel = TokenModel.builder()
                    .tokenAction(tokenAction)
                    .tokenType(tokenType)
                    .mobile(mobile)
                    .verificationCode("123456")
                    .related(related)
                    .build();
        }
        cache.evict(mobile);
        cache.put(mobile, tokenModel);
        kavenegarService.sendVerificationCode(mobile, tokenModel.getVerificationCode());
        throw new TokenRelatedException(tokenModel, "please verify token");
    }

    public void checkAndRevokeToken(
            String code, TokenType tokenType, TokenAction tokenAction)
            throws PianaHttpException {
        UserEntity userEntity = authenticationService.getUserEntity();
        Cache cache = cacheManager.getCache("verify-token");
        Cache.ValueWrapper valueWrapper = cache.get(userEntity.getMobile());
        TokenModel tokenModel = null;
        if (valueWrapper == null) {
            throw new NotFoundRelatedException("token not exist!");
        } else {
            tokenModel = (TokenModel) valueWrapper.get();
            if (tokenModel.getTokenAction() != tokenAction) {
                throw new UserRelatedException("action of token is incorrect!");
            } else if (tokenModel.getTokenType() != tokenType) {
                throw new UserRelatedException("type of token is incorrect!");
            } else if (!tokenModel.getVerificationCode().equals(code)) {
                throw new UserRelatedException("verification code is incorrect!");
            }
        }
        cache.evict(userEntity.getMobile());
    }
}
