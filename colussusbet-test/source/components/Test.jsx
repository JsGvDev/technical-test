import React from 'react';
import {observer} from 'mobx-react';

const HDA   = require('../../resource/images/hda.jpg');
const SCORE   = require('../../resource/images/score.jpg');

@observer
export class Test extends React.Component {

  constructor(props) {
      super(props);
      this.state= {
        loadinPools: false,
        pools: [],
        pool: null,
        betEnabled: false,
        stake: '1.0',
        matrizLines: null,
        numLines: 0,
        cost: 0,
        idS: []
      };
  }

  componentWillMount() {
      let {testStore} = this.props;
      let onResponse = ( res ) => {
        this.setState({pools: res });
        this.setState({loadinPools: true });
      };
      testStore.getPools().then(onResponse);
  }

  render() {


    return (
        <div>
            <div className="page-menu">
            {
            this.state.loadinPools ?
                this.renderPools() :
                this.renderLoading()
            }
            </div>
            <div className={`page-content ${this.state.pool ? '' : 'empty'}`}>
                <div id="ngview">
                {
                this.state.pool ?
                    this.renderLegs() :
                    this.renderChoosePool()
                }
                </div>
            </div>
        </div>

    );
  }

  renderLoading() {
      return (
        <div className="loding">
            <div className='loader'> LOADING </div>
        </div>
      );
  }
  renderPools() {
      return (
          <div>
            <div id="poolsMenu">
                <div className="panel menu" id="importantPools">
                    {this.state.pools.map(this.renderPool, this)}
                </div>
            </div>
          </div>
      );
  }
  renderPool(item, key) {
      return (
          <div key={'pool_'+key}>
              <a>
                {item.name} <span className="pool-count"> ({item.pools.length}) </span>
              </a>
              <ul className="selections-list">
                {item.pools.map(this.renderPoolId, this)}
              </ul>
          </div>
      );
  }
  renderPoolId(item, key) {
      return (
          <li onClick={this.handlePool.bind(this, item)} key={item.name+'_'+item.id}>
            <div className="clearfix">
              <span className="name">{item.name}</span>
              <span className="prize">{ (item.currency == 'GBP' ? '£' : '€')+item.headline_prize}</span>
            </div>
            <div className="clearfix">
              <span>{ item.type_code == 'CORRECT_SCORE' ? 'Correct Score' : '1x2' }</span>
            </div>
          </li>
      );
  }
  renderLegs() {
      return (
        <div className="legs">
            <div id="poolInfo-standard" style={{backgroundImage:`url(${this.state.pool.pool_info.type_code == 'CORRECT_SCORE' ? SCORE : HDA})`}}>
                <span className="pool-heading">
                    <span className="clearfix pool-title">{this.state.pool.pool_info.name}</span>
                    <span className="pool-type">{this.state.pool.pool_info.type_code == 'CORRECT_SCORE' ? 'Correct Score' : '1x2' }</span>
                </span>
                <hr></hr>
                <span className="clearfix title-WIN">Playing for</span>
                <span className="pool-prize">{ (this.state.pool.pool_info.currency == 'GBP' ? '£' : '€')+this.state.pool.pool_info.headline_prize}</span>
            </div>
            <div id="poolPick" >
                <div className="buttons-box">
                    <button className="pick-button">
                        <span>Smart pick</span>
                    </button>
                    <button className="clear-button" onClick={this.handleClearBet.bind(this)}>
                        <span>Clear</span>
                    </button>
                    <select className="stake-button" onChange={this.handleStake.bind(this)} value={this.state.stake}>
                        {this.state.pool.pool_stake.stakes.map(this.renderStake, this)}
                    </select>
                    <button className="play-button" onClick={this.handleBet.bind(this)} disabled={!this.state.betEnabled} style={{opacity:`${this.state.betEnabled  ? 1 : 0.5 }`}}>
                        <span>Play now</span>
                    </button>
                </div>
                <div className="ticket-cost">
                    <span className="key">Number of lines </span>
                    <span>{this.state.numLines} </span>
                    <span className="key">Ticket cost </span>
                    <span>£{this.state.cost}</span>
                </div>
            </div>
            <div id="poolLegs" >
                {
                this.state.pool.pool_info.type_code == 'CORRECT_SCORE' ?
                    this.state.pool.legs.map(this.renderScore, this) :
                    this.renderHDA()
                }
            </div>
        </div>
      );
  }
  renderChoosePool() {
      return (
        <div className="choosePool">
             CHOOSE A POOL
        </div>
      );
  }
  renderStake(item, key) {
      let currency = this.state.pool.pool_info.currency == 'GBP' ? '£' : '€';
      let valStr = item+'';
      return (
        <option key={item+'_'+key} label={`${currency+item}`} value={valStr}>{currency+item}</option>
      );
  }
  renderScore(item, key) {
      var styleHome = {
            borderColor: '#'+item.sport_event.competitors[0].colour
        },
        styleAway = {
          borderColor: '#'+item.sport_event.competitors[1].colour
          };
      return (
        <div key={item.type_code+'_'+key} className="leg-CS">
            <div className="competitor-box">
                <span className="competitor home" style={styleHome}>{item.sport_event.competitors[0].name}</span>
                <span className="competitor date">Tue, Aug 09 19:45</span>
                <span className="competitor away" style={styleAway}>{item.sport_event.competitors[1].name}</span>
            </div>
            <div className="clearfix home-selections">
                <ul className="selections-list">
                    <li onClick={this.handleLeg.bind(this, item, key, 0)} className="selection">
                        <span>{item.selections[0].name}</span>
                    </li>
                    <li onClick={this.handleLeg.bind(this, item, key, 1)} className="selection">
                        <span>{item.selections[1].name}</span>
                    </li>
                    <li onClick={this.handleLeg.bind(this, item, key, 2)} className="selection">
                        <span>{item.selections[2].name}</span>
                    </li>
                    <li onClick={this.handleLeg.bind(this, item, key, 3)} className="selection">
                        <span>{item.selections[3].name}</span>
                    </li>
                    <li onClick={this.handleLeg.bind(this, item, key, 4)} className="selection">
                        <span>{item.selections[4].name}</span>
                    </li>
                    <li onClick={this.handleLeg.bind(this, item, key, 5)} className="selection">
                        <span>{item.selections[5].name}</span>
                    </li>
                    <li onClick={this.handleLeg.bind(this, item, key, 6)} className="selection">
                        <span>{item.selections[6].name}</span>
                    </li>
                </ul>
            </div>
            <div className="clearfix space"></div>
            <div className="clearfix draw-selections">
                <ul className="selections-list">
                    <li onClick={this.handleLeg.bind(this, item, key, 7)} className="selection">
                        <span>{item.selections[7].name}</span>
                    </li>
                    <li onClick={this.handleLeg.bind(this, item, key, 8)} className="selection">
                        <span>{item.selections[8].name}</span>
                    </li>
                    <li onClick={this.handleLeg.bind(this, item, key, 9)} className="selection">
                        <span>{item.selections[9].name}</span>
                    </li>
                </ul>
            </div>
            <div className="clearfix space"></div>
            <div className="clearfix away-selections">
                <ul className="selections-list">
                    <li onClick={this.handleLeg.bind(this, item, key, 10)} className="selection">
                        <span>{item.selections[10].name}</span>
                    </li>
                    <li onClick={this.handleLeg.bind(this, item, key, 11)} className="selection">
                        <span>{item.selections[11].name}</span>
                    </li>
                    <li onClick={this.handleLeg.bind(this, item, key, 12)} className="selection">
                        <span>{item.selections[12].name}</span>
                    </li>
                    <li onClick={this.handleLeg.bind(this, item, key, 13)} className="selection">
                        <span>{item.selections[13].name}</span>
                    </li>
                    <li onClick={this.handleLeg.bind(this, item, key, 14)} className="selection">
                        <span>{item.selections[14].name}</span>
                    </li>
                    <li onClick={this.handleLeg.bind(this, item, key, 15)} className="selection">
                        <span>{item.selections[15].name}</span>
                    </li>
                    <li onClick={this.handleLeg.bind(this, item, key, 16)} className="selection">
                        <span>{item.selections[16].name}</span>
                    </li>
                </ul>
            </div>
        </div>
      );
  }
  renderHDA() {
      return (
        <div className="leg-HDA">
            <div className="title-box">
                <div className="title-info">
                    <span>Home</span>
                    <span>Draw</span>
                    <span>Away</span>
                </div>
            </div>
            <div className="leg-row">
                {this.state.pool.legs.map(this.renderLeg, this)}
            </div>
        </div>
      );
  }
  renderLeg(item, key) {
      var styleHome = {
            borderColor: '#'+item.sport_event.competitors[0].colour
        },
        styleAway = {
          borderColor: '#'+item.sport_event.competitors[1].colour
          };
      return (
          <div key={item.type_code+'_'+key} style={{marginTop: `10px`}}>
              <div className="competitor-box">
                  <span className="competitor home" style={styleHome}>{item.sport_event.competitors[0].name}</span>
                  <span className="competitor versus">vs</span>
                  <span className="competitor away" style={styleAway}>{item.sport_event.competitors[1].name}</span>
              </div>
              <div className="date-box">
                  <span className="date">Tue, Aug 09 19:45</span>
              </div>
              <div className="selections-box">
                  <ul className="selections-list">
                      <li onClick={this.handleLeg.bind(this, item, key, 0)}>
                          <div className="checkbox Home"><span >1</span></div>
                      </li>
                      <li onClick={this.handleLeg.bind(this, item, key, 1)}>
                          <div className="checkbox Draw"><span >X</span></div>
                      </li>
                      <li onClick={this.handleLeg.bind(this, item, key, 2)}>
                          <div className="checkbox Away"><span >2</span></div>
                      </li>
                  </ul>
              </div>
          </div>
      );
  }

