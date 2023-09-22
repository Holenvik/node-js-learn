import { PUBLIC_HOLIDAYS_API_URL } from "../config";
import * as helpers from "../helpers";
import * as services from "./public-holidays.service";
import axios from "axios";

const PUBLIC_HOLIDAYS = [
  {
    date: "2023-01-01",
    localName: "New Year's Day",
    name: "New Year's Day",
    countryCode: "GB",
    fixed: false,
    global: false,
    counties: ["GB-NIR"],
    launchYear: null,
    types: ["Public"],
  },
  {
    date: "2023-01-02",
    localName: "New Year's Day",
    name: "New Year's Day",
    countryCode: "GB",
    fixed: false,
    global: false,
    counties: ["GB-ENG", "GB-WLS"],
    launchYear: null,
    types: ["Public"],
  },
];

const NEXT_PUBLIC_HOLIDAYS = [
  {
    date: "2023-11-30",
    localName: "Saint Andrew's Day",
    name: "Saint Andrew's Day",
    countryCode: "GB",
    fixed: true,
    global: false,
    counties: ["GB-SCT"],
    launchYear: null,
    types: ["Public"],
  },
];

describe("Unit tests", () => {
  describe("getListOfPublicHolidays", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should return list of public holidays if success ", async () => {
      jest
        .spyOn(axios, "get")
        .mockImplementation(() => Promise.resolve({ data: PUBLIC_HOLIDAYS }));

      const publicHolidays = await services.getListOfPublicHolidays(2023, "GB");

      expect(publicHolidays).toEqual(
        PUBLIC_HOLIDAYS.map(helpers.shortenPublicHoliday)
      );
    });

    it("should return an empty array if failed ", async () => {
      jest.spyOn(axios, "get").mockImplementation(() => Promise.reject());

      const publicHolidays = await services.getListOfPublicHolidays(2023, "GB");

      expect(publicHolidays).toEqual([]);
    });
  });

  describe("checkIfTodayIsPublicHoliday", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should return true when today is a public holiday", async () => {
      const country = "GB";

      jest.spyOn(axios, "get").mockResolvedValue({ status: 200 });

      const result = await services.checkIfTodayIsPublicHoliday(country);

      expect(result).toBe(true);
    });

    it("should return false when today is not a public holiday", async () => {
      const country = "GB";

      jest.spyOn(axios, "get").mockResolvedValue({ status: 204 });

      const result = await services.checkIfTodayIsPublicHoliday(country);

      expect(result).toBe(false);
    });

    it("should return false when have Error", async () => {
      const country = "GB";

      jest.spyOn(axios, "get").mockRejectedValue(new Error());

      const result = await services.checkIfTodayIsPublicHoliday(country);

      expect(result).toBe(false);
    });
  });

  describe("getNextPublicHolidays", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should return right list if call okay", async () => {
      const country = "GB";

      jest
        .spyOn(axios, "get")
        .mockResolvedValue({ data: NEXT_PUBLIC_HOLIDAYS });

      const result = await services.getNextPublicHolidays(country);

      expect(result).toEqual(
        NEXT_PUBLIC_HOLIDAYS.map(helpers.shortenPublicHoliday)
      );
    });

    it("should return empty array if call not okay", async () => {
      const country = "GB";

      jest.spyOn(axios, "get").mockRejectedValue(new Error());

      const result = await services.getNextPublicHolidays(country);

      expect(result).toEqual([]);
    });
  });
});

describe("integration tests", () => {
  describe("getNextPublicHolidays", () => {
    it("should get list of public holidays", async () => {
      const year = 2023;
      const country = "GB";

      try {
        const result = await services.getListOfPublicHolidays(year, country);

        expect(Array.isArray(result)).toBe(true);
      } catch (error) {
        throw error;
      }
    });
  });

  describe("checkIfTodayIsPublicHoliday", () => {
    it("should check if today is a public holiday", async () => {
      const country = "GB";

      try {
        const result = await services.checkIfTodayIsPublicHoliday(country);
        expect(typeof result).toBe("boolean");
      } catch (error) {
        throw error;
      }
    });
  });

  describe("getNextPublicHolidays", () => {
    it("should get next public holidays", async () => {
      const country = "GB";

      try {
        const result = await services.getNextPublicHolidays(country);
        expect(Array.isArray(result)).toBe(true);
      } catch (error) {
        // Handle the error here
        throw error;
      }
    });
  });
});

describe("E2E tests", () => {
  describe("/Version", () => {
    it("should return version", async () => {
      try {
        const response = await axios.get(`${PUBLIC_HOLIDAYS_API_URL}/Version`);

        expect(response.status).toBe(200);
        expect(response.data).toEqual(
          expect.objectContaining({
            name: expect.any(String),
            version: expect.any(String),
          })
        );
      } catch (error) {
        throw error;
      }
    });
  });

  describe("/AvailableCountries", () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    it("should return of available countries", async () => {
      try {
        const response = await axios.get(
          `${PUBLIC_HOLIDAYS_API_URL}/AvailableCountries`
        );

        expect(response.status).toBe(200);
        response.data.forEach((country: string) => {
          expect(country).toEqual({
            countryCode: expect.any(String),
            name: expect.any(String),
          });
        });
      } catch (error) {
        throw error;
      }
    });
  });
});
