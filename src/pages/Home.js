import { useState, useEffect } from 'react';

import axios from "axios";
import { Link } from 'react-router-dom'

const Home = () => {
  const [file, setFile] = useState(null)
  const [lista, setLista] = useState([])
  const [updateLista, setUpdateLista] = useState(false)
  useEffect(() => {
    (async () => {
      setLista([])
      setLista((await axios.get('http://localhost:4000/api/images')).data.response)
    })();
    setUpdateLista(false)
  }, [updateLista])



  const selectedHandler = (e) => {
    setFile(e.target.files[0])

  }

  const sendHandler = async (e) => {
    if (!file) {
      alert('you must upload file')
      return
    }

    const formdata = new FormData()
    formdata.append('image', file)

    try {
      await axios.post(`http://localhost:4000/api/images`, formdata);
    } catch (error) {

    }

    document.getElementById('fileinput').value = null

    setFile(null)
    setUpdateLista(true)
  }


  return (
    <>
      

      {/* <div onClick={nose}>
          <img ref={imagen} src='/assets/img/yo.jpg' className="App-logo" alt="logo" />
        </div> */}

      <div className="container mt-5">
        <div className="card p-3">
          <div className="row">
            <div className="col-10">
              <input id="fileinput" multiple accept='image/png, .jpeg, .jpg'
                onChange={selectedHandler}
                className="form-control" type="file" />
            </div>
            <div className="col-2">
              <button
                onClick={sendHandler}
                type="button" className="btn btn-primary col-12">Upload</button>
            </div>
          </div>
        </div>
      </div>

      <div className='container containerImage'>

        {lista.length > 0 ? lista.map(img => {
          return (
            <div key={img} className='card containerImg'>
              <img src={`http://localhost:4000/${img}`} className='card-img-top img' />
              <Link className="linktToImg" to={`/img/${img}`}>
                Ver mas
              </Link>
            </div>
          )

        }) : <h1>No hay imagenes cargadas</h1>}

      </div>

    </>
  );
}

export default Home