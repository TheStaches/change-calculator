import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountDue: 0,
      amountReceived: 0,
      twenties: 0,
      tens: 0,
      fives: 0,
      ones: 0,
      quarters: 0,
      dimes: 0,
      nickels: 0,
      pennies: 0,
      alert: "alert",
      alertText: ""
    }
    this.update = this.update.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  update(e) {
    this.setState({
      [e.target.name]: +e.target.value
    });
  }

  calculate(e) {
    e.preventDefault();
    let due = this.state.amountDue;
    let received = this.state.amountReceived;

    if (received >= due) {
      let bills = Math.floor(received - due);
      let cents = Math.round((received - due) * 100) % 100;

      let twenties = Math.floor(bills / 20);
      bills -= twenties * 20;

      let tens = Math.floor(bills / 10);
      bills -= tens * 10;

      let fives = Math.floor(bills / 5);
      bills -= fives * 5;

      let ones = bills;

      let quarters = Math.floor(cents / 25);
      cents -= quarters * 25;

      let dimes = Math.floor(cents / 10);
      cents -= dimes * 10;

      let nickels = Math.floor(cents / 5);
      cents -= nickels * 5;

      let pennies = cents;

      this.setState({
        twenties: twenties,
        tens: tens,
        fives: fives,
        ones: ones,
        quarters: quarters,
        dimes: dimes,
        nickels: nickels,
        pennies: pennies,
        alert: "alert alert-success",
        alertText: "The total change due is $" + (this.state.amountReceived - this.state.amountDue)
      });
    } else {
      this.setState({
        twenties: 0,
        tens: 0,
        fives: 0,
        ones: 0,
        quarters: 0,
        dimes: 0,
        nickels: 0,
        pennies: 0,
        alert: "alert alert-danger",
        alertText: "You owe another $" + (this.state.amountDue - this.state.amountReceived).toFixed(2)
      }); 
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Change Calculator</h1>
        <hr />

        <div className="row">
          
          {/* Left Column */}
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-heading">Enter Information</div>
              
              <div className="panel-body">How much is due?</div>
              <form className="form-group">
              <input className="form-control" value={this.state.amountDue} type="number" name="amountDue" onChange={this.update}/>
              </form>
              
              <div className="panel-body">How much was received?</div>
              <form className="form-group">
              <input className="form-control" value={this.state.amountReceived} type="number" name="amountReceived" onChange={this.update}/>
              <button className="btn btn-primary btn-block" onClick={this.calculate}>Calculate</button>
              </form>
              
            </div>
          </div> 

          {/* Right Column */}
          <div className="col-md-8">
            <div className="panel panel-default">
              
              {/* Alert */}
              <div className={this.state.alert} style={{"textAlign": "center"}}>
                {this.state.alertText}
              </div>

              {/* Bills */}
              <div className="row">
                <div className="col-md-3">
                    <div className="well">
                      <h4>Twenties</h4>
                      <p className="change">{this.state.twenties}</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="well">
                      <h4>Tens</h4>
                      <p className="change">{this.state.tens}</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="well">
                      <h4>Fives</h4>
                      <p className="change">{this.state.fives}</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="well">
                      <h4>Ones</h4>
                      <p className="change">{this.state.ones}</p>
                    </div>
                  </div>
                </div>

              {/* Cents */}
                <div className="row">
                  <div className="col-md-3">
                    <div className="well">
                      <h4>Quarters</h4>
                      <p className="change">{this.state.quarters}</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="well">
                      <h4>Dimes</h4>
                      <p className="change">{this.state.dimes}</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="well">
                      <h4>Nickels</h4>
                      <p className="change">{this.state.nickels}</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="well">
                      <h4>Pennies</h4>
                      <p className="change">{this.state.pennies}</p>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div> 
      </div>
    );
  }
}

export default App;
