import { useState, useEffect } from "react";
import "./App.css";
import { Auth } from "./components/auth";
import { db, auth, storage } from "./config/Firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import React from "react";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);

  //New Movie Status:

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieReleaseDate, setNewMovieReleaseDate] = useState(0);
  const [newMovieOscar, setNewMovieOscar] = useState(true);

  const [updatedTitle, setUpdatedTitle] = useState("");

  //file upload state
  const [file, setFile] = useState(null);

  const movieCollectionRef = collection(db, "movies");
  useEffect(() => {
    const getMovieList = async () => {
      try {
        const data = await getDocs(movieCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        console.log({ filteredData });
        setMovieList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        ReleaseDate: newMovieReleaseDate,
        Oscar: newMovieOscar,
        userId: auth?.currentUser.uid,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);

    await deleteDoc(movieDoc);
  };

  const updateMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);

    await deleteDoc(movieDoc);
  };

  const uploadFile = async () => {
    if(!file) return;
    const filesFoldeRef = ref(storage, `projectfiles/${file.name}`);
    try{

   
    await uploadBytes(filesFoldeRef, file);
    }catch(err){
      console.error(err);
    }

  }

  return (
    <div className="App">
      <Auth />

      <div>
        <input
          placeholder="Movie title..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Release Date..."
          type="number"
          onChange={(e) => setNewMovieReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={newMovieOscar}
          onChange={(e) => setNewMovieOscar(e.target.checked)}
        />
        <label htmlFor="Oscar?"></label>
        <button onClick={onSubmitMovie}>Sybmit Movie</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.Oscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date:{movie.ReleaseDate}</p>

            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

            <input
              placeholder="new title..."
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateMovie(movie.id)}>Update title</button>
          </div>
        ))}
      </div>

      <div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
