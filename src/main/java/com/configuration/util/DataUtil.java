package com.configuration.util;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.*;

public class DataUtil {
    private static final Logger LOGGER = Logger.getLogger(DataUtil.class);
    private static final String SQL_WILDCARD = "%";

    public DataUtil() {
    }

    public static String[] combineStringArrays(final List<String[]> stringArrayList) {
        if (isEmpty((Collection) stringArrayList)) {
            return null;
        } else {
            List<String> stringList = new ArrayList();
            Iterator var2 = stringArrayList.iterator();

            while (true) {
                String[] stringArray;
                do {
                    if (!var2.hasNext()) {
                        return (String[]) stringList.toArray(new String[stringList.size()]);
                    }

                    stringArray = (String[]) var2.next();
                } while (!isNotEmpty((Object[]) stringArray));

                String[] var4 = stringArray;
                int var5 = stringArray.length;

                for (int var6 = 0; var6 < var5; ++var6) {
                    String string = var4[var6];
                    stringList.add(string);
                }
            }
        }
    }

    public static boolean hasAValue(final String str) {
        return !hasNoValue(str);
    }

    public static boolean hasAValue(final Integer i) {
        return !hasNoValue(i);
    }

    public static boolean hasAValue(final Double d) {
        return !hasNoValue(d);
    }

    public static boolean hasAValue(final Date date) {
        return !hasNoValue(date);
    }

    public static boolean hasAValue(final BigDecimal b) {
        return !hasNoValue(b);
    }

    public static boolean hasAValue(final Long l) {
        return !hasNoValue(l);
    }

    public static boolean hasAValue(final Boolean bool) {
        return !hasNoValue(bool);
    }

    public static boolean hasNoValue(final String str) {
        return str == null || str.trim().length() == 0;
    }

    public static boolean hasNoValue(final Integer i) {
        return i == null;
    }

    public static boolean hasNoValue(final Double d) {
        return d == null;
    }

    public static boolean hasNoValue(final BigDecimal b) {
        return b == null;
    }

    public static boolean hasNoValue(final Date date) {
        return date == null;
    }

    public static boolean hasNoValue(final Long l) {
        return l == null;
    }

    public static boolean hasNoValue(final Boolean bool) {
        return bool == null;
    }

    public static boolean isNull(final Object object) {
        return object == null;
    }

    public static boolean isNotNull(final Object object) {
        return object != null;
    }

    public static boolean listHasData(final List<?> list) {
        return isNotNull(list) && !list.isEmpty() && list.size() > 0;
    }

    public static boolean isEmpty(final Object[] array) {
        return isNull(array) || array.length == 0;
    }

    public static boolean isNotEmpty(final Object[] array) {
        return !isEmpty(array);
    }

    public static boolean isEmpty(final Collection collection) {
        return isNull(collection) || collection.isEmpty();
    }

    public static boolean isNotEmpty(final Collection collection) {
        return !isEmpty(collection);
    }

    public static boolean isEmpty(final Map map) {
        return isNull(map) || map.isEmpty();
    }

    public static boolean isNotEmpty(final Map map) {
        return !isEmpty(map);
    }

    public static String formatDate(final Date date, final String format) {
        if (!hasNoValue(date) && !hasNoValue(format)) {
            SimpleDateFormat formatter = new SimpleDateFormat(format);
            return formatter.format(date);
        } else {
            return null;
        }
    }

    public static Date stringToDate(final String stringDate, final String... dateFormats) {
        Date date = null;
        if (hasAValue(stringDate) && isNotEmpty((Object[]) dateFormats)) {
            String[] var3 = dateFormats;
            int var4 = dateFormats.length;

            for (int var5 = 0; var5 < var4; ++var5) {
                String dateFormat = var3[var5];
                date = getDate(stringDate, dateFormat);
                if (isNotNull(date)) {
                    return date;
                }
            }
        }

        return date;
    }

