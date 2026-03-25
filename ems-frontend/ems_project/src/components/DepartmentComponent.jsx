import React from 'react'
import { useNavigate } from 'react-router-dom';
import { listDepartments } from '../services/DepartmentServices';
import { useEffect, useState } from 'react';
import { deleteDepartment } from '../services/DepartmentServices';



const DepartmentComponent = () => {
    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        getDepartments();
    }, []);

    const getDepartments = async () => {
        try {
            const response = await listDepartments();
            setDepartments(response.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

      
    function addNewDepartment() {
        // navigate('/add-department');
        navigate('/add-department');
    }

    function updateDepartment(id) {
        navigate(`/update-department/${id}`);
    }

    const removeDepartment = async (id) => {
        try {
            await deleteDepartment(id);
            getDepartments(); // Refresh the department list
        } catch (error) {
            console.error('Error deleting department:', error);
        }
    };

  return (
    <div>
      <h2>Departments</h2>
      <button className='btn btn-primary mb-2' onClick={addNewDepartment}>Add Department</button>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map(department => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>{department.name}</td>
              <td>{department.description}</td>
              <td>
                <button className='btn btn-info' onClick={()=>updateDepartment(department.id)}>Update</button>
                <button className='btn btn-danger' onClick={() => removeDepartment(department.id)} style={{ marginLeft: '10px' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default DepartmentComponent