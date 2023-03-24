const { expect, assert } = require("chai")
const VarSharingV2 = artifacts.require('./VarSharingV2.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()


contract('VarSharingV2', ([user]) => {

  describe("VarSharingV2", async () => {
    let varsharing, address2, address3, address4

    //PC
    // address2 = "0x97044d56F4FC83997DCa7285EF4291B334386B30";
    // address3 = "0x50D81bcA78D5fE897569aC0c5e83a21DaA5BC297";
    // address4 = "0x715Ece83cE6dbD12fd6d8CB1f69B966867689060";
   

    //casa
    address2 = "0xD511a8602Ad91921BFee67618698639d1bd81a72"; 
    address3 = "0x608f895699DF00c09118B0D802404C1a52C53933"; 
    address4 = "0x2b4413d52eC85641a4D0fEB99b3f5fc52a64ebf7";




    beforeEach(async () => {
      varsharing = await VarSharingV2.deployed()
    })


    describe("deployment", async () => {
      it('deploys successfully', async () => {
        const address = await varsharing.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
        console.log(address)
      })



      describe('trips', async () => {
        let result, resultbook, result2, resultbook2, resultA, resultB, resultC, resultAB, result9

        before(async () => {
          result = await varsharing.createTrip("FIR", "BOL", 1709734998, 4, { from: user })
          result2 = await varsharing.createTrip("FIR", "EMP", 1709734998, 3, { from: user })
          const event = result.logs[0].args
          const event2 = result2.logs[0].args
          resultbook = await varsharing.bookTrip(event.id, { from: address2 })
          resultbook2 = await varsharing.bookTrip(event2.id, { from: address2 })
        })

        it('require book 2hours before start', async () => {
          await varsharing.createTrip("FIR", "EMP", 1679598650, 3, { from: user })
          await varsharing.bookTrip(2, { from: user }).should.be.rejected;
        })

        it('create trips', async () => {
          const event = result.logs[0].args
          assert.equal(event.start, "FIR", "start corretta")
          assert.equal(event.arrival, "BOL", "arrival corretta")
          // assert.equal(event.date,876128736 , "data corretta")
          assert.equal(event.maxPass, 4, "max pass corretti")
          assert.equal(event.owner, user, "owner corretto")
          await varsharing.createTrip("FIR", "BOL", 1671148788, 4, { from: user }).should.be.rejected;
        })


        it('lists trips', async () => {
          const event = result.logs[0].args
          assert.equal(await varsharing.getTripsCount(), 3, "numero viaggi giusto")
          console.log(await varsharing.trips.length)
          const trips = await varsharing.trips(event.id)
          assert.equal(trips.start, "FIR", "start corretta")
          assert.equal(trips.arrival, "BOL", "arrival corretta")
          // assert.equal(event.date,876128736 , "data corretta")
          assert.equal(trips.maxPass, 4, "max pass corretti")
          assert.equal(trips.owner, user, "owner corretto")
        })

        it('book a trip', async () => {
          const event = resultbook.logs[0].args
          console.log(event.id + " " + event.date)
        })

        it('passeggeri', async () => {
          await varsharing.bookTrip(1, { from: address2 }).should.be.rejected;
          resultB = await varsharing.getPassPerTrip(1)
          assert.equal((await varsharing.getPassPerTrip(1)).length, 1, "Numero passeggeri ")
          console.log(resultB + " pass di event2")
        })


        it('trip per passeggero', async () => {
          for (i = 0; i < (await varsharing.getTripPerPass(user)).length; i++) {
            console.log((await varsharing.getTripPerPass(user))[i].toNumber())
          }
          for (i = 0; i < (await varsharing.getTripsPerOwner(user)).length; i++) {
            console.log((await varsharing.getTripsPerOwner(user))[i].toNumber())
          }
          assert.equal((await varsharing.ownerOf(1)), user, "owner giusto")
        })

        it('delete booking, array trip e pass', async () => {
          for (i = 0; i < (await varsharing.getTripPerPass(address2)).length; i++) {
            console.log((await varsharing.getTripPerPass(address2))[i].toNumber())
          }
          assert.equal((await varsharing.getTripPerPass(address2))[0].toNumber(), 0 ,  " id primo trip")
          console.log("Prima")
          assert.equal((await varsharing.getPassPerTrip(1)).length, 1, " Numero passeggeri ")
          console.log((await varsharing.getPassPerTrip(1)), " Address passeggeri ")
          assert.equal((await varsharing.getTripPerPass(address2)).length , 2, " lunghezza array pass")

          await varsharing.deleteBook(1, address2)
          await varsharing.deleteBook(1, user).should.be.rejected;

          console.log("Dopo")
          assert.equal((await varsharing.getPassPerTrip(1)).length, 0, " Numero passeggeri ")
          console.log((await varsharing.getPassPerTrip(1)), " Address passeggeri ")
          assert.equal((await varsharing.getTripPerPass(address2)).length, 1, " Num trip giusto per pass")
          assert.equal((await varsharing.getPassPerTrip(1)).length, 0, " Num passeggeri per trip giusto")
        })


        it('delete trip', async () => {
          await varsharing.createTrip("FIR", "BOL", 1709734998, 4, { from: user })
          await varsharing.bookTrip(3, {from: address3})
          await varsharing.bookTrip(3, {from: address4})
          assert.equal((await varsharing.ownerOf(3)), user, "owner giusto")
          console.log((await varsharing.getPassPerTrip(3)), " Address passeggeri")
          assert.equal((await varsharing.getPassPerTrip(3)).length, 2, " Numero passeggeri")
          assert.equal((await varsharing.getTripsPerOwner(user)).length, 4,  " Viaggi di user come owner")
          console.log((await varsharing.getTripPerPass(address3)) + " id viaggi del addr 3")
          await varsharing.deleteTrip(3, { from: user });
          assert.equal((await varsharing.getTripsPerOwner(user)).length, 3, " Viaggi di user come owner")    
          assert.equal((await varsharing.getTripsPerOwner(address3)).length, 1, " Viaggi di addr 3 come owner")   
          assert.equal((await varsharing.getTripsPerOwner(address4)).length,0, " Viaggi di addr 4 come owner") 
          console.log((await varsharing.getTripPerPass(address3)) + " id viaggi del pass3")
          assert.equal((await varsharing.ownerOf(3)), address3, "owner")
          console.log((await varsharing.getPassPerTrip(3)), " Address passeggeri")
          await varsharing.deleteTrip(3, { from: user }).should.be.rejected;
          await varsharing.deleteTrip(3, { from: address3 })
          assert.equal((await varsharing.ownerOf(3)), address4, "owner ")
          assert.equal((await varsharing.getTripsPerOwner(user)).length, 3, " Viaggi di user come owner")    
          assert.equal((await varsharing.getTripsPerOwner(address3)).length, 0, " Viaggi di addr 3 come owner")   
          assert.equal((await varsharing.getTripsPerOwner(address4)).length, 1, " Viaggi di addr 4 come owner") 
                               
          console.log((await varsharing.getPassPerTrip(3)), " Address passeggeri ")  
        })

        it('trip edit max pass', async () => {
          await varsharing.bookTrip(1, {from: address3})
          await varsharing.bookTrip(1, {from: address4})
          await varsharing.editMaxPassTrip(1,2)
          await varsharing.bookTrip(1, {from: address2}).should.be.rejected;
        })

        // it('inizio viaggio', async () => {
        //   await varsharing.signStartTrip(1, {from: address3})
        //   await varsharing.signStartTrip(1, {from: address2}).should.be.rejected;
        //   assert.equal((await varsharing.getPassPerTrip(1)).length, 2, "  num passeggeri giusto")
        //   assert.equal((await varsharing.getDepartedPassengers(1)).length, 1, " num passeggeri confermati")
        //   assert.equal((await varsharing.getTripPerPass(address4)).length, 1, " num viaggi prima")
        //   await varsharing.startTrip(1, {from: user})
        //   assert.equal((await varsharing.getTripPerPass(address4)).length, 0, " num viaggi dopo non conferma")
        // })

        // it('completamento viaggio', async () => {
        //   await varsharing.signEndTrip(1, {from: address3})
        //   await varsharing.signEndTrip(1, {from: address4}).should.be.rejected;
        //   await varsharing.signStartTrip(1, {from: address4}).should.be.rejected;
        //   await varsharing.completeTrip(1, {from: user})
        //   assert.equal((await varsharing.getTripInfo(1)).completed, 1, "Viaggio 1 confermato")
        //   assert.equal((await varsharing.getTripInfo(0)).completed, 0, "VIaggio 2 non confermato")
        //   assert.equal((await varsharing.getConfirmedPassengers(1)).length, 1, "passeggeri conf")
        // })


        it('inizio viaggio', async () => {
          await varsharing.signStartTrip(1, {from: address3})
          await varsharing.signStartTrip(1, {from: address4})
          assert.equal((await varsharing.getPassPerTrip(1)).length, 2, "  num passeggeri giusto")
          assert.equal((await varsharing.getDepartedPassengers(1)).length, 2, " num passeggeri confermati")
          assert.equal((await varsharing.getTripPerPass(address4)).length, 1, " num viaggi prima")
          await varsharing.startTrip(1, {from: user})
          assert.equal((await varsharing.getTripPerPass(address4)).length, 1, " num viaggi dopo non conferma")
        })

        it('completamento viaggio', async () => {
          await varsharing.signEndTrip(1, {from: address3})
          await varsharing.signStartTrip(1, {from: address4}).should.be.rejected;
          await varsharing.completeTrip(1, {from: user})
          assert.equal((await varsharing.getTripInfo(1)).completed, 1, "Viaggio 1 confermato")
          assert.equal((await varsharing.getTripInfo(0)).completed, 0, "VIaggio 2 non confermato")
          assert.equal((await varsharing.getConfirmedPassengers(1)).length, 1, "passeggeri conf")
        })


         it('asasd viaggio', async () => {
            console.log(await varsharing.getTrip(), " trips")
            console.log(await varsharing.getRemPassPerTrip(), "rempass")
            console.log(await varsharing.getAllPassPerTrip(), "allpass ")
         })
      })
    })
  })
})
