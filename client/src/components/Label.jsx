import { useState } from 'react';
import { EthContext, useEth } from '../contexts/EthContext';
var contract = require("../contracts/Label.json");


function Label(){
    const {state} = useEth(EthContext);
    const [address, setAddress] = useState('');
    const [nom, setNom] = useState('');
    const [age, setAge] = useState('');
    const [titre, setTitre] = useState('');
    const [duree, setDuree] = useState('');
    const [genre, setGenre] = useState('');
    const [musiques, setMusiques] = useState([]);
    const [artistes, setArtistes] = useState([]);

    const handleAjouterMusicien = async () => {
        console.log('state : ' , state)
        console.log('contract : ' , state.contract)
        if (contract) {
            try {
                await state.contract.methods.ajoutMusicien(address, nom, age).send({ from: state.accounts[0] });
               } catch (error) {
                 console.error('Erreur lors de l\'ajout de l\'artiste :', error);
               }
        }
      };

      const handleAjouterMusique = async () => {
        console.log('method : ' , state.contract)
        console.log('method : ' , state.contract.methods)
        if (contract) {
            try {
                await state.contract.methods.ajouterMusique(address, titre, duree, genre).send({ from: state.accounts[0] });
               } catch (error) {
                 console.error('Erreur lors de l\'ajout du membre :', error);
               }
        }
      };

      const handleGetMusiques = async () => {
        try {
            const musiquesArtiste = await state.contract.methods.getMusiquesArtiste(address).call({ from: state.accounts[0] });
            console.log('musiquesArtiste', musiquesArtiste);
            setMusiques(musiquesArtiste);
            
        } catch (error) {
            console.error('Erreur lors de la récupération des musiques de l\'artiste :', error);
        }
    };

    const handleSuppressionArtiste = async () => {
      try {
        await state.contract.methods.deleteArtiste(address).send({ from: state.accounts[0] });
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'artiste :', error);
      }
    };

    const handleGetArtistes = async () => {
      try {
        console.log('state: ', state)
        console.log('state.contract.methods: ', state.contract.methods)
        const response =  await state.contract.methods.getArtistesLabel().call({ from: state.accounts[0] });
        setArtistes(response);
      } catch (error) {
        console.error('Erreur lors de la récupération des artistes du Label :', error);
      }
    }; 

      return (
        <div className="LabelApp">
          <h1>Label</h1>
          <div>
            <h2>Ajouter un Musicien</h2>
            <input
              type="text"
              placeholder="Adresse de l'artiste"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nom de l'artiste"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
            <input
              type="text"
              placeholder="Age de l'artiste"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <button onClick={handleAjouterMusicien}>Ajouter Artiste</button>
          </div>

          <div>
            <h2>Ajouter les musiques d'un Artiste du Label</h2>
            <input
              type="text"
              placeholder="Adresse de l'artiste"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="Titre de la Musique"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
            />
            <input
              type="text"
              placeholder="Durée du Morceau"
              value={duree}
              onChange={(e) => setDuree(e.target.value)}
            />
            <input
              type="text"
              placeholder="Genre du Morceau"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            <button onClick={handleAjouterMusique}>Ajouter Morceau</button>
          </div>
          <div>
                <h2>Récupérer les musiques d'un Artiste du Label à partir de son adresse</h2>
                <input
                    type="text"
                    placeholder="Adresse de l'artiste"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <button onClick={handleGetMusiques}>Récupérer Musiques</button>
                <div>
                    {musiques.map((musique, index) => (
                        <div key={index}>
                            <p>Titre: {musique._titre}, Durée: {musique._duree}, Genre: {musique._genre}</p>
                        </div>
                    ))}
                </div>
          </div>
          <div>
            <h2>Suppression d'un Artiste par son Adresse</h2>
            <input
              type="text"
              placeholder="Adresse de l'artiste"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button onClick={handleSuppressionArtiste}>Supprimer Artiste</button>
          </div>
          <div>
                <h2>Récupérer les artistes du Label</h2>
                <button onClick={handleGetArtistes}>Récupérer les Artistes</button>
                <div>
                    {artistes.map((artiste, index) => (
                        <div key={index}>
                            <p>Adresse de l'Artiste: {artiste._adress}, Nom d'Arstiste: {artiste._nom}, Age: {artiste. age} ans</p>
                            {artiste._musiques.length > 0 &&
                                <p>Musique(s) de  {artiste._nom} : \n {artiste._musiques._titre}, d'une durée de {artiste._musiques._duree} secondes, genre {artiste._musiques._genre}</p> 
                            }                            
                        </div>
                    ))}
                </div>
          </div>
        </div>     
      );
}

export default Label;