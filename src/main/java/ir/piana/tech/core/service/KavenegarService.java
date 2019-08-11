package ir.piana.tech.core.service;

import com.kavenegar.sdk.KavenegarApi;
import com.kavenegar.sdk.models.SendResult;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 8/7/2019 9:12 AM
 **/
@Service
public class KavenegarService {
    private static final String API_KEY = "6B6773663258696B304F65576F4433516739573856513D3D";

    private KavenegarApi api;

    @PostConstruct
    public void init() {
        api = new KavenegarApi(API_KEY);
    }

    public void sendVerificationCode(String mobile, String code) {
        SendResult send = api.send("10006600060060", mobile, code);
    }
}
