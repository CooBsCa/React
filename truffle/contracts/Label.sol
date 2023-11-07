// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Label {
    address public owner;
    event creationMusicien(string _nom, uint _age);
    event ajoutMusique(string _nom, string _titre, uint _duree, string _genre);
    event getMusiques(Musique[] _musiques);
    Musicien[] public _musiciens;

    struct Musicien {
        address _adress;
        string _nom;
        uint age;
        Musique[] _musiques;
    }

    struct Musique {
        string _titre;
        uint _duree;
        string _genre;
    }

    mapping(address => Musicien) public Musiciens;

    constructor() {
        owner = msg.sender;
    }

    // Modifier pour s'assurer que seul le propriétaire peut effectuer certaines actions
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Seul le proprietaire peut effectuer cette action."
        );
        _;
    }

    // Ajouter un musicien au label
    function ajoutMusicien(
        address _addressMusicien,
        string calldata _nomMusicien,
        uint _age
    ) external onlyOwner {
        require(
            bytes(Musiciens[_addressMusicien]._nom).length == 0,
            "Ce musicien est deja enregistre."
        );

        Musiciens[_addressMusicien]._nom = _nomMusicien;
        Musiciens[_addressMusicien].age = _age;
        Musiciens[_addressMusicien]._musiques.push();
        emit creationMusicien(_nomMusicien, _age);

        Musique[] memory _musique = new Musique[](0);
        Musicien memory newMusicien = Musicien(
            _addressMusicien,
            _nomMusicien,
            _age,
            _musique
        );
        _musiciens.push(newMusicien);
    }

    // Ajouter une musique a un musicien du label
    function ajouterMusique(
        address _addressMusicien,
        string memory _title,
        uint _duration,
        string memory _genre
    ) external onlyOwner {
        require(
            bytes(Musiciens[_addressMusicien]._nom).length > 0,
            "Ce musicien n'est pas enregistre."
        );
        Musique memory newMusique = Musique(_title, _duration, _genre);
        Musiciens[_addressMusicien]._musiques.push(newMusique);
        emit ajoutMusique(
            Musiciens[_addressMusicien]._nom,
            _title,
            _duration,
            _genre
        );

        for (uint i = 0; i < _musiciens.length; i++) {
            if (_musiciens[i]._adress == _addressMusicien) {
                //_musiciens[i]._musiques.push(newMusique);
            }
        }
    }

    // Récupère toutes les musiques d'un artiste par son adresse
    function getMusiquesArtiste(address _addressMusicien) external {
        emit getMusiques(Musiciens[_addressMusicien]._musiques);
    }

    // Delete un artiste du Label via son adresse
    function deleteArtiste(address _addressMusicien) external onlyOwner {
        delete Musiciens[_addressMusicien];
    }

    function getMusiquesLabel() public view returns (Musicien[] memory) {
        return _musiciens;
    }
}
