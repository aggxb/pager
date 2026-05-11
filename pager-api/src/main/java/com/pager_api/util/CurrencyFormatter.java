package com.pager_api.util;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.Locale;

public class CurrencyFormatter {
    public static String formatToBRL(BigDecimal value) {
        Locale localeBR = Locale.forLanguageTag("pt-BR");

        NumberFormat formatter = NumberFormat.getCurrencyInstance(localeBR);

        return formatter.format(value);
    }
}
