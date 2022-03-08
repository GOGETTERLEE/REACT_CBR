// buddy fame dawn nominee play winter depart flee thought crash trim witness
//https://github.com/adrianhajdin/project_web3.0/tree/main/client/src/context
//https://github.com/GOGETTERLEE/REACT_CBR.git
/* 
    git add .
    git remote add origin
    (git remote remove origin)
    git push origin master
    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
*/
export const stakingContractAddress = '0xc9aE641314362e4541A9C5164b14B9c88e3e0C61'
export const stakingContractABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "rebaseByOwner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "rate",
                "type": "uint256"
            }
        ],
        "name": "setRate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_tokenAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_roundStartTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_currentRate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_roundDuratioan",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "unstake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "genInfo",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "roundStartTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "roundDuration",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "currentRate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "lastUpdateIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "lastUpdateRound",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "lastUpdateTVL",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getFrontGenInfo",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "realTimeRound",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "realTimeTVL",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "realTimeIndex",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "currentRate",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct STAKING.FrontGenInfo",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getFrontIndInfo",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "lastUpdateBalance",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "realTimeIndRound",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "realTimeBalance",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct STAKING.FrontIndInfo",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "indInfo",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "stakingBalance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "startIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "startRound",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];