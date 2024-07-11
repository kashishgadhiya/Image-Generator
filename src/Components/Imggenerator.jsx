import React, { useRef, useState } from 'react';
import Loading from './Loading';

const Imggenerator = () => {
    const [img_url,setImgurl] = useState("/")
    let inputRef = useRef(null)
    const [loading,setLoading] = useState(false)
    const imgGenerator = async( )=>{
        if(inputRef.current.value === ""){
            alert("Entre Your text please ")
            return 0
        }
        setLoading(true)
       const  response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
            method :"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:API_KEY,
                "User-Agent" :"Chrome",
            },
            body:JSON.stringify({
                prompt :`${inputRef.current.value}`,
                n:1,
                size:"512x512",
            }),
        }
       );
       let data = await response.json()
       console.log(data)
       let data_array = data.data
       setImgurl(data_array[0].url)
       setLoading(false)
      
    }
  return (
    <div className='mt-10'>
      <h1 className='text-5xl font-semibold my-5'>AI Image <span className=''>Generator </span> App</h1>
      <p className='my-5 text-lg text-gray-500'>Experience the future of creativity with our AI Image Generator! Transform your ideas into stunning visuals effortlessly—just describe your vision, and watch as our advanced technology brings it to life in vibrant detail.</p>
      <div className='bg-black w-2/4 mx-auto  rounded-full flex justify-between pl-5 h-14 mt-7 mb-5'>
        <input type='text' className=' w-2/4 rounded-full my-5 bg-black outline-none px-2' placeholder='Describe What you want to see'  ref={inputRef}/>
      
        <button className='bg-pink-600  px-5 py-2 rounded-full w-32' onClick={()=>imgGenerator()}>Generate</button>
      </div>
      <div>
    {loading ? <Loading/> :
        <img src={img_url ==="/"?'/sec.png' :img_url} className='w-80 mx-auto ' alt='Generated Image' />}
      </div>


    </div>
  );
}

export default Imggenerator;
