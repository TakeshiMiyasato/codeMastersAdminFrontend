import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Table, Button, Card, Container } from 'react-bootstrap';
import { useNavigate, useParams, Link } from "react-router-dom";

const ProgramacionList = () => {

    const [programacion, setProgramacion] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('id') === null) {
            navigate('/')
        } else {
            fetchProgramacionList()
        }
    }, [])

    const fetchProgramacionList = () => {
        axios.get('http://127.0.0.1:8000/api/programaciones/', {
            headers: { 'Authorization': `Token ${localStorage.getItem('token')}` }
        }).then((res) => {
            console.log('getAllDocumentacion res', res.data)
            setProgramacion(res.data)
        }).catch((err) => {
            console.log('error al llamar getAllDocumentacion: ', err)
        })
    }

    const deleteProgramacion = (id) => {
        if (window.confirm('Esta seguro que desea eliminar este ejercicio de programacion')) {
            axios.delete(`http://127.0.0.1:8000/api/programaciones/${id}/`, { headers: { 'Authorization': `Token ${localStorage.getItem('token')}` } }).then((res) => {
                console.log('deleteProgramaciones', res)
                fetchProgramacionList()
            }).catch((err) => {
                console.log('deleteProgramaciones err', err)
            })
        }
    }

    return (
        <Container>
            <h2>Ejercicios de programacion</h2>
            <p>
                Hola, si te sientes en confianza de resolver estos ejercicios para recibir
                mas puntos, sientete libre de verlos y resolverlos
            </p>
            <h3>Reglas</h3>
            <p>
                Una vez entres al ejercicio que desees resolver tendras que colocar
                tu codigo que has hecho, una vez enviado no podras volver al ejercicio hasta que
                se haya revisado y que este incorrecto, si el ejercicio que has hecho cumplio satisfactoriamente
                las especificaciones de cada ejercicio, no podras volver a enviar otro codigo del mismo ejercicio
                para evitar el farmeo
            </p>
            <Link className='btn btn-success' to={'/formProgramacion'}>Agregar nuevo ejercicio</Link>
            <Card>
                <Card.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>Ejercicio</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {programacion.map(programacion =>
                                <tr key={"programacion-" + programacion.id}>
                                    <td><h4>{programacion.nombreEjercicio}</h4></td>
                                    <td><Link to={`/formProgramacion/${programacion.id}`} className='btn btn-warning'>Editar</Link></td>
                                    <td><Button className='btn btn-danger' onClick={() => deleteProgramacion(programacion.id)}>Eliminar</Button></td>
                                    <td><Link to={`/programacionSubidasList/${programacion.id}`} className='btn btn-info'>Ver Subidas</Link></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            
        </Container >
    );
}

export default ProgramacionList;