import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Absensi Contract", function () {
  describe("Deployment", function () {
    it("should deploy with correct owner", async function () {
      const accounts = await ethers.getSigners();
      
      const absensiContract = await ethers.getContractFactory("Absensi");
      const absensi = await absensiContract.deploy();
      expect(await absensi.owner()).equal(accounts[0].address);

      const absensiSAD = await absensiContract.connect(accounts[1]).deploy();
      expect(await absensiSAD.owner()).equal(accounts[1].address);

      // dapatkan object dari contract sudah di deploy
      const copyAbsensi = absensiContract.attach(absensi.address);
      expect(copyAbsensi.address).equal(absensi.address);
    });
  });

  async function deploy() {
    const [dosen, alice, bob] = await ethers.getSigners();
      
    const absensiContract = await ethers.getContractFactory("Absensi");
    const absensi = await absensiContract.connect(dosen).deploy();
    
    return { absensi, dosen, alice, bob };
  }

  describe("AddMahasiswa", function () {
    it("should return no error when dosen add mahasiswa", async function () {
      const { absensi, dosen, alice, bob } = await loadFixture(deploy);
      await expect(absensi.connect(dosen).addMahasiswa(alice.address, "123", "Alice")).to.not.be.reverted;
    });

    it("should be reverted when non-dosen add mahasiswa", async function () {
      const { absensi, dosen, alice, bob } = await loadFixture(deploy);
      await expect(absensi.connect(bob).addMahasiswa(alice.address, "123", "Alice")).to.revertedWith("OnlyForOwner");
    });

    it("should return correct event after adding mahasiswa", async function () {
      const { absensi, dosen, alice, bob } = await loadFixture(deploy);
      await expect(absensi.addMahasiswa(alice.address, "123", "Alice")).to.emit(absensi, "MahasiswaAdded");
      await expect(absensi.addMahasiswa(alice.address, "123", "Alice")).to.emit(absensi, "MahasiswaAdded").withNamedArgs({
        mahasiswa: alice.address
      });
    });

    it("should return correct nama mahasiswa", async function () {
      const { absensi, dosen, alice, bob } = await loadFixture(deploy);
      await absensi.addMahasiswa(alice.address, "123", "Alice");

      const storedNama = await absensi.getNamaMahasiswa(alice.address);
      expect(storedNama).equal("Alice");

      await expect(absensi.getNamaMahasiswa(bob.address)).to.revertedWith("MahasiswaNotFound");
    });

    it("should return correct nim mahasiswa", async function () {
      const { absensi, dosen, alice, bob } = await loadFixture(deploy);
      await absensi.addMahasiswa(alice.address, "123", "Alice");

      const aliceNim = await absensi.getNimMahasiswa(alice.address);
      expect(aliceNim).equal("123");

      await expect(absensi.getNimMahasiswa(bob.address)).to.revertedWith("MahasiswaNotFound");
    });
  });

  async function namaMahasiswaAdded() {
    const { absensi, dosen, alice, bob } = await deploy();
    await absensi.addMahasiswa(alice.address, "123", "Alice");
    return { absensi, dosen, alice, bob };
  }

  describe("Set Nama Mahasiwa", function () {
    it("should return no error when dosen set nama mahasiswa", async function () {
      const { absensi, dosen, alice, bob } = await loadFixture(namaMahasiswaAdded);
      // await absensi.setNamaMahasiwa();
    });

    it("should return error when non-dosen set nama mahasiswa", async function () {
      
    });
    it("should emit correct event after updating nama mahasiswa", async function () {});
    it("should return updated nama mahasiswa", async function () {
      // getNamaMahasiswa();
    });
  });

  // describe("Set NIM Mahasiwa", function () {}); tidak usah dikerjakan

});
