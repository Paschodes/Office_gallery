import React, { useEffect, useState } from 'react'
import './Home.css'
import UserAuth from '../components/UserAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router';
import { storage } from '../Firebase';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid'
import { db } from '../Firebase';
import { collection, getDocs } from 'firebase/firestore';


const Home = () => {
  //This will keep the list of moments the picture is describing
  const [momentList, setMomentList] = useState([]);
  const [uploadImage, setUploadImage] = useState(null)
  const navigate = useNavigate();

  //we have to specify which collection we want to get all the documents from before using it in the getdocs by using the collection function
  const momentCollectionRef = collection(db, "moments");
  //function to get momentList... and in other for it to be displaying immediately you go into de page, we make use of useEffect
  useEffect(() => {
    const getMomentList = async () => {
      //Read the momentList data (in order to get the datas from our firestore collection we use a fuction called getDocs)
      try {
        const data = await getDocs(momentCollectionRef);
        //to get the specific docs/info individually from the data gotten
        const filterMomentData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id, //in other to get ids too
        }));
        //in other to display it in our page
        setMomentList(filterMomentData);
        // console.log(filterMomentData);
      } catch (err) {
        console.log(err);
      }
      //Set the momentList 
      
    };
    getMomentList();
  }, [])


  //in order to keep track of those images
  const [imageList, setImageList] = useState([]);
  //make reference to all the files inside the images folder
  const imageListRef = ref(storage, 'workImages/')

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('signed out successfully');
        navigate('/')
      }).catch(error => console.log(error))
  }
  

  const handleUpload = () => {
    //if there is no image selected, return nd go off the function
    if (uploadImage == null) return;
    //upload the images to firebase if selected, then make a reference to where in the firebase storage where the files/images will be stored or uploaded to
    //pass inside the ref the storage and path to where the image will be stored(add storage name & uuid for unique namings by user) 
    const imageRef = ref(storage, `workImages/${uploadImage.name + v4()}`);
    //then to upload the Image, pass in the imageref and uploadImage(img selected) inside uploadBytes function
    uploadBytes(imageRef, uploadImage).then((snapshot) => {
      alert('Image uploaded');
      //in order to add the images in the display array
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) =>[...prev, url]);
      })
    })
  }

  //in order to have access or display the images inside the storage, we need to make use of useEffect
  useEffect(() => {
    //then first get the response from image lists
    listAll(imageListRef).then((response) => {
      //then go through each of the items in the storage, loop through it nd grab each individual item nd get the url of that item
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          //then add the url of that image to the image lists
          setImageList((prev) => [...prev, url]);
        });
      })
    })
  }, []);
  
  

  //to target each image the user is selecting
  const handleChange = (e) => {
    e.preventDefault()
    setUploadImage(e.target.files[0])
  }
  return (
    <div className='home'>
      <nav className='homeNav'>
        <UserAuth />
        <button onClick={userSignOut}>Sign Out</button>
      </nav>

      <div>
        <input type="file" onChange={handleChange}/>
        <button onClick={handleUpload}>Upload</button>
      </div>

      <div className='momentlists'>
        {momentList.map((moments) => {
          <div>
            <h1 style={{color: moments.happy ? "green" : "red"}}>Name: {moments.name}</h1>
            <h1>Date: {moments.date}</h1>
          </div>
        })}
      </div>

      <div className='imagelists'>
        {/* map and display the images gotten from firebase storage */}
        {imageList.map((url) => {
          return <img className='homeImg' src={url} alt="image" />
        })}
      </div>

      
    </div>
  )
}

export default Home;