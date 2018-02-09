function add(a, b) {
    return a + b
}

describe("add", () => {
    it("should add 2 numbers", () => {
        expect(add(1,2)).toBe(3)
    })
})