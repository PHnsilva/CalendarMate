package br.com.calendarmate.routing.domain;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class GeoCoordinatesTest {
    @ParameterizedTest
    @CsvSource({"0,0", "90,180", "-90,-180", "90,-180", "-90,180", "-20.253,-43.802"})
    void acceptsFiniteCoordinatesIncludingWorldBoundaries(double latitude, double longitude) {
        assertTrue(GeoCoordinates.isValid(latitude, longitude));
    }

    @ParameterizedTest
    @CsvSource({"90.000001,0", "-90.000001,0", "0,180.000001", "0,-180.000001",
            "NaN,0", "0,NaN", "Infinity,0", "-Infinity,0", "0,Infinity", "0,-Infinity"})
    void rejectsOutOfRangeAndNonFiniteCoordinates(double latitude, double longitude) {
        assertFalse(GeoCoordinates.isValid(latitude, longitude));
    }

    @Test
    void rejectsMissingCoordinateInsteadOfTreatingItAsZero() {
        assertFalse(GeoCoordinates.isValid(null, 0.0));
        assertFalse(GeoCoordinates.isValid(0.0, null));
        assertFalse(GeoCoordinates.isValid(null, null));
    }
}
