/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Context.sol";
import "./IAccessMaster.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract VirtueQuestNFT is Context, ERC721Enumerable {
    
    uint256 private Counter;
    uint8 public version = 1;
    address public accessMasterAddress;
    string public baseURI;
    
    IACCESSMASTER flowRoles;

    /// @dev mapping for token URIs
    mapping(uint256 => string) private _tokenURIs;

    modifier onlyOperator() {
        require(
            flowRoles.isOperator(_msgSender()),
            "VirtueQuestNFT: User is not authorized "
        );
        _;
    }

    event AssetIssued(
        uint256 indexed tokenID,
        address indexed creator,
        string metaDataURI
    );
    
    event AssetDestroyed(uint indexed tokenId, address ownerOrApproved);

    event FundTransferred(address sender,address reciepient , uint256 tokenId,uint256 amount);
    
    using Strings for uint256;

    constructor(
        string memory name,
        string memory symbol,
        string memory _intialURI,
        address flowContract
    ) ERC721(name, symbol) {
        baseURI = _intialURI;
        flowRoles = IACCESSMASTER(flowContract);
        accessMasterAddress = flowContract;
    }
    /// @dev update BaseURI of the metadata
    function setBaseURI(string memory uri) external onlyOperator {
        baseURI = uri;
    }
    function setTokenURIByOperator(uint256 tokenId , string memory metadataURI) external onlyOperator{
        _setTokenURI(tokenId,metadataURI);
    }
    /// @dev only the creator role can issue the token
    function issue(
        string memory metadataURI
    ) public  returns (uint256) {
        Counter++;
        uint256 currentTokenID = Counter;
        _safeMint(_msgSender(), currentTokenID);
        _setTokenURI(currentTokenID, metadataURI);

        emit AssetIssued(currentTokenID, _msgSender(), metadataURI);
        return currentTokenID;
    }
    /// @dev only operator can assign issue for an user
    function delegateIssue(
        address creator,
        string memory metadataURI
    ) public onlyOperator returns (uint256) {
        Counter++;
        uint256 currentTokenID = Counter;
        _safeMint(creator, currentTokenID);
        _setTokenURI(currentTokenID, metadataURI);

        emit AssetIssued(currentTokenID, creator, metadataURI);
        return currentTokenID;
    }
    
    /**
     * @notice Burns `tokenId`. See {ERC721-_burn}.
     *
     * @dev Requirements:
     *
     * - The caller must own `tokenId` or be an approved operator.
     */
    function destroyAsset(uint256 tokenId) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "VirtueQuestNFT: Caller is not token owner or approved"
        );
        _burn(tokenId);
        emit AssetDestroyed(tokenId, _msgSender());
    }

    /**
     * @dev Sets `_tokenURI` as the tokenURI of `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _setTokenURI(
        uint256 tokenId,
        string memory _tokenURI
    ) internal virtual {
        require(_exists(tokenId), "VirtueQuestNFT: Non-Existent Asset");
        _tokenURIs[tokenId] = _tokenURI;
    }

    /** Getter Functions **/
    /**
     * @dev Returns the Uniform Resource Identifier (URI) for `tokenId` token.
     */
    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(_exists(tokenId), "VirtueQuestNFT: Non-Existent Asset");
        if (bytes(_tokenURIs[tokenId]).length == 0) {
            string memory _tokenUri = _baseURI(); //ERC721
            return _tokenUri;
        } else {
            return _tokenURIs[tokenId];
        }
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    /// @dev only minting and burning can happe
    /// token transfer are restricted
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal virtual override(ERC721Enumerable) {
        require(
            from == address(0) || to == address(0),
            "VirtueQuestNFT : Asset cannot be transferred"
        );
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
