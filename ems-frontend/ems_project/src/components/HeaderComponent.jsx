import React from 'react'

export const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className='navbar navbar-dark bg-dark'>
                    <div>
                        <a href='/' className='navbar-brand'>Employee Management System</a>
                    </div>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#"></a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarText">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="/employees">Employee</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/departments">Department</a>
                                    </li>
                                    
                                </ul>
                                
                            </div>
                        </div>
                    </nav>
                </nav>
            </header>
        </div>
    )
}
