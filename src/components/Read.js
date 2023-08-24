import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, showData } from '../features/userDetails'
import CustomModal from './customModal';
import { Link } from 'react-router-dom';

const Read = () => {
    const [id, setId] = useState();
    const [showPopup, setShowPopup] = useState(false);
    const [genderData, setGenderData] = useState('');

    const dispatch = useDispatch();
    const {user, loading, searchData} = useSelector((state) => state.app);

    useEffect(() =>{
        dispatch(showData())
    },[])
    if(loading) {
        return(<h2>Loading...</h2>)
    }

    const handleView = (id) =>{
        setId(id);
        setShowPopup(true);
    }
    const handleDelete = (id) => {
        dispatch(deleteUser(id))
    }
  return (
    <Fragment>
        <div style={{marginTop:20}}>
            <input 
                type="radio" 
                name="gender" 
                value={""}
                checked={genderData === ""}
                onChange={(e) => setGenderData(e.target.value)} 
                className='me-1'
            />
            <label 
            className="form-check-label me-2">All</label>
            <input 
                type="radio" 
                name="gender" 
                value="Male"
                checked={genderData && genderData === "Male"}
                onChange={(e) => setGenderData(e.target.value)} 
                className='me-1'
            />
            <label className="form-check-label me-2">Male</label>
            <input 
                type="radio" 
                name="gender" 
                value="Female"
                checked={genderData && genderData === "Female"}
                onChange={(e) => setGenderData(e.target.value)} 
                className='me-1'
            />
            <label className="form-check-label me-2">Female</label>
        </div>
        <div className="container mt-2 d-flex flex-wrap justify-content-center">
        {showPopup && <CustomModal id={id} setShowPopup={setShowPopup}/>}
        
        {user?.filter((ele) => {
            if(searchData.length === 0){
                return ele;
            }else{
                return ele.name.toLowerCase().includes(searchData.toLowerCase())
                || ele.email.toLowerCase().includes(searchData.toLowerCase());
            }
        })
        .filter((ele) => {
            if(genderData === "Male"){
                return ele.gender === genderData;
            }else if(genderData === "Female"){
                return ele.gender === genderData;
            }else return ele
        })
        .map((ele,i) =>{
            return(
            <div className="card" style={{width: "18rem",margin:"10px 10px"}} key={i}>
                <div className="card-body">
                    <h5 className="card-title">{ele.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{ele.age}</h6>
                    <p className="card-text">{ele.gender}</p>
                    <p className="card-text">{ele.email}</p>
                    <button className="card-link" onClick={() => handleView(ele.id)}>View</button>
                    <Link to={`/edit/${ele.id}`} className="card-link" >Edit</Link>
                    <button className="card-link" onClick={() => handleDelete(ele.id)}>Delete</button>
                </div>
            </div>
            )
        })}
    </div>
    </Fragment>

    
  )
}

export default Read