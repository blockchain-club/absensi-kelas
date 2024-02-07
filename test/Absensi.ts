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

  describe("AddMahasiswa", function () {
    it("should add mahasiswa successfully", async function () {
      
    });
  });
});
