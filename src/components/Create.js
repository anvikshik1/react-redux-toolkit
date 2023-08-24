import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { userData } from '../features/userDetails';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [users,setUsers] = useState({});
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (e) =>{
        e.preventDefault()
        const user = dispatch(userData(users));
        navigate('/read')
    }

    const getUserData = (e) =>{
        setUsers({...users, [e.target.name]: e.target.value})
    }

  return (
    <div className="container col-5 bg-box p-5 border mt-4">
        <form onSubmit={onSubmit}>
            <h5>Fill User</h5>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label text-start">Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name='name'
                    onChange={getUserData}
                />
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label text-start">Email</label>
                <input 
                    type="email" 
                    className="form-control" 
                    name='email'
                    onChange={getUserData}
                />
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label text-start">Age</label>
                <input 
                    type="number" 
                    className="form-control" 
                    name='age'
                    onChange={getUserData}
                />
            </div>
            <div className="d-flex justify-content-start">
                <input 
                    className="form-check-input"
                    type="radio" 
                    name="gender" 
                    value="Male"
                    onChange={getUserData}
                />
                <label className="form-check-label ms-2" >
                    Male
                </label>
            </div>
            <div className="d-flex justify-content-start">
                <input 
                    type="radio" 
                    name="gender"
                    value="Female"
                    onChange={getUserData}
                    className="form-check-input"
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

export default Create