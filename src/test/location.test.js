import { fetchLocation } from "../api";

describe("Fetch location", () => {
  it("Should be success fetch location", () => {
    const data = fetchLocation();
    expect(data).not.toBe(null)
  });
});