  handleLeg(item, row, col, e) {
    e.preventDefault();
    var activeBtn = e.target;
    var ids = this.state.idS;
    if (e.nativeEvent.toElement.tagName == 'SPAN') {
        activeBtn = e.nativeEvent.toElement.parentElement
    }
    if (activeBtn.classList.value.indexOf('active') != -1) {
        activeBtn.classList.remove("active");
        ids = ids.filter( id => id != item.id)
        this.state.matrizLines[row][col] = false;
    } else {
        activeBtn.classList.add("active");
        if (this.state.idS.indexOf(item.id) == -1) {
            ids.push(item.id);
        }
        this.state.matrizLines[row][col] = true;
    }
    var numRows = [];
    var check = true;
    for (let i=0; i<this.state.matrizLines.length; i++) {
        let arrTemp = this.state.matrizLines[i].filter( val => val);
        if (arrTemp.length == 0 && check) {
            check = false;
        }
        numRows.push(arrTemp.length > 0 ? arrTemp.length : 1);
    }
    var numLines = numRows[0];
    for (let i=1; i<numRows.length; i++) {
        numLines = numLines*numRows[i];
    }
    var cost = numLines*this.state.stake;
    this.setState({idS: ids });
    this.setState({numLines: numLines });
    this.setState({cost: cost });
    if (check) {
        this.setState({betEnabled: true });
    } else {
        this.setState({betEnabled: false });
    }
    console.log(this.state);
  }

