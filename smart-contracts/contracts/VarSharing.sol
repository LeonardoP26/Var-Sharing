// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "./safemath.sol";

contract VarSharing {
    using SafeMath for uint256;
    using SafeMath32 for uint32;

    event NewTrip(
        uint256 id,
        string start,
        string arrival,
        uint32 date,
        uint maxPass,
        address owner
    );
    
    event NewBook(uint256 id, address user);
    event SignedStartTrip(uint256 id, address user);
    event SignedEndTrip(uint256 id, address user);
    event StartedTrip(uint256 id, address[]);
    event CompletedTrip(uint256 id, address[]);

    struct Trip {
        string start;
        string arrival;
        address owner;
        uint32 date;
        uint maxPass;
        uint started;
        uint completed;
        uint cancelled;
        uint availability;
        uint id;
    }

                                //possibilità di chiudere le prenotazioni? no puoi già modificare max pass
    Trip[] public trips;
    uint256[][] passMultiArray; 

    mapping(uint256 => address[]) passPerTrip;

    mapping(address => uint256[]) public tripPerPass; 

    mapping(address => uint32) public ownerTripCount;

    mapping(uint => address[]) public departedPassengers;

    mapping(uint => address[]) public confirmedPassengers;


      
    modifier onlyOwnerOf(uint _id) {
        require(msg.sender == trips[_id].owner, "Devi essere l'owner del viaggio");
        _;
    }

    modifier onlyPassOf(uint _id) {
        uint counter;
        uint length = (passPerTrip[_id]).length;
        for (uint i; i < length; i++) {
            if(msg.sender == passPerTrip[_id][i]){
                ++counter;
            }
        }
        require(counter == 1, "Devi essere un passeggero del viaggio");
        _;
    }

    modifier notCancelled(uint _id) {
        require(trips[_id].cancelled == 0, "Il viaggio e' stato cancellato");
        _;
    }







    function createTrip(
        string calldata _start,
        string calldata _arrival,
        uint32 _date,
        uint _maxPass
    ) external {
        require(_date > block.timestamp);
        require(keccak256(abi.encodePacked(_start)) != keccak256(abi.encodePacked(_arrival)));
        require(tripPerPass[msg.sender].length <= 5);
        //TODO Altri require?     

        uint256 id = trips.length;
        trips.push(Trip(_start, _arrival,  msg.sender, _date, _maxPass, 0, 0, 0, 1, id));
        trips[id].owner = msg.sender;
        ownerTripCount[msg.sender] = ownerTripCount[msg.sender].add(1);
        passMultiArray.push([id]);
        emit NewTrip(id, _start, _arrival, _date, _maxPass, msg.sender);
    }


    function bookTrip(uint256 _id) external notCancelled(_id){
        //controllo di booking
        require(passPerTrip[_id].length < trips[_id].maxPass);
        require(block.timestamp < (trips[_id].date - 12 hours));
        require(msg.sender != trips[_id].owner);

        uint length = (passPerTrip[_id]).length;
        for (uint i; i < length; i++) {
            require(msg.sender != passPerTrip[_id][i]);
        }
        tripPerPass[msg.sender].push(_id);
        passPerTrip[_id].push(msg.sender);
        if((passPerTrip[_id]).length == trips[_id].maxPass){
            trips[_id].availability = 0;
        }
        emit NewBook(_id, msg.sender);
    }



    function deleteTrip(uint256 _id) external onlyOwnerOf(_id) notCancelled(_id){
        ownerTripCount[msg.sender] = ownerTripCount[msg.sender].sub(1);
        if(passPerTrip[_id].length == 0){
            trips[_id].cancelled = 1;
        } else {
            address tmp = (passPerTrip[_id])[0];
            deleteBook(_id, ((passPerTrip[_id])[0]));
            trips[_id].owner = tmp;
            ownerTripCount[tmp] = ownerTripCount[tmp].add(1);
        }
    }




    function deleteBook(uint256 _id, address _user) public notCancelled(_id){
        require(trips[_id].completed == 0);
        require(trips[_id].started == 0);
        uint counter;
        uint length = (passPerTrip[_id]).length;
        for (uint i; i < length; i++) {
            if(_user == passPerTrip[_id][i]){
                ++counter;
            }
        }
        require(counter == 1);
        address user;
        if(msg.sender == trips[_id].owner){
            user = _user;
        } else {
            for (uint i; i < length; i++) {
                if(passPerTrip[_id][i] == msg.sender && msg.sender == _user){
                    user = _user;
                }
            }
        }
        require(user == _user);
        if(tripPerPass[user].length == 1){
            tripPerPass[user].pop();
        } else {
            uint length1 = tripPerPass[user].length;
            for (uint i; i < length1; i++) {
                if((tripPerPass[user])[i] == _id){
                    uint tmp = (tripPerPass[user])[(tripPerPass[user].length)-1];
                    (tripPerPass[user])[(tripPerPass[user].length)-1] = (tripPerPass[user])[i];
                    (tripPerPass[user])[i] = tmp;
                    tripPerPass[user].pop();
                }
            }
        }

        if(passPerTrip[_id].length == 1){
            passPerTrip[_id].pop();
        } else {
            for (uint i; i < (passPerTrip[_id].length); i++) {
                if(passPerTrip[_id].length == 1){
                    passPerTrip[_id].pop();
                } else if((passPerTrip[_id])[i] == user) {
                address tmp = (passPerTrip[_id])[(passPerTrip[_id].length)-1];
                    (passPerTrip[_id])[(passPerTrip[_id].length)-1] = (passPerTrip[_id])[i];
                    (passPerTrip[_id])[i] = tmp;
                    passPerTrip[_id].pop();               
                }
            }
        }
        trips[_id].availability = 1;
    }

    function editMaxPassTrip(uint256 _id, uint _maxPass) external onlyOwnerOf(_id) notCancelled(_id){
        if(_maxPass >= passPerTrip[_id].length){
            trips[_id].maxPass = _maxPass;
        }
        if(_maxPass == passPerTrip[_id].length){
            trips[_id].availability = 0;
        }
    }

    function forceDeleteTrip(uint _id) external onlyOwnerOf(_id) notCancelled(_id){
        if(departedPassengers[_id].length == 0){
            ownerTripCount[msg.sender] = ownerTripCount[msg.sender].sub(1);
            trips[_id].cancelled = 1;
        }
    }
    





    function signStartTrip(uint _id) external onlyPassOf(_id) notCancelled(_id){
        require(trips[_id].started == 0);
        uint counter;
        uint length = (departedPassengers[_id]).length;
        for (uint i; i < length; i++) {
            if(msg.sender == departedPassengers[_id][i]){
                ++counter;
            }
        }
        require(counter == 0);
        departedPassengers[_id].push(msg.sender);
        emit SignedStartTrip(_id, msg.sender);
    }

    function signEndTrip(uint _id) external notCancelled(_id){
        require(trips[_id].started == 1);
        uint counter;
        uint length = (departedPassengers[_id]).length;
        for (uint i; i < length; i++) {
            if(msg.sender == departedPassengers[_id][i]){
                ++counter;
            }
        }
        require(counter == 1);

        confirmedPassengers[_id].push(msg.sender);
        emit SignedEndTrip(_id, msg.sender);
    }

    function startTrip(uint256 _id) external onlyOwnerOf(_id) notCancelled(_id){    //Con JS crei link quando è tempo del viaggio a questa funz
        require(trips[_id].started == 0);
        uint length = departedPassengers[_id].length;
        uint length1 = passPerTrip[_id].length;
        //in JS controllo se length == 0  chiamare forceDeleteTrip
        if(length != length1){
            uint diff = length1 - length; 
            for (uint k; k < diff; k++){  //Poi da segnalare su front-end con mex
                uint signed = 0;
                uint isFound = 0;
                uint lPass = passPerTrip[_id].length;
                for(uint i; i < lPass; i++){
                    if(isFound == 0){
                        for(uint j; j < length; j++){
                            if(departedPassengers[_id][j] == passPerTrip[_id][i]){
                                signed = 1;
                            }else {
                                signed = 0;
                            }
                        }
                        if(signed == 0){
                            deleteBook(_id, passPerTrip[_id][i]);
                            isFound = 1;
                        }
                    }
                }
            }
        }
        trips[_id].started = 1;
        emit StartedTrip(_id, departedPassengers[_id]);
    }

    function completeTrip(uint256 _id) external onlyOwnerOf(_id) notCancelled(_id){   //TODO Come gestire se non si prenota nessuno?
        require(trips[_id].started == 1);
        require(trips[_id].completed == 0);

        //TODO mandare token come NFT
        //questo fa ma usare js per controllo di persone in meno tra partiti e confermati
        trips[_id].completed = 1;
        emit CompletedTrip(_id, confirmedPassengers[_id]);
    }







    function getConfirmedPassengers(uint256 _id) external view returns (address[] memory){
        return confirmedPassengers[_id];
    }

    function getDepartedPassengers(uint256 _id) external view returns (address[] memory){
        return departedPassengers[_id];
    }

    function getTripInfo(uint256 _id) external view returns (Trip memory){
        return trips[_id];
    }

    function getTrip() external view returns (Trip[] memory){
        return trips;
    }

    function getTripsCount() external view returns (uint256){
        return trips.length;
    }

    function getTripPerPass(address _user) external view returns (uint256[] memory){ 
        return tripPerPass[_user]; //se completati o meno
    }

    function getPassPerTrip(uint256 _id) external view returns (address[] memory){
        return passPerTrip[_id];
    }

   function getTripsPerOwner(address _user) external view returns(uint[] memory) {
     uint[] memory result = new uint[](ownerTripCount[_user]);
     uint counter;
     uint length = trips.length;
     for (uint i; i < length; i++) {
       if (trips[i].owner == _user) {
         result[counter] = i;
         ++counter;
       }
     }
     return result;
   }

    function ownerOf(uint256 _id) external view returns (address) {
        return trips[_id].owner;
    }





    function getPassMultiArray() external view returns (uint256[][] memory) {
        return passMultiArray;
    }

    function getPassMultiArrayMember(uint256 _id) external view returns (uint256[] memory) {
        require(passMultiArray.length > _id, "wrong index");
        return passMultiArray[_id];
    }








}
