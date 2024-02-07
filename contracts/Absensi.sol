// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Absensi {
    address public owner;

    struct Mahasiswa {
        string nim;
        string nama;
        bool exist;
    }

    mapping(address => Mahasiswa) public mahasiswa;

    constructor() {
        owner = msg.sender;
    }

    event MahasiswaAdded(address mahasiswa);

    error OnlyForOwner();
    error MahasiswaNotFound();

    function addMahasiswa(address _mahasiswa, string memory _nim, string memory _nama) public {
        if (msg.sender != owner) revert OnlyForOwner();
        mahasiswa[_mahasiswa] = Mahasiswa(_nim, _nama, true);
        emit MahasiswaAdded(_mahasiswa);
    }

    function getNimMahasiswa(address _mahasiswa) public view returns (string memory) {
        if (mahasiswa[_mahasiswa].exist == false) revert MahasiswaNotFound();
        return mahasiswa[_mahasiswa].nim;
    }

    function getNamaMahasiswa(address _mahasiswa) public view returns (string memory) {
        if (mahasiswa[_mahasiswa].exist == false) revert MahasiswaNotFound();
        return mahasiswa[_mahasiswa].nama;
    }
}