  handlePool(item, e) {
    e.preventDefault();
    let {testStore} = this.props;
    let onResponse = ( res ) => {
        console.log(res);
      this.setState({pool: res });
      var arr = [];
      for (var i = 0; i < res.legs.length; ++i) {
            var columns = [];
            for (var j = 0; j < res.legs[0].selections.length; ++j) {
                columns[j] = false;
            }
            arr[i] = columns;
      }
      this.setState({matrizLines: arr });
    };
    this.setState({idS: [] });
    this.setState({betEnabled: false });
    this.setState({numLines: 0 });
    this.setState({cost: 0 });
    $('.selection').removeClass('active');
    $('.checkbox').removeClass('active');
    testStore.getPool(item.id).then(onResponse);
  }
  handleStake(e) {
    e.preventDefault();
    if (e.target.value[0] == '0') {
        this.setState({stake: parseFloat(e.target.value)});
    } else {
        this.setState({stake: parseInt(e.target.value)});
    }
  }
  handleClearBet(e) {
    e.preventDefault();
    this.setState({idS: [] });
    this.setState({betEnabled: false });
    this.setState({numLines: 0 });
    this.setState({cost: 0 });
    $('.selection').removeClass('active');
    $('.checkbox').removeClass('active');
    var arr = [];
    for (var i = 0; i < this.state.pool.legs.length; ++i) {
          var columns = [];
          for (var j = 0; j < this.state.pool.legs[0].selections.length; ++j) {
              columns[j] = false;
          }
          arr[i] = columns;
    }
    this.setState({matrizLines: arr });
  }
  handleBet(e) {
    e.preventDefault();
    console.log(this.state);
    var posInLegs = [];
    for (let i=0; i<this.state.matrizLines.length; i++) {
        var legs = {
            id: this.state.pool.legs[i].id,
            scoreIds: []
        };
        let arrTemp = this.state.matrizLines[i];
        for (let j=0; j<arrTemp.length; j++) {
            if (arrTemp[j] == true) {
                legs.scoreIds.push(this.state.pool.legs[i].selections[j].id);
            }
        }
        posInLegs.push(legs);
    }
    var sendJson = {
        numLines: this.state.numLines,
        cost: this.state.cost,
        datas: posInLegs
    }
    console.log(sendJson)
    let {testStore} = this.props;
    let onResponse = ( res ) => {
        console.log('FIN',res)
    };
    testStore.postPool(sendJson).then(onResponse);
    this.setState({idS: [] });
    this.setState({betEnabled: false });
    this.setState({numLines: 0 });
    this.setState({cost: 0 });
    $('.selection').removeClass('active');
    $('.checkbox').removeClass('active');
    var arr = [];
    for (var i = 0; i < this.state.pool.legs.length; ++i) {
          var columns = [];
          for (var j = 0; j < this.state.pool.legs[0].selections.length; ++j) {
              columns[j] = false;
          }
          arr[i] = columns;
    }
    this.setState({matrizLines: arr });
    alert ('Success');
  }
}
