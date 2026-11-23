package br.com.calendarmate.routing.domain;

/** Geographic coordinate policy independent of bookings and external providers. */
public final class GeoCoordinates {
    private GeoCoordinates() {}

    public static boolean isValid(Double latitude, Double longitude) {
        return latitude != null && longitude != null
                && Double.isFinite(latitude) && Double.isFinite(longitude)
                && Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180;
    }
}
