import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, userData } from '../features/userDetails';
import { useNavigate, useParams } from 'react-router-dom';


const Update = () => {
    const [updateData,setUpdateData] = useState({});
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams();
    const {user} = useSelector((state) => state.app);

    useEffect(() => {
        if (id) {
          const singleUser = user.filter((ele) => ele.id === id);
          setUpdateData(singleUser[0]);
        }
      }, []);
    
    
    const onSubmit = (e) =>{
        e.preventDefault()
        dispatch(updateUser(updateData));
        navigate('/read')
    }


    const newData = (e) => {
        setUpdateData({ ...updateData, [e.target.name]: e.target.value });
    };
      console.log(updateData);
  return (
    <div className="container col-5 bg-box p-5 border mt-4">
        <form onSubmit={onSubmit}>
            <h5 >Edit User</h5>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label text-start">Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name='name'
                    onChange={newData}
                    value={updateData && updateData.name}
                />
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label text-start">Email</label>
                <input 
                    type="email" 
                    className="form-control" 
                    name='email'
                    onChange={newData}
                    value={updateData && updateData.email}
                />
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label text-start">Age</label>
                <input 
                    type="number" 
                    className="form-control" 
                    name='age'
                    onChange={newData}
                    value={updateData && updateData.age}
                />
            </div>
            <div className="d-flex justify-content-start">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="gender" 
                    value="Male"
                    onChange={newData}
                    checked={updateData && updateData.gender === "Male"}
                    
                />
                <label className="form-check-label ms-2" >
                    Male
                </label>
            </div>
            <div className="d-flex justify-content-start">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="gender"
                    value="Female"
                    onChange={newData}
                    checked={updateData && updateData.gender === "Female"}
                />
                <label className="form-check-label ms-2" >
                    Female
                </label>
            </div>
            <button type="submit" className="btn btn-primary" >submit</button>
        </form>
    </div>
  )
}

export default Update