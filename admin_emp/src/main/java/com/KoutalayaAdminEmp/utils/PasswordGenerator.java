package com.KoutalayaAdminEmp.utils;

import java.security.SecureRandom;

public class PasswordGenerator {
    private static final String NUMBER_SET = "0123456789";
    private static final int PASSWORD_LENGTH = 6;
    private static final SecureRandom Random = new SecureRandom();

    public static String generateAdminPassword() {
        StringBuilder sb = new StringBuilder(PASSWORD_LENGTH);
        for (int i = 0; i < PASSWORD_LENGTH; i++) {
            int index = Random.nextInt(NUMBER_SET.length());
            sb.append(index);
        }
        return sb.toString();
    }
}
