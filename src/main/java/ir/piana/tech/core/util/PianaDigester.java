package ir.piana.tech.core.util;

import org.jasypt.util.digest.Digester;

import java.util.Base64;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 8/1/2019 1:29 PM
 **/
public class PianaDigester {
    private Digester digester;

    public PianaDigester(Digester digester) {
        this.digester = digester;
    }

    public String digest(String raw) {
        return Base64.getEncoder().encodeToString(digester.digest(raw.getBytes()));
    }
}
