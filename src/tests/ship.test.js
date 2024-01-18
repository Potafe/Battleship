import ship from "../factories/ship";

test("expect length", () => {
  const pirateShip = ship('carrier', 4);

  expect(pirateShip.getLength()).toBe(4);
});

test("expect hits", () => {
  const pirateShip = ship('carrier', 4);

  pirateShip.hit();
  pirateShip.hit();
  pirateShip.hit();


  expect(pirateShip.getHits()).toEqual(3);  
});

test("expect sunk", () => {
  const pirateShip = ship('carrier', 4);

  pirateShip.hit();
  pirateShip.hit();
  pirateShip.hit();
  pirateShip.hit();

  expect(pirateShip.sunkStatus()).toEqual(true);
});


test('expect name', () => {
  const shi = ship('carrier', 4)
  expect(shi.name).toEqual('carrier')
})
