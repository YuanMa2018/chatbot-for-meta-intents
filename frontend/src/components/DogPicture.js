import React, {useEffect,useState} from 'react';

const DogPicture = () =>{
    const [imageURL, setImageUrl] = useState('');
    let dog_url = "https://dog.ceo/api/breeds/image/random";
    useEffect( ()=> {fetch(dog_url)
                        .then( res => res.json())
                        .then( data => {
                            setImageUrl(data.message);
                        })},[]);

    return (
        <div>
            <img src={imageURL} width="200" alt="a dog" />
        </div>
    );
};

    

export default DogPicture;