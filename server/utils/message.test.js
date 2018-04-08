const expect = require("expect");
const { generateMessage } = require("./message");

describe("MESSAGE /generateMessage(from, text)", () => {
  it("should generate message object", () => {
    const from = "Admin";
    const text = "message text";
    const messageGenerated = generateMessage(from, text);
    expect(messageGenerated.from).toBe(from);
    expect(messageGenerated.text).toBe(text);
    // expect(messageGenerated).toInclude({
    //   from,
    //   text
    // });
    expect(messageGenerated.createdAt).toBeTruthy();
  });
});
