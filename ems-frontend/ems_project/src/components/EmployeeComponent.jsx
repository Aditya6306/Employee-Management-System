import React, { useState, useEffect, use } from 'react'
import { addEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployeeById } from '../services/EmployeeService';
import { updateEmployee } from '../services/EmployeeService';
import { listDepartments } from '../services/DepartmentServices';
import { getDepartmentById } from '../services/DepartmentServices';

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getEmployeeById(id).then(response => {
                const employee = response.data;
                setFirstName(employee.firstName);
                setLastName(employee.lastName);
                setEmail(employee.email);
                setDepartmentId(employee.departmentId ? employee.departmentId : '');
            }).catch(error => {
                console.log(error);
            });
        }
    }, [id]);

    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        listDepartments().then(response => {
            setDepartments(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: ''
    })

    function saveOrUpdateEmployee(e) {
        if (validateForm()) {
            e.preventDefault();
            const employee = { firstName, lastName, email, departmentId };
            if (id) {
                updateEmployee(id, employee).then(response => {
                    console.log(response);
                }).catch(error => {
                    console.log(error);
                });
            } else {
                addEmployee(employee).then(response => {
                    console.log(response);
                }).catch(error => {
                    console.log(error);
                });
            }
            navigate('/employees');
        }
        else {
            e.preventDefault();
        }

    }

    
    function validateForm() {
        let valid = true;
        const errorCopy = { ...errors };
        if (firstName.trim()) {
            errorCopy.firstName = '';

        } else {
            errorCopy.firstName = 'First name is required';
            valid = false;
        }
        if (lastName.trim()) {
            errorCopy.lastName = '';
        } else {
            errorCopy.lastName = 'Last name is required';
            valid = false;
        }
        if (email.trim()) {
            errorCopy.email = '';
        } else {
            errorCopy.email = 'Email is required';
            valid = false;
        }
        if (departmentId) {
            errorCopy.department = '';
        } else {
            errorCopy.department = 'Department is required';
            valid = false;
        }
        setErrors(errorCopy);
        return valid;
    }
    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Employee</h2>
        }
        return <h2 className='text-center'>Add Employee</h2>
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        pageTitle()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group'>
                                <label className='form-label'>First Name</label>
                                <input type='text' className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} name = 'firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>
                            <div className='form-group'>
                                <label>Last Name</label>
                                <input type='text' className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} name='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>
                            <div className='form-group'>
                                <label>Email Id</label>
                                <input type='text' className={`form-control ${errors.email ? 'is-invalid' : ''}`} name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>
                            <div className='form-group'>
                                <label>Department</label>
                                <select className={`form-control ${errors.department ? 'is-invalid' : ''}`} value={departmentId} onChange={(e) => setDepartmentId(e.target.value)}>
                                    <option value="">Select Department</option>
                                    {departments.map(department => (
                                        <option key={department.id} value={department.id}>{department.name}</option>
                                    ))}
                                </select>
                                {errors.department && <div className='invalid-feedback'>{errors.department}</div>}
                            </div>
                            
                            
                            

                            <button className='btn btn-success mt-2' type='submit' onClick={saveOrUpdateEmployee}>Save</button>

                        

                        </form>

                    </div>
                </div>

            </div>
        </div>
    )
}


export default EmployeeComponent