const ItemManager = artifacts.require("./ItemManager.sol");

//like we use import to get files, we use require , artifacts renders this contract into json file and parse it
// and returns it

//in mocha testing framework we use describe
// we give this a name , in this case it's ItemManager
// next it takes callback function which fetches all the accounts
contract("ItemManager", (accounts) => {
  //it is like it should do this and 2nd we again give callback function

  it("... should let you create new Items.", async () => {
    // deployed give us deployed instance
    const itemManagerInstance = await ItemManager.deployed();
    const itemName = "test1";
    const itemPrice = 500;

    const result = await itemManagerInstance.createItem(itemName, itemPrice, {
      from: accounts[0],
    });

    // we check if the index is the first index or not
    assert.equal(
      result.logs[0].args._itemIndex,
      0,
      "There should be one item index in there"
    );

    // we check if the name is same as the name we set
    const item = await itemManagerInstance.items(0);
    assert.equal(
      item._identifier,
      itemName,
      "The item has a different identifier"
    );
  });
});