    public static Date getDate(final String strDate, final String format) {
        if (!hasNoValue(strDate) && !hasNoValue(format)) {
            SimpleDateFormat formatter = new SimpleDateFormat(format);
            Date date = null;

            try {
                date = formatter.parse(strDate);
                return date;
            } catch (ParseException var5) {
                LOGGER.error(var5);
                return date;
            }
        } else {
            return null;
        }
    }

    public static Date createDate(final int year, final int month, final int day) {
        return createDate(year, month, day, 0, 0, 0);
    }

    public static Date createDate(final int year, final int month, final int day, final int hour, final int minute, final int second) {
        Calendar cal = Calendar.getInstance();
        cal.set(year, month, day, hour, minute, second);
        cal.set(14, 0);
        return cal.getTime();
    }

    public static String createWildCardString(String str) {
        if (hasNoValue(str)) {
            return null;
        } else {
            str = "%".concat(str).concat("%");
            return str;
        }
    }

    public static String startsWithWildCardString(String str) {
        if (hasNoValue(str)) {
            return null;
        } else {
            str = str.concat("%");
            return str;
        }
    }

    public static String endsWithWildCardString(String str) {
        if (hasNoValue(str)) {
            return null;
        } else {
            str = "%".concat(str);
            return str;
        }
    }

    public static String getString(final Integer i) {
        return isNull(i) ? null : String.valueOf(i);
    }

    public static String getString(final Long l) {
        return isNull(l) ? null : String.valueOf(l);
    }

    public static String getString(final Boolean b) {
        if (isNull(b)) {
            return null;
        } else {
            return b ? "True" : "False";
        }
    }

    public static String getString(final BigDecimal bd) {
        return isNull(bd) ? null : String.valueOf(bd.doubleValue());
    }

    public static int getInt(final String str) {
        if (isNull(str)) {
            return 0;
        } else {
            try {
                return Integer.parseInt(str.trim());
            } catch (Exception var2) {
                LOGGER.error(var2);
                return 0;
            }
        }
    }

    public static long getLong(final String str) {
        if (isNull(str)) {
            return 0L;
        } else {
            try {
                return Long.parseLong(str.trim());
            } catch (Exception var2) {
                LOGGER.error(var2);
                return 0L;
            }
        }
    }

    public static long getLong(final int i) {
        return Long.valueOf((long) i);
    }

    public static BigDecimal getBigDecimal(final String str) {
        BigDecimal bigDecimal = null;
        if (hasNoValue(str)) {
            return null;
        } else {
            try {
                bigDecimal = new BigDecimal(str.trim());
                return bigDecimal;
            } catch (Exception var3) {
                LOGGER.error(var3);
                return null;
            }
        }
    }

    public static String toUpper(final String str) {
        return hasNoValue(str) ? null : str.trim().toUpperCase();
    }

    public static <T> T nullSafe(final T value, final T defaultValue) {
        if (isNull(value)) {
            if (isNull(defaultValue)) {
                throw new IllegalArgumentException("Parameter 'defaultValue' cannot be null!");
            } else {
                return defaultValue;
            }
        } else {
            return value;
        }
    }

    public static <T> boolean hasDuplicate(final Iterable<T> iterable) {
        if (isNull(iterable)) {
            return false;
        } else {
            Set<T> set = new HashSet();
            Iterator var2 = iterable.iterator();

            Object each;
            do {
                if (!var2.hasNext()) {
                    return false;
                }

                each = var2.next();
            } while (set.add((T) each));

            return true;
        }
    }

    public static String leftPad(final String str, final int padNum, final String padWith) {
        if (hasNoValue(str)) {
            return null;
        } else {
            return str.trim().length() < padNum ? StringUtils.leftPad(str.trim(), padNum, padWith) : str.trim();
        }
    }

    public static Integer compareTimes(final Date d1, final Date d2) {
        if (!isNull(d1) && !isNull(d2)) {
            Calendar currentCal = Calendar.getInstance();
            currentCal.setTime(d1);
            Calendar runCal = Calendar.getInstance();
            runCal.setTime(d2);
            runCal.set(5, currentCal.get(5));
            runCal.set(2, currentCal.get(2));
            runCal.set(1, currentCal.get(1));
            return (int) (currentCal.getTimeInMillis() - runCal.getTimeInMillis());
        } else {
            return null;
        }
    }

