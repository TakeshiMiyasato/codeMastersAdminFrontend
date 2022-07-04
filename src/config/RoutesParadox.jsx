import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DocumentacionForm from '../Documentacion/DocumentacionForm';
import DocumentacionList from '../Documentacion/DocumentacionList';
import Menu from '../Menu/Menu';
import ProgramacionForm from '../Programacion/ProgramacionForm';
import ProgramacionList from '../Programacion/ProgramacionList';
import ProgramacionSubida from '../Programacion/ProgramacionSubida';
import ProgramacionSubidasList from '../Programacion/ProgramacionSubidasList';
import LoginForm from '../RegisterLogin/LoginForm';

const RoutesParadox = () => {
    return (
        <Routes>
            <Route path='/' element={<LoginForm />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/documentaciones' element={<DocumentacionList />} />
            <Route path='/formDocumento/:id' element={<DocumentacionForm />} />
            <Route path='/formDocumento' element={<DocumentacionForm />} />
            <Route path='/programaciones' element={<ProgramacionList />} />
            <Route path='/formProgramacion/:id' element={<ProgramacionForm />} />
            <Route path='/formProgramacion' element={<ProgramacionForm />} />
            <Route path='/programacionSubidasList/:id' element={<ProgramacionSubidasList />} />
            <Route path='/programacionSubida/:id' element={<ProgramacionSubida />} />
        </Routes>
    );
}

export default RoutesParadox;