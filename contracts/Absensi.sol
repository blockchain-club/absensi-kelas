// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Absensi {
    address public owner;

    struct Mahasiswa {
        string nim;
        string nama;
    }

    mapping(address => Mahasiswa) public mahasiswa;

    constructor() {
        owner = msg.sender;
    }

    function addMahasiswa(address _mahasiswa, string memory _nim, string memory _nama) public {
        Mahasiswa memory m = Mahasiswa(_nim, _nama);
        mahasiswa[_mahasiswa] = m;
    }

    function getMahasiswaNIM(address _mahasiswa) public view returns (string memory) {
        return mahasiswa[_mahasiswa].nim;
    }

    function getMahasiswaName(address _mahasiswa) public view returns (string memory) {
        return mahasiswa[_mahasiswa].nama;
    }
}