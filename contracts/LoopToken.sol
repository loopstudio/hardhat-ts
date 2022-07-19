// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract LoopToken {
    mapping(address => uint256) _balances;

    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    event Transfer(address indexed from, address indexed to, uint256 amount);

    constructor(string memory name_, string memory symbol_, uint256 totalSupply_) {
        name = name_;
        symbol = symbol_;
        totalSupply = totalSupply_;
        decimals = 18;

        _balances[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }

    function transfer(address to, uint256 amount) public returns (bool) {
        require(to != address(0), "Transfer from the zero address");
        uint256 senderBalance = _balances[msg.sender];
        require(senderBalance >= amount, "Insufficient funds");
        _balances[msg.sender] = senderBalance - amount;
        _balances[to] += amount;

        emit Transfer(msg.sender, to, amount);

        return true;
    }

    function balanceOf(address account) public view returns (uint256){
        return _balances[account];
    }
}
