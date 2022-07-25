import { useParams, useNavigate } from 'react-router-dom'
import { useRef } from "react"
const Imagen = () => {

  const {name} = useParams()
  const navigate = useNavigate()
  
  const imagen = useRef()
  const imgName = useRef()
  const ejex = useRef()
  const ejey = useRef()
  const extencion = useRef()
  const altoActual = useRef()
  const anchoActual = useRef()
  const altoOriginal = useRef()
  const anchoOriginal = useRef()
  const tamañoBytes = useRef()
  const tamañoKB = useRef()
  const RGB = useRef()
  const exadecimal = useRef()

  const handlerClick = (e) => {

    
    // imgName.target.value = `Name: ${name.split('/')[3].toString().split('.')[0]}`

    console.log('Eje X:', e.clientX)
    console.log('Eje Y:', e.clientY)

    let name = imagen.current.attributes.src.value

    imgName.current.value = `Name: ${name.split('/')[3].toString().split('.')[0]}`
    ejex.current.value  = 'Eje X: ' + e.clientX
    ejey.current.value  = 'Eje Y: '+ e.clientY
    extencion.current.value = 'Extencion:  ' + '.' + name.split('/')[3].toString().split('.')[1];
    altoActual.current.value = 'Alto actual: ' + imagen.current.height + 'px';
    anchoActual.current.value = 'Ancho actual: ' + imagen.current.width + 'px'
    altoOriginal.current.value = 'Alto original: ' + imagen.current.naturalHeight + 'px';
    anchoOriginal.current.value = 'Ancho original: ' + imagen.current.naturalWidth + 'px';
    let pixeles = imagen.current.naturalHeight * imagen.current.naturalWidth;
    tamañoBytes.current.value = 'Tamaño: '  + pixeles * 3 + 'Bytes';
    tamañoKB.current.value= 'Tamaño: ' + (pixeles * 3) / 1024 + 'KB';

    let ctx;
    if (!imagen.current.canvas) {

      imagen.current.canvas = document.createElement('canvas')
      imagen.current.canvas.height = imagen.current.height;
      imagen.current.canvas.width = imagen.current.width;
      ctx = imagen.current.canvas.getContext('2d');
      ctx.drawImage(imagen.current, 0, 0, imagen.current.width, imagen.current.height);

    } else {
      ctx = imagen.current.canvas.getContext('2d');
    }
    const pixel = ctx.getImageData(e.nativeEvent.offsetX, e.nativeEvent.offsetY, 1, 1).data;

    function ColorToHex(color) {
      var hexadecimal = color.toString(16);
      return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
    }

    function ConvertRGBtoHex(red, green, blue) {
      return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
    }
    console.log(pixel)
    console.log(ConvertRGBtoHex(pixel[0], pixel[1], pixel[2]))
    RGB.current.value = 'R: ' + pixel[0] + ' G: ' + pixel[1] + ' B: ' + pixel[2]
    exadecimal.current.value = 'Exadecimal: ' + ConvertRGBtoHex(pixel[0], pixel[1], pixel[2])
  }

  return (
    <>
      <div className='containerDatos'>
        <h2 className='mt-2'>Clické en la imagen</h2>
      <div  className='ctn'>
        <div onClick={handlerClick} className='cajaimg'>

        <img crossOrigin="anonymous" ref={imagen} src={`http://localhost:4000/${name}`} className='img' />
        
        </div>
        <div className='cajaDatos'>
          <h3>Datos de la imagen</h3>
          <input ref={imgName}/>
          <input ref={ejex}/>
          <input ref={ejey}/>
          <input ref={extencion}/>
          <input ref={altoActual} />
          <input ref={anchoActual}/>
          <input ref={altoOriginal}/>
          <input ref={anchoOriginal}/>
          <input ref={tamañoBytes} />
          <input ref={tamañoKB}/>
          <input ref={RGB}/>
          <input ref={exadecimal}/>
        </div>
      </div>
        <button className='btnVolver' onClick={()=>{navigate("/")}}>Volver</button>
      </div>
    </>
  )
}

export default Imagen