import React, { Component } from "react";
import ItemManagerContract from "./contracts/ItemManager.json";
import Itemcontract from "./contracts/Item.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { loaded: false, cost: 0, itemName: "example1" };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();
      this.instance = new this.web3.eth.Contract(
        ItemManagerContract.abi,
        ItemManagerContract.networks[this.networksId] &&
          ItemManagerContract.networks[this.networkId].address
      );

      this.item = new this.web3.eth.Contract(
        Itemcontract.abi,
        Itemcontract.networks[this.networkId] &&
          Itemcontract.networks[this.networkId].address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // this.listenToPaymentEvent();
      this.setState({ loaded: true });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  listenToPaymentEvent = () => {
    let self = this;
    this.itemManager.events.SupplyChainStep().on("data", async function (evt) {
      if (evt.returnValues._step === 1) {
        let item = await self.itemManager.methods
          .items(evt.returnValues._itemIndex)
          .call();
        console.log(item);
        alert("Item " + item._identifier + " was paid, deliver it now!");
      }
      console.log(evt);
    });
  };

handleSubmit = async () => {
    const { cost, itemName } = this.state;
    console.log(itemName, cost, this.itemManager);
  //   let result = await this.itemManager.methods.createItem(itemName, cost).send({ from:
  //  this.accounts[0] });
  //   console.log(result);
  //   alert("Send "+cost+" Wei to "+result.events.SupplyChainStep.returnValues._address);
  };
    
handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
    [name]: value
    });
  };
   

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div>
          <h1>Simply Payment/Supply Chain Example!</h1>
          <h2>Items</h2>
          <h2>Add Element</h2>
        </div>
        <div className="costdiv">
          Cost:{" "}
          <input
            type="text"
            className="cost"
            value={this.state.cost}
            onChange={this.handleInputChange}
          />
        </div>

        <div className="itemdiv">
          Item Name:{" "}
          <input
            name="ItemName"
            type="text"
            className="itemName"
            value={this.state.itemName}
            onChange={this.handleInputChange}
          />
          <button className="button1" type="button" onClick={this.handleSubmit}>
            Create new Item
          </button>
        </div>
      </div>
    );
  }
}

export default App;
