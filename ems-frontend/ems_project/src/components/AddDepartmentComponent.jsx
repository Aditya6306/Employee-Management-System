import React, { use } from 'react'
import { useNavigate } from 'react-router-dom';
import { listDepartments } from '../services/DepartmentServices';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createDepartment } from '../services/DepartmentServices';
import { getDepartmentById } from '../services/DepartmentServices';
import { updateDepartment } from '../services/DepartmentServices';

const AddDepartmentComponent = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const {id} = useParams();
    const title = () => {
        if(id) {
            return <h2 className='text-center'>Update Department</h2>
        }        else {
            return <h2 className='text-center'>Add Department</h2>
        }
    }

    const getDepartment = async () => {
        try {
            const response = await getDepartmentById(id);
            setName(response.data.name);
            setDescription(response.data.description);
        } catch (error) {
            console.error('Error fetching department:', error);
        }
    };

    useEffect(() => {
        if (id) {
            getDepartment();
        }
    }, [id]);


    const saveOrUpdateDepartment = async (e) => {
        e.preventDefault();
        const department = { name, description };
        try {
            if (id) {
                // Update existing department
                await updateDepartment(id, department);
            } else {
                // Create new department
                await createDepartment(department);
            }
            navigate('/departments');
        } catch (error) {
            console.error('Error saving department:', error);
        }
    }

    return (
        <div className='container'>
            <br />
            <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'>
                        {
                            title()
                        }
                    </h2>
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                            <label className='form-label'>Name:</label>
                            <input
                                type='text'
                                placeholder='Enter Department Name'
                                name='name'
                                className='form-control'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            </div>
                            <div className='form-group mb-2'>
                            <label className='form-label'>Description:</label>
                            <input
                                type='text'
                                placeholder='Enter Department Description'
                                name='description'
                                className='form-control'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            </div>
                            <button className='btn btn-success' onClick={(e) => saveOrUpdateDepartment(e)}>Save</button>
                            
                        </form>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default AddDepartmentComponent