import * as helpers from "./helpers";
import { PublicHoliday, PublicHolidayShort } from "./types";

describe("validateCountry", () => {
  it("should return true for a supported country", () => {
    const supportedCountry = "GB";
    expect(helpers.validateCountry(supportedCountry)).toBe(true);
  });

  it("should return false for an unsupported country", () => {
    const unsupportedCountry = "XYZ";
    expect(helpers.validateCountry(unsupportedCountry)).toBe(false);
  });
});

describe("validateYear", () => {
  it("should return true for the current year", () => {
    const currentYear = new Date().getFullYear();
    expect(helpers.validateYear(currentYear)).toBe(true);
  });

  it("should return false for a non-current year", () => {
    const nonCurrentYear = new Date().getFullYear() - 1;
    expect(helpers.validateYear(nonCurrentYear)).toBe(false);
  });
});

describe("validateInput", () => {
  it("should not throw an error for valid input", () => {
    const input = { year: new Date().getFullYear(), country: "GB" };
    expect(() => helpers.validateInput(input)).not.toThrow();
  });

  it("should throw an error for an unsupported country", () => {
    const input = { year: new Date().getFullYear(), country: "XYZ" };
    expect(() => helpers.validateInput(input)).toThrowError(
      "Country provided is not supported"
    );
  });

  it("should throw an error for a non-current year", () => {
    const input = { year: new Date().getFullYear() - 1, country: "GB" };
    expect(() => helpers.validateInput(input)).toThrowError(
      "Year provided not the current"
    );
  });
});

describe("shortenPublicHoliday", () => {
  it("should shorten a PublicHoliday object", () => {
    const holiday: PublicHoliday = {
      name: "New Year",
      localName: "New Year",
      date: "2023-01-01",
      countryCode: "US",
      fixed: true,
      global: false,
      counties: ["County A", "County B"],
      launchYear: 2022,
      types: ["Type A", "Type B"],
    };
    const shortened = helpers.shortenPublicHoliday(holiday);

    const expectedShortened: PublicHolidayShort = {
      name: "New Year",
      localName: "New Year",
      date: "2023-01-01",
    };

    expect(shortened).toEqual(expectedShortened);
  });
});
