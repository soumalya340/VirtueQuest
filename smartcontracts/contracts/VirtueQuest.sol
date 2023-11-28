// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Context.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";

interface IVQ {
    function ownerOf(uint256 tokenId) external view returns (address owner);
}

contract VirtueQuest is VRFConsumerBaseV2, Context {
    VRFCoordinatorV2Interface COORDINATOR;

    // Your subscription ID.
    uint64 s_subscriptionId;

    // SEPOLIA
    address immutable vrfCoordinator;
    bytes32 s_keyHash =
        0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c;

    uint32 callbackGasLimit = 40000;

    // The default is 3, but you can set this higher.
    uint16 requestConfirmations = 3;

    // retrieve 1 random value in one request.
    // Cannot exceed VRFCoordinatorV2.MAX_NUM_WORDS.
    uint32 numWords = 1;

    address s_owner;
    address public contractAddress;

    struct Game {
        // mapping(address => uint256) playerPositions;
        uint256 playerPositions;
        bool isActive;
    }
    // map rollers to requestIds
    mapping(uint256 => uint256) private s_rollers;
    mapping(uint256 => bool) public diceRolling;
    mapping(uint256 => Game) private games;

    IVQ NFTCONTRACT;

    // Event declarations
    event GameStarted(uint256 gameId, address indexed player);
    event GameWon(uint256 gameId, address indexed winner);
    event DiceRolled(
        uint256 indexed requestId,
        address indexed roller,
        uint256 indexed gameId
    );
    event DiceLanded(
        uint256 indexed requestId,
        uint256 indexed result,
        uint256 indexed gameId
    );

    modifier onlyWhenOwner(uint256 tokenId) {
        require(
            NFTCONTRACT.ownerOf(tokenId) == _msgSender() ||
                _msgSender() == s_owner,
            "VirtueQuest: Sender does not own the item nor approved!"
        );
        _;
    }
    modifier onlyWhenGameIsActive(uint256 gameId) {
        require(games[gameId].isActive, "Game is not active");
        _;
    }

    modifier onlyWhenDiceINotInProgress(uint256 gameId) {
        require(diceRolling[gameId] == false, "VirtueQuest: Roll in progress");
        _;
    }

    // Subscription ID = 6567

    constructor(
        uint64 subscriptionId,
        address _nftContract,
        address _vrfCoordinator
    ) VRFConsumerBaseV2(_vrfCoordinator) {
        COORDINATOR = VRFCoordinatorV2Interface(_vrfCoordinator);
        s_owner = _msgSender();
        s_subscriptionId = subscriptionId;
        vrfCoordinator = _vrfCoordinator;

        NFTCONTRACT = IVQ(_nftContract);
        contractAddress = _nftContract;
    }

    function setNFTContract(address _nftContract) external {
        require(_msgSender() == s_owner, "VirtueQuest: user is not the owner");
        NFTCONTRACT = IVQ(_nftContract);
        contractAddress = _nftContract;
    }

    function rollDice(uint256 gameId) private returns (uint256 requestId) {
        // Will revert if subscription is not set and funded.
        requestId = COORDINATOR.requestRandomWords(
            s_keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );

        s_rollers[requestId] = gameId;
        diceRolling[gameId] = true;
        emit DiceRolled(requestId, _diceRoller(gameId), gameId);
    }

    function fulfillRandomWords(
        uint256 requestId,
        uint256[] memory randomWords
    ) internal override {
        // transform the result to a number between 1 and 6 inclusively
        uint256 diceRoll = (randomWords[0] % 6) + 1;

        uint256 gameId = s_rollers[requestId];
        diceRolling[gameId] = false;
        uint256 newPosition = games[gameId].playerPositions + diceRoll;
        // Apply snakes and ladders logic
        newPosition = applySnakesAndLadders(newPosition);

        games[gameId].playerPositions = newPosition;
        // Check for win condition
        if (newPosition == 68) {
            games[gameId].isActive = false;
            emit GameWon(gameId, _msgSender());
        }
        // emitting event to signal that dice landed
        emit DiceLanded(requestId, diceRoll, gameId);
    }

    // Function to start a new game
    function startGame(uint256 gameId) public onlyWhenOwner(gameId) {
        games[gameId].isActive = true;
        games[gameId].playerPositions = 1; // Start at position 1
        emit GameStarted(gameId, _diceRoller(gameId));
    }

    // Function to make a move in the game
    function play(
        uint256 gameId
    )
        external
        onlyWhenOwner(gameId)
        onlyWhenGameIsActive(gameId)
        onlyWhenDiceINotInProgress(gameId)
    {
        // random dice roll
        rollDice(gameId);
    }

    // Function to apply snakes and ladders logic
    function applySnakesAndLadders(
        uint256 position
    ) private pure returns (uint256) {
        //snakes and ladders
        if (position == 10) return 23; //ladder
        if (position == 12) return 8; // snake
        if (position == 16) return 4; // snake
        if (position == 17) return 69; // ladder
        if (position == 20) return 32; // ladder
        if (position == 22) return 60; // ladder
        if (position == 24) return 7; // snake
        if (position == 27) return 41; // ladder
        if (position == 28) return 50; // ladder
        if (position == 44) return 9; // snake
        if (position == 45) return 67; // ladder
        if (position == 46) return 62; //  laader
        if (position == 52) return 35; // snake
        if (position == 54) return 68; // ladder
        if (position == 55) return 2; // snake
        if (position == 61) return 3; //snake
        if (position == 63) return 13; // snake
        if (position == 72) return 51; //snake

        return position;
    }

    // Function to check a player's position in a game
    function getPlayerPosition(
        uint256 gameId
    )
        public
        view
        onlyWhenGameIsActive(gameId)
        onlyWhenDiceINotInProgress(gameId)
        returns (uint256)
    {
        return games[gameId].playerPositions;
    }

    function _diceRoller(uint256 gameId) private view returns (address) {
        return NFTCONTRACT.ownerOf(gameId);
    }

    // Function to check if a game is active
    function isGameActive(uint256 gameId) public view returns (bool) {
        return games[gameId].isActive;
    }
}
