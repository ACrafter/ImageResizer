import { processImg, getImg } from "../controllers/jpeg";

describe("Testing processImg Function from the JPEG controller", () => {
  it("should return 0 without creating the image", async () => {
    const data = await processImg("tree", 771, 480);
    expect(data).toEqual(0);
  });

  it("should return 0 and create the image", async () => {
    const data = await processImg("tree", 200, 200);
    expect(data).toEqual(0);
  });

  it("should return -1 (missing image)", async () => {
    const data = await processImg("somename", 100, 200);
    expect(data).toEqual(-1);
  });
});

describe("Testing getImg Function from the JPEG controller", () => {
  it("should return a 0 without creating the image", async () => {
    const data = await getImg("tree", 200, 200);
    expect(data).toEqual(0);
  });

  it("should return -1 & Create the image", async () => {
    const data = await getImg("tree", 200, 1000);
    expect(data).toEqual(-1);
  });
});
