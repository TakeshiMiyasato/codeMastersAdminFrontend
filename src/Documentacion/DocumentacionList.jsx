import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Table, Button, Card, Container } from 'react-bootstrap';
import { useNavigate, useParams, Link } from "react-router-dom";

const DocumentacionList = () => {

    const [documentacion, setDocumentacion] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('id') === null) {
            navigate('/')
        } else {
            fetchDocumentacionList()
        }
    }, [])

    const fetchDocumentacionList = () => {
        axios.get('http://127.0.0.1:8000/api/documentaciones/', {
            headers: { 'Authorization': `Token ${localStorage.getItem('token')}` }
        }).then((res) => {
            console.log('getAllDocumentacion res', res.data)
            setDocumentacion(res.data)
        }).catch((err) => {
            console.log('error al llamar getAllDocumentacion: ', err)
        })
    }

    const deleteDocumentacion = (id) => {
        if (window.confirm('Esta seguro que desea eliminar esta documentacion')) {
            axios.delete(`http://127.0.0.1:8000/api/documentaciones/${id}`, { headers: { 'Authorization': `Token ${localStorage.getItem('token')}` } }).then((res) => {
                console.log('deleteDocumentacionres', res)
                fetchDocumentacionList()
            }).catch((err) => {
                console.log('deleteDocumentacionres err', err)
            })
        }
    }

    return (
        <Container>
            <h2>Documentacion para iniciar</h2>
            <p>
                Hola, esta es la lista de temas correspondientes
                a la documentacion sobre programacion basica orientada a objetos
            </p>
            <Link className='btn btn-success' to={'/formDocumento'}>Agregar nueva documentacion</Link>
            <Card>
                <Card.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>Tema</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {documentacion.map(documento =>
                                <tr key={"documento-" + documento.id}>
                                    <td><h4>{documento.nombreLeccion}</h4></td>
                                    <td><Link to={`/formDocumento/${documento.id}`} className='btn btn-warning'>Editar</Link></td>
                                    <td><Button className='btn btn-danger' onClick={() => deleteDocumentacion(documento.id)}>Eliminar</Button></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

        </Container >
    );
}

export default DocumentacionList;