    public static String encodeBase64(final byte[] byteArray) {
        return isNull(byteArray) ? null : Base64.encodeBase64String(byteArray);
    }

    public static byte[] decodeBase64(final String str) {
        return isNull(str) ? null : Base64.decodeBase64(str);
    }

    public static Date getEndOfDayDate(final Date date) {
        if (hasNoValue(date)) {
            return date;
        } else {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date);
            calendar.set(11, 23);
            calendar.set(12, 59);
            calendar.set(13, 59);
            calendar.set(14, 999);
            return calendar.getTime();
        }
    }

    public static int getDayOfWeek() {
        return getDayOfWeek(new Date());
    }

    public static int getDayOfWeek(final Date date) {
        if (isNull(date)) {
            return -1;
        } else {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date);
            return calendar.get(7);
        }
    }

    public static Date getTodaysDateUTC() {
        return Date.from(ZonedDateTime.now(ZoneOffset.UTC).toInstant());
    }

    public static Date getTodaysDate() {
        return getTodaysDate(0, 0);
    }

    public static Date getTodaysDate(final int hourOfDay, final int minute) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(11, hourOfDay);
        calendar.set(12, minute);
        calendar.set(13, 0);
        calendar.set(14, 0);
        return calendar.getTime();
    }

    public static Date getDateAddDays(final Date date, final int days) {
        return getDateAddUnits(date, days, 5);
    }

    public static Date getDateAddMinutes(final Date date, final int minutes) {
        return getDateAddUnits(date, minutes, 12);
    }

    public static Date getDateAddUnits(final Date date, final int units, final int type) {
        if (hasNoValue(date)) {
            return date;
        } else {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date);
            calendar.add(type, units);
            return calendar.getTime();
        }
    }

    public static boolean isFirstDateAfterSecondDate(final Date firstDate, final Date secondDate) {
        return !isNull(firstDate) && !isNull(secondDate) ? firstDate.after(secondDate) : false;
    }

    public static boolean anyAreNull(final Object... objects) {
        if (isEmpty(objects)) {
            return true;
        } else {
            Object[] var1 = objects;
            int var2 = objects.length;

            for (int var3 = 0; var3 < var2; ++var3) {
                Object object = var1[var3];
                if (isNull(object)) {
                    return true;
                }
            }

            return false;
        }
    }

    public static <T> T firstNonNull(final T... objects) {
        if (isEmpty(objects)) {
            return null;
        } else {
            for (T object : objects) {
                if (isNotNull(object)) {
                    return object;
                }
            }

            return null;
        }
    }

    public static String trimStringByLength(final String str, final int length) {
        if (hasNoValue(str)) {
            return null;
        } else {
            return str.length() <= length ? str.trim() : str.substring(0, length);
        }
    }

    public static String buildDotNotation(final String... stringArray) {
        return (String) nullSafe(StringUtils.join(stringArray, "."), "");
    }

    public static <T> List<List<T>> splitList(final List<T> originalList, final int chunkSize) {
        List<List<T>> listChunks = new ArrayList();
        if (isEmpty((Collection) originalList)) {
            listChunks.add(Collections.emptyList());
        } else {
            for (int start = 0; start < originalList.size(); start += chunkSize) {
                int end = Math.min(start + chunkSize, originalList.size());
                listChunks.add(originalList.subList(start, end));
            }
        }

        return listChunks;
    }

    public static boolean exceptionContainsMessage(final Throwable exception, final String message) {
        if (anyAreNull(exception, message)) {
            return false;
        } else {
            boolean messageFound = isNotNull(exception.getMessage()) && exception.getMessage().contains(message);
            return messageFound || isNotNull(exception.getCause()) && !Objects.equals(exception, exception.getCause()) && exceptionContainsMessage(exception.getCause(), message);
        }
    }
}
