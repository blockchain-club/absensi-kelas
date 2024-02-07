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
    event NamaMahasiswaUpdated(address mahasiswa, string nama);
    event MahasiswaDeleted(address mahasiswa);

    error OnlyForOwner();
    error MahasiswaNotFound();

    // CRUD = Create, Read, Update, Delete

    modifier onlyOwner() {
        if (msg.sender != owner) revert OnlyForOwner();
        _;
    }

    modifier kosongan() {
        _;
    }

    // apakah add mahasiswa ini cuma boleh dijalankan sekali?
    function addMahasiswa(address _mahasiswa, string memory _nim, string memory _nama) public onlyOwner() kosongan() {
        mahasiswa[_mahasiswa] = Mahasiswa(_nim, _nama, true);
        emit MahasiswaAdded(_mahasiswa);
    }

    function setNamaMahasiswa(address _mahasiswa, string memory _nama) public onlyOwner() {
        mahasiswa[_mahasiswa].nama = _nama;
        emit NamaMahasiswaUpdated(_mahasiswa, mahasiswa[_mahasiswa].nama);
    }

    function deleteMahasiswa(address _mahasiswa) public {
        mahasiswa[_mahasiswa].exist = false;
        emit MahasiswaDeleted(_mahasiswa);
    }

    // function reactivateMahasiswa();

    // event NimMahasiswaUpdated(); tidak usah dikerjakan
    // function setNimMahasiswa() {} tidak usah dikerjakan

    function getNimMahasiswa(address _mahasiswa) public view returns (string memory) {
        if (mahasiswa[_mahasiswa].exist == false) revert MahasiswaNotFound();
        return mahasiswa[_mahasiswa].nim;
    }

    function getNamaMahasiswa(address _mahasiswa) public view returns (string memory) {
        if (mahasiswa[_mahasiswa].exist == false) revert MahasiswaNotFound();
        return mahasiswa[_mahasiswa].nama;
    }
}