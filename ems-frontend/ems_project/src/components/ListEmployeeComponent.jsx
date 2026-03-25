import React from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { useState, useEffect } from 'react';    
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getEmployees();
    }, []);

    function getEmployees() {
        listEmployees().then(response => {
            setEmployees(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    // console.log(employees);

    function addNewEmployee() {
        navigate('/add-employee');
    }

    function updateEmployee(id) {
        navigate(`/update-employee/${id}`);
    }

    function handleDelete(id) {
        deleteEmployee(id).then(response => {
            getEmployees(); 
        }).catch(error => {
            console.log(error);
        });
    }

  return (
    <div className='container'>
        <h2 className='text-center'>Employees List</h2>
        <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Emp Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Id</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {employees.map(employee => (
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>
                            <button className='btn btn-info' onClick={()=>updateEmployee(employee.id)}>Update</button>
                            <button className='btn btn-danger ml-2'
                            onClick={()=>handleDelete(employee.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent