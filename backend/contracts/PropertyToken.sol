// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract PropertyToken is ERC20, Ownable {
    uint256 public tokenPrice;
    string public SCI;

    constructor() ERC20("PropertyToken", "PT") {}

    function addProperty(string memory _SCI, uint256 _currentValue) public onlyOwner {
        SCI = _SCI;
        tokenPrice = (_currentValue / 10000);
        _mint(address(this), 10000 * tokenPrice);
    }

    function buyTokens(uint256 _numTokens) public payable {
        require(msg.value >= _numTokens * tokenPrice);
        require(balanceOf(address(this)) >= _numTokens);
        
        _transfer(address(this), msg.sender, _numTokens);
    }
}

