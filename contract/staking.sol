// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7 .0 < 0.9 .0;

import "./TOKEN.sol";

contract STAKING {

    TOKEN CBR;   //TOKEN
    /***************DATA STURCTURE FOR BACKEND**********/
    struct GenInfo {
        uint256 roundStartTime;
        uint256 roundDuration;
        uint256 currentRate;
        uint256 lastUpdateIndex;
        uint256 lastUpdateRound;
        uint256 lastUpdateTVL;
    }

    struct IndInfo {
        uint256 stakingBalance;
        uint256 startIndex;
        uint256 startRound;
    }
    /***************DATA STURCTURE FOR BACKEND END **********/


    /************FRONT END DATA**************/
     struct FrontGenInfo {
        uint256 realTimeRound;
        uint256 realTimeTVL;
        uint256 realTimeIndex;
        uint256 currentRate;
    }

    struct FrontIndInfo{
        uint256 lastUpdateBalance;
        uint256 realTimeIndRound;
        uint256 realTimeBalance;
    }
    /************FRONT END DATA END**************/



    /*************STATE VARIABLE************/
    mapping(address => IndInfo) public indInfo;
    GenInfo public genInfo;
    /*************STATE VARIABLE END ************/

uint256 roundStartTime;
        uint256 roundDuration;
        uint256 currentRate;
        uint256 lastUpdateIndex;
        uint256 lastUpdateRound;
        uint256 lastUpdateTVL;

    constructor(
        address _tokenAddress,
        uint256 _roundStartTime,
        uint256 _currentRate,
        uint256 _roundDuratioan
    ){
        CBR = TOKEN(_tokenAddress);
        genInfo.roundStartTime = block.timestamp;
        genInfo.currentRate = 20000000000;
        genInfo.roundDuration = 120;
        genInfo.lastUpdateIndex = 10000000000;
        genInfo.lastUpdateRound = 1;
    }

    /***************CORE FUNCTION(DEPOSIT, UNSTAKE, REBASE) ****************/
    function deposit(uint256 amount) rebase external { //보안성. //이벤트 설정
        require(amount > 0 && CBR.balanceOf(msg.sender) >= amount, "You cannot stake zero tokens");

        indInfo[msg.sender].stakingBalance = getRealTimeBalance(); //밸런스 최신화
        indInfo[msg.sender].startRound = getRealTimeRound(); //밸런스 최신화 후 라운드 인덱스 최신화.
        indInfo[msg.sender].startIndex = getRealTimeIndex();
        indInfo[msg.sender].stakingBalance += amount;

        genInfo.lastUpdateTVL += amount;

        CBR.transferFrom(msg.sender, address(this), amount);
    }

    function unstake(uint256 amount) rebase external { //들어간돈 빼기. 이벤트 설정ㄹ해야함
        indInfo[msg.sender].stakingBalance = getRealTimeBalance(); //밸런스 최신화
        IndInfo memory _indInfo = indInfo[msg.sender];

        if(!(_indInfo.stakingBalance != 0 && _indInfo.stakingBalance >= amount && (getRealTimeIndRound() > 4))) revert(); //unstake조건 

        indInfo[msg.sender].stakingBalance -= amount; //개인 밸런스, tvl 줄이기
        genInfo.lastUpdateTVL -= amount;
        
        indInfo[msg.sender].startRound = getRealTimeRound(); //밸런스 최신화 후 라운드 인덱스 최신화.
        indInfo[msg.sender].startIndex = getRealTimeIndex();

        CBR.transfer(msg.sender, amount);
    }
    function setRate(uint256 rate) rebase external{ //주인추가
        genInfo.currentRate = rate;
    }

    function rebaseByOwner() rebase external //주인추가
    {
    }

    modifier rebase(){
        if (genInfo.lastUpdateRound != getRealTimeRound()) {
            uint256 _lastUpdateTVL = genInfo.lastUpdateTVL;

            for (uint256 i = 0; i < getRealTimeRound() - genInfo.lastUpdateRound; i++) {
                _lastUpdateTVL = _lastUpdateTVL * genInfo.currentRate / 10000000000;
            }
            if(_lastUpdateTVL > genInfo.lastUpdateTVL) CBR.mint(address(this), _lastUpdateTVL - genInfo.lastUpdateTVL);
            genInfo.lastUpdateTVL = _lastUpdateTVL;
            genInfo.lastUpdateIndex = getRealTimeIndex();
            genInfo.lastUpdateRound = getRealTimeRound();
        }
        _;
    }
    /***************CORE FUNCTION(DEPOSIT, UNSTAKE, REBASE) END  ****************/


    /******************** Internal view general***************/
    function getRealTimeIndex() internal view returns(uint256) {
        GenInfo memory _genInfo = genInfo;

        if (_genInfo.lastUpdateRound != getRealTimeRound()) {
            uint256 additionalIndex = 10000000000;
            for (uint256 i = 0; i < getRealTimeRound() - _genInfo.lastUpdateRound; i++) {
                additionalIndex = additionalIndex * _genInfo.currentRate / (10 ** 10);
            }
            return _genInfo.lastUpdateIndex * additionalIndex / 10 ** 10;
        } else {
            return _genInfo.lastUpdateIndex;
        }
    }

    function getRealTimeTVL() internal view returns(uint256) {
        GenInfo memory _genInfo = genInfo;

        if (_genInfo.lastUpdateRound != getRealTimeRound()) {
            uint256 additionalRate = 10000000000;
            for (uint256 i = 0; i < getRealTimeRound() - _genInfo.lastUpdateRound; i++) {
                additionalRate = additionalRate * _genInfo.currentRate / (10 ** 10);
            }
            return _genInfo.lastUpdateTVL * additionalRate / 10 ** 10;
        } else
            return _genInfo.lastUpdateTVL;
    }

    function getRealTimeRound() internal view returns(uint256) // 절대라운드시간.
    {
        return ((block.timestamp - genInfo.roundStartTime) / genInfo.roundDuration + 1);
    }
    /******************** Internal view general END ***********************/


    /******************** Internal view Ind***************/
    function getRealTimeIndRound() internal view returns(uint256) {
        if(indInfo[msg.sender].stakingBalance != 0)
            return (getRealTimeRound() - indInfo[msg.sender].startRound);
        else
            return 0;
    }

    function getRealTimeBalance() internal view returns(uint256) {
        if (indInfo[msg.sender].stakingBalance != 0)
            return (indInfo[msg.sender].stakingBalance * getRealTimeIndex() / indInfo[msg.sender].startIndex);
        else
            return 0;
    }
    /******************** Internal view Ind END ***************/



    /********************** External view Gen ***************/
    function getFrontGenInfo() external view returns(FrontGenInfo memory) {

        FrontGenInfo memory frontGenInfo;

        frontGenInfo.realTimeRound = getRealTimeRound();
        frontGenInfo.realTimeTVL = getRealTimeTVL();
        frontGenInfo.realTimeIndex = getRealTimeIndex();
        frontGenInfo.currentRate = genInfo.currentRate;

        return(frontGenInfo);
    }
    function getFrontIndInfo() external view returns(FrontIndInfo memory){

        FrontIndInfo memory frontIndInfo;
        IndInfo memory _indInfo = indInfo[msg.sender];

        frontIndInfo.lastUpdateBalance = _indInfo.stakingBalance;
        frontIndInfo.realTimeIndRound = getRealTimeIndRound();
        frontIndInfo.realTimeBalance = getRealTimeBalance();

        return(frontIndInfo);
    }
}