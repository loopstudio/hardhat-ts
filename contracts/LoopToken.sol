// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract LoopToken {
    mapping(address => uint256) public _balances;

    string public _name;
    string public _symbol;
    uint8 public _decimals;
    uint256 public _totalSupply;

    event Transfer(address indexed from, address indexed to, uint256 amount);

    constructor(string memory name_, string memory symbol_, uint256 totalSupply_) {
        _name = name_;
        _symbol = symbol_;
        _totalSupply = totalSupply_;
        _decimals = 18;

         _balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }

    function transfer(address to, uint256 amount) public returns (bool) {
        require(to != address(0), "Transfer from the zero address");
        uint256 ownerBalance = _balances[msg.sender];
        require(ownerBalance >= amount, "Insufficient funds");
        _balances[msg.sender] = ownerBalance - amount;
        _balances[to] += amount;

        emit Transfer(msg.sender, to, amount);

        return true;
    }
}
