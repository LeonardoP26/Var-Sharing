let config = {};

// "0x48A6F3AbcEC453EE99C8655Ff11d23CBB940E8c3"    mumbai v2.1 

config.contract = {
  address: "0x48A6F3AbcEC453EE99C8655Ff11d23CBB940E8c3",

  abi: [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "name": "CompletedTrip",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "NewBook",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "start",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "arrival",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "date",
          "type": "uint32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "maxPass",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "NewTrip",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "SignedEndTrip",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "SignedStartTrip",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "name": "StartedTrip",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "confirmedPassengers",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "departedPassengers",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "ownerTripCount",
      "outputs": [
        {
          "internalType": "uint32",
          "name": "",
          "type": "uint32"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tripPerPass",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "trips",
      "outputs": [
        {
          "internalType": "string",
          "name": "start",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "arrival",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "uint32",
          "name": "date",
          "type": "uint32"
        },
        {
          "internalType": "uint256",
          "name": "maxPass",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "started",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "completed",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "cancelled",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "availability",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_start",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_arrival",
          "type": "string"
        },
        {
          "internalType": "uint32",
          "name": "_date",
          "type": "uint32"
        },
        {
          "internalType": "uint256",
          "name": "_maxPass",
          "type": "uint256"
        }
      ],
      "name": "createTrip",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "bookTrip",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "deleteTrip",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "deleteBook",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_maxPass",
          "type": "uint256"
        }
      ],
      "name": "editMaxPassTrip",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "forceDeleteTrip",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "signStartTrip",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "signEndTrip",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "startTrip",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "completeTrip",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getConfirmedPassengers",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getDepartedPassengers",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getTripInfo",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "start",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "arrival",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "uint32",
              "name": "date",
              "type": "uint32"
            },
            {
              "internalType": "uint256",
              "name": "maxPass",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "started",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "completed",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "cancelled",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "availability",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            }
          ],
          "internalType": "struct VarSharingV2.Trip",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getTrip",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "start",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "arrival",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "uint32",
              "name": "date",
              "type": "uint32"
            },
            {
              "internalType": "uint256",
              "name": "maxPass",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "started",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "completed",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "cancelled",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "availability",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            }
          ],
          "internalType": "struct VarSharingV2.Trip[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getTripsCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "getTripPerPass",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getPassPerTrip",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getAllPassPerTrip",
      "outputs": [
        {
          "internalType": "address[][]",
          "name": "",
          "type": "address[][]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getRemPassPerTrip",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "getTripsPerOwner",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getPassMultiArray",
      "outputs": [
        {
          "internalType": "uint256[][]",
          "name": "",
          "type": "uint256[][]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getPassMultiArrayMember",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ],
};

config.options = {
  sedi: [
    {title: 'Via Sbodio 2, Milano',                   value:"MIL", subtitle: "Milano", map: "https://goo.gl/maps/adegbx9hdR7oc59e8"},
    {title: 'Firenze',                                value:"FIR", subtitle: "Firenze", map: ""},
    {title: 'Via Piovola 138, Empoli',                value:"EMP", subtitle: "Empoli", map: "https://goo.gl/maps/UyX7Qm23hc6RuX6H7"},
    {title: 'Via di Corticella 205, Bologna',         value:"BOL", subtitle: "Bologna", map: "https://goo.gl/maps/ubq6ukycpgmfz9Qu8"},
    {title: 'Via Operai 10, Genova',                  value:"GEN", subtitle: "Genova", map: "https://goo.gl/maps/mAj8GxsWfDxRSaEeA"},
    {title: 'Via Enrico Fermi 34, Bolzano',           value:"BZ", subtitle: "Bolzano", map: "https://goo.gl/maps/TKgfBHrHKmvUMHWs6"},
    {title: 'Via E. Fermi 13, Verona',                value:"VER", subtitle: "Verona", map: "https://goo.gl/maps/xj9AEncXXPWaCn5m8"},
    {title: 'Via Luigi Einaudi 25, Dosson di Casier', value:"TV", subtitle: "Treviso", map: "https://goo.gl/maps/WWknTM36aPVXSe5S9"},
    {title: 'Via Bagli 54, Rimini',                   value:"RN", subtitle: "Rimini", map: "https://goo.gl/maps/Em8cxVdgPMQ6TnA7A"},
    {title: 'Via Gatti 3, Formigine',                 value:"MO", subtitle: "Modena", map: "https://goo.gl/maps/tYUyJqi5b5C1zVSS8"},
    {title: 'Via Bruno Simonucci 18, Perugia',        value:"PG", subtitle: "Perugia", map: "https://goo.gl/maps/aRcHewHHzGF1mFaY6"},
    {title: 'Via Brodolini 12, Jesi',                 value:"AN", subtitle: "Ancona", map: ""},
    {title: 'Via di Valle Lupara 10, Roma',           value:"RM", subtitle: "Roma", map: "https://goo.gl/maps/19KrG7hCZWEbipDK7"},
    {title: 'Via P. Nenni 276, S. Giovanni Teatino',  value:"PES", subtitle: "Pescara", map: ""},
    {title: "Corso Salvatore D'amato 87/89, Arzano ", value:"NAP", subtitle: "Napoli", map: ""},
    {title: 'Via S. Francesco 23B, Terlizzi',         value:"BA", subtitle: "Bari", map: ""},
    {title: 'Via Alessandro Manzoni Centro Uffici Parco Commerciale “Le Zagare”',value:"CT", subtitle: "Catania", map: ""},
    {title: 'Via Tiepolo 8, Cagliari',   value:"CA", subtitle: "Cagliari", map: ""},
  ]
};

config.network = {
  id: [80001]
  //mumbai : [80001],
  //development : [1337]
}
module.exports = { config };
